import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyEur', standalone: true })
export class CurrencyEurPipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    if (value === null || value === undefined) return '€0.00';
    return `€${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
}
