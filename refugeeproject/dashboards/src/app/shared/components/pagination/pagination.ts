import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class Pagination {
  currentPage = input.required<number>();
  totalItems = input.required<number>();
  pageSize = input(10);
  
  pageChanged = output<number>();
  
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));
  
  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | '...')[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
      if (current < total - 2) pages.push('...');
      pages.push(total);
    }
    return pages;
  });
  
  startItem = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
  endItem = computed(() => Math.min(this.currentPage() * this.pageSize(), this.totalItems()));
  
  goToPage(page: number | '...') {
    if (page === '...' || page === this.currentPage()) return;
    this.pageChanged.emit(page as number);
  }
  
  previousPage() {
    if (this.currentPage() > 1) this.pageChanged.emit(this.currentPage() - 1);
  }
  
  nextPage() {
    if (this.currentPage() < this.totalPages()) this.pageChanged.emit(this.currentPage() + 1);
  }
}
