import { Component } from '@angular/core';
import { NavBarFunc } from '../../shared/components/nav-bar-func/nav-bar-func';
import { FuncionarioCrud } from '../../presentation/func/funcionario-crud/funcionario-crud';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crud-func',
  imports: [NavBarFunc, FuncionarioCrud, RouterOutlet],
  templateUrl: './crud-func.html',
  styleUrl: './crud-func.css',
})
export class CrudFunc {

}
