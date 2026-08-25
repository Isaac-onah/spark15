import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.html',
  styleUrls: ['./search-input.css']
})
export class SearchInput {
  placeholder = input('Search...');
  value = signal('');
  searchChanged = output<string>();
  
  onInput(event: string) {
    this.value.set(event);
    this.searchChanged.emit(event);
  }
  
  clear() {
    this.value.set('');
    this.searchChanged.emit('');
  }
}
