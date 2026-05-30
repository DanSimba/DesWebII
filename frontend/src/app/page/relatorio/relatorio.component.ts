import { Component, inject, signal, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { RelatorioType } from '../../models/relatorio-interface';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RelatorioService } from '../../services/relatorio.service';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../shared/components/popup/popup';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [MatIcon, FormsModule],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
})
export class RelatorioComponent implements OnInit {
  cats = signal<Categoria[]>([]);
  
  private catService = inject(CategoriaService);
  private relatorioService = inject(RelatorioService);
  private dialog = inject(Dialog);

  ngOnInit(): void {
    this.catService.listarTodos().subscribe((data) => this.cats.set(data));
  }

  relatorioInfo: RelatorioType = {
    tipoRelatorio: 'periodo',
    dataInicio: '',
    dataFim: '',
  };

  baixarRelatorio() {
    if (this.relatorioInfo.dataInicio && this.relatorioInfo.dataFim) {
      if (new Date(this.relatorioInfo.dataInicio) > new Date(this.relatorioInfo.dataFim)) {
        this.dialog.open(Popup, {
          data: { 
            text: 'A data inicial não pode ser maior que a data final.', 
            typePopUp: 'ok' 
          }
        });
        return;
      }
    }

    this.relatorioService.generatePDF(this.relatorioInfo);
  }
}