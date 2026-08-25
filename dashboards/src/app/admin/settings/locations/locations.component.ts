import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './locations.component.html'
})
export class LocationsComponent {
  private toastService = inject(ToastService);
  
  locations = signal([
    { id: 1, name: 'Berlin', neighborhood: 'Mitte', enabled: true },
    { id: 2, name: 'Berlin', neighborhood: 'Kreuzberg', enabled: true },
    { id: 3, name: 'Berlin', neighborhood: 'Neukölln', enabled: true },
    { id: 4, name: 'Berlin', neighborhood: 'Friedrichshain', enabled: true },
    { id: 5, name: 'Berlin', neighborhood: 'Prenzlauer Berg', enabled: true },
    { id: 6, name: 'Berlin', neighborhood: 'Charlottenburg', enabled: false },
    { id: 7, name: 'Berlin', neighborhood: 'Schöneberg', enabled: true },
    { id: 8, name: 'Berlin', neighborhood: 'Wedding', enabled: true }
  ]);

  isModalOpen = signal(false);
  editingLocation = signal<any>(null);
  
  editLocation(loc: any) {
    this.editingLocation.set({...loc});
    this.isModalOpen.set(true);
  }
  
  openAddModal() {
    this.editingLocation.set({ name: 'Berlin', neighborhood: '', enabled: true });
    this.isModalOpen.set(true);
  }
  
  saveLocation() {
    this.toastService.success('Success', 'Location saved');
    this.isModalOpen.set(false);
  }
  
  deleteLocation(loc: any) {
    this.toastService.success('Success', 'Location deleted');
  }
}
