import { Component, inject, signal } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { RelatorioType } from '../../models/relatorio-interface';

@Component({
  selector: 'app-relatorio',
  imports: [],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
})
export class RelatorioComponent {
  cats = signal<Categoria[]>([]);
  private catService = inject(CategoriaService);

  ngOnInit(): void {
    this.catService.listarTodos().subscribe((data) => this.cats.set(data));
  }

  relatorioInfo: RelatorioType = {
    categoria: '',
    dataInicio: '',
    dataFim: '',
    info: '',
  };

  
}
