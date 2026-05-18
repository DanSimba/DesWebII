import { Injectable } from '@angular/core';
import { RelatorioType } from '../models/relatorio-interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
 
@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  
  generatePDF(filtros: RelatorioType) {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Relatório de Receitas', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    

    let subtitulo = 'Filtros aplicados: ';
    let temFiltro = false;
    
    if (filtros.categoria) {
      subtitulo += `Categoria: ${filtros.categoria} `;
      temFiltro = true;
    }
    if (filtros.dataInicio && filtros.dataFim) {
      subtitulo += `${temFiltro ? '| ' : ''}Período: ${filtros.dataInicio} a ${filtros.dataFim}`;
      temFiltro = true;
    }
    
    if (!temFiltro) {
      subtitulo += 'Nenhum (Listando todo o histórico)';
    }

    doc.text(subtitulo, 14, 30);


    const dadosMockados = [
      ['101', '01/09/2025', 'Placa Mãe Asus', 'Manutenção Preventiva', 'R$ 250,00'],
      ['102', '05/09/2025', 'Fonte Corsair', 'Troca de Componente', 'R$ 150,00'],
      ['103', '10/09/2025', 'Notebook Dell', 'Limpeza Interna', 'R$ 120,00'],
      ['104', '15/09/2025', 'Monitor LG', 'Reparo de Tela', 'R$ 300,00'],
    ];

    autoTable(doc, {
      startY: 35,
      head: [['ID', 'Data', 'Equipamento', 'Serviço', 'Valor (R$)']],
      body: dadosMockados,
      theme: 'striped',

      headStyles: { fillColor: [134, 46, 85] }, 
    });


    const finalY = (doc as any).lastAutoTable.finalY || 40;
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Total Recebido: R$ 820,00', 14, finalY + 10);


    doc.save('relatorio-receitas.pdf');
  }
}