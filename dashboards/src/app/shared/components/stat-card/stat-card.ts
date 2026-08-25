import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrls: ['./stat-card.css']
})
export class StatCard {
  title = input.required<string>();
  value = input.required<string | number>();
  trend = input<string>();
  trendDirection = input<'up' | 'down' | 'neutral'>('neutral');
  icon = input<string>('chart');
  color = input<'indigo' | 'purple' | 'emerald' | 'rose' | 'blue' | 'amber' | 'orange'>('indigo');
}
