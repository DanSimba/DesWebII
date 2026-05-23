import { Component, inject, signal, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { RelatorioType } from '../../models/relatorio-interface';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RelatorioService } from '../../services/relatorio.service';

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

  ngOnInit(): void {
    this.catService.listarTodos().subscribe((data) => this.cats.set(data));
  }

  relatorioInfo: RelatorioType = {
    categoria: '',
    dataInicio: '',
    dataFim: '',
    info: '',
  };

  baixarRelatorio() {
    this.relatorioService.generatePDF(this.relatorioInfo);
  }
}