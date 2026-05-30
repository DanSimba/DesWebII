import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../shared/components/popup/popup';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).addVirtualFileSystem(pdfFonts);

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private http = inject(HttpClient);
  private dialog = inject(Dialog);
  private apiUrl = 'http://localhost:8080/api/solicitations';

  private async carregarImagemBase64(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Erro ao carregar a imagem", error);
      return '';
    }
  }

  private formatarParaReal(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }

  generatePDF(filtros: any) {
    if (filtros.tipoRelatorio === 'categoria') {
      this.http.get<any[]>(`${this.apiUrl}`).subscribe({
        next: (dados) => this.processarEGerarPdf('categoria', dados),
        error: (err) => {
          console.error("Erro:", err);
          this.dialog.open(Popup, {
            data: { text: 'Erro ao buscar histórico.', typePopUp: 'ok' }
          });
        }
      });
    } else {
      let params = new HttpParams();
      let subtitulo = 'Período: Todo o histórico';

      if (filtros.dataInicio) params = params.set('inicio', filtros.dataInicio);
      if (filtros.dataFim) params = params.set('fim', filtros.dataFim);

      if (filtros.dataInicio && filtros.dataFim) {
        subtitulo = `Período: ${filtros.dataInicio.split('-').reverse().join('/')} a ${filtros.dataFim.split('-').reverse().join('/')}`;
      } else if (filtros.dataInicio) {
        subtitulo = `Período: De ${filtros.dataInicio.split('-').reverse().join('/')} até Hoje`;
      } else if (filtros.dataFim) {
        subtitulo = `Período: Desde o início até ${filtros.dataFim.split('-').reverse().join('/')}`;
      }

      this.http.get<any[]>(`${this.apiUrl}/relatorio/periodo`, { params }).subscribe({
        next: (dados) => this.processarEGerarPdf('periodo', dados, subtitulo),
        error: (err) => {
          console.error("Erro na API:", err);
          this.dialog.open(Popup, {
            data: { text: 'Erro ao buscar os dados do período.', typePopUp: 'ok' }
          });
        }
      });
    }
  }

  private async processarEGerarPdf(tipo: 'periodo' | 'categoria', dados: any[], subtituloFiltro: string = '') {
    const dadosReceita = dados.filter(sol => sol.est === 'PAGA' || sol.est === 'FINALIZADA');

    if (!dadosReceita || dadosReceita.length === 0) {
      this.dialog.open(Popup, {
        data: { text: 'Nenhuma receita encontrada para este filtro.', typePopUp: 'ok' }
      });   
      return;
    }

    const logoBase64 = await this.carregarImagemBase64('/assets/images/hello-kitty-relatorio.png');
    
    let totalGeral = 0;
    let linhasTabela: any[][] = [];
    let configPdf = {
      titulo: '',
      subtitulo: '',
      larguraColunas: [] as any[],
      cabecalhoTabela: [] as any[],
      textoTotal: '',
      nomeArquivo: ''
    };

    if (tipo === 'periodo') {
      configPdf.titulo = 'RECEITAS POR PERÍODO';
      configPdf.subtitulo = subtituloFiltro;
      configPdf.larguraColunas = ['*', '*'];
      configPdf.cabecalhoTabela = [
        { text: 'Data', style: 'tableHeader' }, 
        { text: 'Receita', style: 'tableHeader' }
      ];
      configPdf.textoTotal = 'Receita Total: ';
      configPdf.nomeArquivo = 'relatorio-periodo.pdf';

      const receitasPorDia = dadosReceita.reduce((acc: any, sol: any) => {
        const dia = sol.data ? sol.data.split('T')[0] : 'Data Desconhecida';
        if (!acc[dia]) acc[dia] = 0;
        const valor = Number(sol.valorOrcamento || 0);
        acc[dia] += valor;
        totalGeral += valor;
        return acc;
      }, {});

      linhasTabela = Object.keys(receitasPorDia).sort().map(dia => {
        const diaBR = dia.includes('-') ? dia.split('-').reverse().join('/') : dia;
        return [diaBR, this.formatarParaReal(receitasPorDia[dia])];
      });

    } else if (tipo === 'categoria') {
      configPdf.titulo = 'RECEITAS POR CATEGORIA';
      configPdf.subtitulo = 'Todos os períodos';
      configPdf.larguraColunas = ['*', 120, 150];
      configPdf.cabecalhoTabela = [
        { text: 'Categoria', style: 'tableHeader' },
        { text: 'Qtd de Serviços', style: 'tableHeader' },
        { text: 'Receita', style: 'tableHeader' }
      ];
      configPdf.textoTotal = 'Receita Total: ';
      configPdf.nomeArquivo = 'relatorio-categoria.pdf';

      const mapeamentoCategorias = dadosReceita.reduce((acc: any, sol: any) => {
        const categoria = sol.nomeCategoria ? sol.nomeCategoria.trim() : 'Sem Categoria / Geral';
        if (!acc[categoria]) acc[categoria] = { quantidade: 0, receitaTotal: 0 };
        const valor = Number(sol.valorOrcamento || 0);
        acc[categoria].quantidade += 1;
        acc[categoria].receitaTotal += valor;
        totalGeral += valor;
        return acc;
      }, {});

      linhasTabela = Object.keys(mapeamentoCategorias).sort().map(nomeCat => [
        nomeCat,
        mapeamentoCategorias[nomeCat].quantidade.toString(),
        this.formatarParaReal(mapeamentoCategorias[nomeCat].receitaTotal)
      ]);
    }

    const estruturaRelatorio: any = {
      background: function (currentPage: number, pageSize: any) {
        return {
          canvas: [{ type: 'rect', x: 0, y: 0, w: pageSize.width, h: pageSize.height, color: '#fff1f2' }]
        };
      },
      content: [
        {
          columns: [
            ...(logoBase64 ? [{ image: logoBase64, width: 220, alignment: 'left' }] : []),
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      stack: [
                        { text: configPdf.titulo, style: 'header' },
                        { text: configPdf.subtitulo, style: 'subheader' }
                      ],
                      margin: [10, 15, 10, 15], 
                      fillColor: '#ffffff'
                    }
                  ]
                ]
              },
              layout: {
                hLineWidth: () => 2, vLineWidth: () => 2, hLineColor: () => '#862e55', vLineColor: () => '#862e55'
              },
              margin: [15, 30, 0, 0] 
            }
          ],
          margin: [0, 0, 0, 25]
        },
        {
          table: {
            headerRows: 1,
            widths: configPdf.larguraColunas,
            body: [
              configPdf.cabecalhoTabela,
              ...linhasTabela
            ]
          },
          layout: { fillColor: (rowIndex: number) => (rowIndex % 2 === 0 && rowIndex !== 0) ? '#f2f2f2' : null }
        },
        { 
          text: `${configPdf.textoTotal}${this.formatarParaReal(totalGeral)}`, 
          style: 'totais', 
          margin: [0, 20, 0, 0] 
        }
      ],
      styles: {
        header: { fontSize: 18, bold: true, color: '#862e55', margin: [0, 0, 0, 5], alignment: 'center' },
        subheader: { fontSize: 11, color: '#862e55', margin: [0, 0, 0, 0], alignment: 'center', bold: true },
        tableHeader: { bold: true, fontSize: 12, color: 'white', fillColor: '#862e55', alignment: 'center' },
        totais: { fontSize: 14, bold: true, alignment: 'right', color: '#862e55' }
      }
    };

    pdfMake.createPdf(estruturaRelatorio).download(configPdf.nomeArquivo);
  }
}