import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.html',
  styleUrls: ['./empty-state.css']
})
export class EmptyState {
  icon = input<'search' | 'users' | 'inbox' | 'chart'>('search');
  title = input('No results found');
  message = input('Try adjusting your search or filter criteria.');
}
