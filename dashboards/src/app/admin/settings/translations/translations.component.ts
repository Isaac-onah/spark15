import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-translations',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './translations.component.html'
})
export class TranslationsComponent {
  private toastService = inject(ToastService);
  
  languages = ['de', 'en', 'ar', 'ti', 'fa', 'so'];
  activeLang = signal('en');

  translations = signal([
    { key: 'nav.dashboard', de: 'Dashboard', en: 'Dashboard', ar: 'لوحة القيادة' },
    { key: 'nav.bookings', de: 'Buchungen', en: 'Bookings', ar: 'الحجوزات' },
    { key: 'btn.save', de: 'Speichern', en: 'Save', ar: 'حفظ' },
    { key: 'btn.cancel', de: 'Abbrechen', en: 'Cancel', ar: 'إلغاء' },
    { key: 'msg.welcome', de: 'Willkommen zurück', en: 'Welcome back', ar: 'مرحباً بعودتك' },
    { key: 'form.email', de: 'E-Mail Adresse', en: 'Email Address', ar: 'البريد الإلكتروني' },
    { key: 'form.password', de: 'Passwort', en: 'Password', ar: 'كلمة المرور' },
    { key: 'status.active', de: 'Aktiv', en: 'Active', ar: 'نشط' },
    { key: 'status.pending', de: 'Ausstehend', en: 'Pending', ar: 'قيد الانتظار' },
    { key: 'error.required', de: 'Dieses Feld ist erforderlich', en: 'This field is required', ar: 'هذا الحقل مطلوب' }
  ]);

  editingKey = signal<string | null>(null);
  
  saveTranslation(key: string, value: string) {
    this.editingKey.set(null);
    this.toastService.success('Success', 'Translation updated');
  }
}
