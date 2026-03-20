import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-func',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './func.html',
  styleUrl: './func.css'
})
export class Func {
  constructor() {}
}