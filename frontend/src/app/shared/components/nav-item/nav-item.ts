import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav-item',
  imports: [RouterLink],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.css',
})
export class NavItem {
  readonly label = input.required<string>();
  readonly route = input.required<string>();
  
}
