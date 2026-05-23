import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RelatorioType } from '../models/relatorio-interface';
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
      return ''; // pra não quebrar saporra de PDF
    }
  }

  generatePDF(filtros: RelatorioType) {
    if (filtros.categoria) {
      const params = new HttpParams().set('categoria', filtros.categoria);
      this.http.get<any[]>(`${this.apiUrl}/relatorio/categoria`, { params }).subscribe(dados => {
        this.construirPdfCategoria(dados, filtros.categoria);
      });
    }
    else {
      let params = new HttpParams();
      let subtitulo = 'Período: Todo o histórico';

      if (filtros.dataInicio) params = params.set('inicio', filtros.dataInicio);
      if (filtros.dataFim) params = params.set('fim', filtros.dataFim);

      if (filtros.dataInicio && filtros.dataFim) {
        subtitulo = `Período: ${filtros.dataInicio.split('-').reverse().join('/')} a ${filtros.dataFim.split('-').reverse().join('/')}`;
      } else if (filtros.dataInicio) {
        subtitulo = `A partir de: ${filtros.dataInicio.split('-').reverse().join('/')}`;
      } else if (filtros.dataFim) {
        subtitulo = `Até: ${filtros.dataFim.split('-').reverse().join('/')}`;
      }

      this.http.get<any[]>(`${this.apiUrl}/relatorio/periodo`, { params }).subscribe(dados => {
        this.construirPdfPeriodoAgrupado(dados, subtitulo);
      });
    }
  }

  //Agrupa por dia
    private async construirPdfPeriodoAgrupado(dados: any[], subtituloFiltro: string) {
      if (!dados || dados.length === 0) {
        this.dialog.open(Popup, {
          data: { text: 'Nenhum registro de receita encontrado para este período.', typePopUp: 'ok' }
        });   
      return;
    }

    const logoBase64 = await this.carregarImagemBase64('/assets/images/hello-kitty-relatorio.png');

    //Agrupa por data
    const gruposPorDia = dados.reduce((acc: any, sol: any) => {
      const dia = sol.data ? sol.data.split('T')[0] : 'Data Desconhecida';
      if (!acc[dia]) acc[dia] = [];
      acc[dia].push(sol);
      return acc;
    }, {});

    const conteudoPdf: any[] = [];

    Object.keys(gruposPorDia).sort().forEach(dia => {
      const diaBR = dia.includes('-') ? dia.split('-').reverse().join('/') : dia;

      conteudoPdf.push({ text: ` ${diaBR}`, style: 'dayHeader', margin: [0, 15, 0, 5] });

      const linhas = gruposPorDia[dia].map((sol: any) => [
        sol.id.toString(),
        sol.equip || '-',
        sol.desc || '-',
        sol.est || '-',
        'R$ 150,00'//Depois coloca o sol.valor aqui
      ]);

      conteudoPdf.push({
        table: {
          headerRows: 1,
          widths: [30, '*', '*', 80, 70],
          body: [
            [
              { text: 'ID', style: 'tableHeader' },
              { text: 'Equipamento', style: 'tableHeader' },
              { text: 'Descrição', style: 'tableHeader' },
              { text: 'Status', style: 'tableHeader' },
              { text: 'Receita', style: 'tableHeader' }
            ],
            ...linhas
          ]
        },
        layout: { fillColor: (rowIndex: number) => (rowIndex % 2 === 0 && rowIndex !== 0) ? '#f2f2f2' : null }
      });
    });

    const estruturaRelatorio: any = {
      background: function (currentPage: number, pageSize: any) {
        return {
          canvas: [
            {
              type: 'rect',
              x: 0, y: 0,
              w: pageSize.width, h: pageSize.height,
              color: '#fff1f2'
            }
          ]
        };
      },
      content: [
        ...(logoBase64 ? [{ image: logoBase64, width: 330, alignment: 'center', margin: [0, 0, 0, 10] }] : []),
        { text: 'Receitas por Período', style: 'header' },
        { text: `${subtituloFiltro}`, style: 'subheader' },
        ...conteudoPdf,
        { text: `Total de Serviços: ${dados.length}`, style: 'totais', margin: [0, 20, 0, 0] }
      ],
      styles: {
        header: { fontSize: 22, bold: true, color: '#862e55', margin: [0, 0, 0, 5] },
        subheader: { fontSize: 12, color: '#666666', margin: [0, 0, 0, 10] },
        dayHeader: { fontSize: 14, bold: true, color: '#333333' },
        tableHeader: { bold: true, fontSize: 12, color: 'white', fillColor: '#862e55' },
        totais: { fontSize: 14, bold: true, alignment: 'right' }
      }
    };

    pdfMake.createPdf(estruturaRelatorio).download('🧡relatorio-receitas-periodo.pdf');
  }

  private async construirPdfCategoria(dados: any[], categoria: string) {
    if (!dados || dados.length === 0) {
      this.dialog.open(Popup, {
        data: { text: 'Nenhum registro encontrado para esta categoria.', typePopUp: 'ok' }
      });
      return;
    }

    const logoBase64 = await this.carregarImagemBase64('/assets/images/hello-kitty-relatorio.png');

    const linhasTabela = dados.map(sol => [
      sol.id.toString(),
      sol.data ? sol.data.split('T')[0].split('-').reverse().join('/') : 'N/D',
      sol.equip || '-',
      sol.desc || '-',
      sol.est || '-',
      'R$ 150,00' //aqui também
    ]);

    const estruturaRelatorio: any = {
      background: function (currentPage: number, pageSize: any) {
        return {
          canvas: [
            {
              type: 'rect',
              x: 0, y: 0,
              w: pageSize.width, h: pageSize.height,
              color: '#fff1f2'
            }
          ]
        };
      },
      content: [
        ...(logoBase64 ? [{ image: logoBase64, width: 330, alignment: 'center', margin: [0, 0, 0, 10] }] : []),
        { text: 'Receitas por Categoria', style: 'header' },
        { text: `Categoria: ${categoria}`, style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: [30, 60, '*', '*', 80, 70],
            body: [
              [
                { text: 'ID', style: 'tableHeader' },
                { text: 'Data', style: 'tableHeader' },
                { text: 'Equipamento', style: 'tableHeader' },
                { text: 'Descrição', style: 'tableHeader' },
                { text: 'Status', style: 'tableHeader' },
                { text: 'Receita', style: 'tableHeader' }
              ],
              ...linhasTabela
            ]
          },
          layout: { fillColor: (rowIndex: number) => (rowIndex % 2 === 0 && rowIndex !== 0) ? '#f2f2f2' : null }
        },
        { text: `Total de Serviços: ${dados.length}`, style: 'totais', margin: [0, 20, 0, 0] }
      ],
      styles: {
        header: { fontSize: 22, bold: true, color: '#862e55', margin: [0, 0, 0, 5] },
        subheader: { fontSize: 12, color: '#666666', margin: [0, 0, 0, 20] },
        tableHeader: { bold: true, fontSize: 12, color: 'white', fillColor: '#862e55' },
        totais: { fontSize: 14, bold: true, alignment: 'right' }
      }
    };

    pdfMake.createPdf(estruturaRelatorio).download('❤️relatorio-receitas-categoria.pdf');
  }
}