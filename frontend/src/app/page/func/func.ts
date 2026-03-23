import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarFunc } from '../../shared/components/nav-bar-func/nav-bar-func';

@Component({
  selector: 'app-func',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarFunc],
  templateUrl: './func.html',
  styleUrl: './func.css'
})
export class Func {
  constructor() {}
}