import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-content-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './content-policy.component.html'
})
export class ContentPolicyComponent {
  private toastService = inject(ToastService);
  
  content = signal('# Content Policy & Community Guidelines\n\nSpark 15 is a safe space for refugees and locals. We do not tolerate hate speech, discrimination, or illegal services.\n\n## Prohibited Content\nAny content that promotes violence, self-harm, or discrimination based on race, religion, or sexual orientation is strictly forbidden.');
  lastUpdated = 'November 2, 2023';
  updatedBy = 'Isaac Onah';

  prohibitedWords = signal(['hate', 'scam', 'illegal', 'weapon', 'drugs', 'violence']);
  newWord = '';

  savePolicy() {
    this.toastService.success('Success', 'Content Policy updated successfully');
  }

  addWord() {
    if (this.newWord && !this.prohibitedWords().includes(this.newWord)) {
      this.prohibitedWords.update(w => [...w, this.newWord.toLowerCase()]);
      this.newWord = '';
    }
  }

  removeWord(word: string) {
    this.prohibitedWords.update(w => w.filter(x => x !== word));
  }
}
