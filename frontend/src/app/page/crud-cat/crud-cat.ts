import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarFunc } from '../../shared/components/nav-bar-func/nav-bar-func';
import { CategoriaCrud } from "../../presentation/func/categoria-crud/categoria-crud";

@Component({
  selector: 'app-crud-cat',
  imports: [RouterOutlet, NavBarFunc, CategoriaCrud],
  templateUrl: './crud-cat.html',
  styleUrl: './crud-cat.css',
})
export class CrudCat {

}
