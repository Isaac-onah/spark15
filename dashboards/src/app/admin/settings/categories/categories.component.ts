import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent {
  private toastService = inject(ToastService);
  
  categories = signal([
    { id: 1, name: 'Tailoring', icon: '✂️', enabled: true, order: 1, subServices: ['Alterations', 'Custom Clothing', 'Repairs'] },
    { id: 2, name: 'Cooking & Catering', icon: '🍲', enabled: true, order: 2, subServices: ['Event Catering', 'Meal Prep', 'Baking'] },
    { id: 3, name: 'Tutoring', icon: '📚', enabled: true, order: 3, subServices: ['Language', 'Math', 'Science'] },
    { id: 4, name: 'IT Services', icon: '💻', enabled: true, order: 4, subServices: ['Repair', 'Setup', 'Web Design'] },
    { id: 5, name: 'Translation', icon: '🌐', enabled: true, order: 5, subServices: ['Document', 'Live Interpretation'] },
    { id: 6, name: 'Cleaning', icon: '🧹', enabled: true, order: 6, subServices: ['Home', 'Office', 'Deep Clean'] },
    { id: 7, name: 'Beauty & Hair', icon: '💇', enabled: false, order: 7, subServices: ['Haircuts', 'Styling', 'Makeup'] },
    { id: 8, name: 'Handyman', icon: '🔧', enabled: true, order: 8, subServices: ['Plumbing', 'Electrical', 'Assembly'] },
    { id: 9, name: 'Childcare', icon: '👶', enabled: true, order: 9, subServices: ['Babysitting', 'Nanny', 'Event Care'] },
    { id: 10, name: 'Music & Arts', icon: '🎵', enabled: true, order: 10, subServices: ['Lessons', 'Performances'] }
  ]);

  isModalOpen = signal(false);
  editingCategory = signal<any>(null);
  
  editCategory(cat: any) {
    this.editingCategory.set({...cat});
    this.isModalOpen.set(true);
  }
  
  openAddModal() {
    this.editingCategory.set({ name: '', icon: '✨', enabled: true, order: this.categories().length + 1, subServices: [] });
    this.isModalOpen.set(true);
  }
  
  saveCategory() {
    this.toastService.success('Success', 'Category saved successfully');
    this.isModalOpen.set(false);
  }
  
  deleteCategory(cat: any) {
    this.toastService.success('Success', 'Category deleted');
  }

  moveUp(index: number) {}
  moveDown(index: number) {}
}
