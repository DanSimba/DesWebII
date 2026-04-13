import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center justify-center w-full h-[40vh] bg-white/40 rounded-[10px] border-2 border-dashed border-(--antique-ruby)/40 mt-4 shadow-sm">
      <svg class="w-16 h-16 text-(--antique-ruby)/60 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
      </svg>
      
      <p class="text-(--french-puce) font-bold text-lg text-center px-4">
        {{ message() }}
      </p>
    </div>
  `
})
export class EmptyStateComponent {
  public message = input<string>('Nenhum registro encontrado.');
}