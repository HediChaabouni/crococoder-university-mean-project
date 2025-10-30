import { Pipe, PipeTransform } from '@angular/core';
import { interval, map, take, of } from 'rxjs';

@Pipe({
  name: 'countUp',
  pure: true
})
export class CountUpPipe implements PipeTransform {

  transform(value: number, duration: number = 1000) {
    // Si valeur invalide → Observable qui émet 0
    if (typeof value !== 'number' || isNaN(value)) {
      return of(0);
    }

    const steps = 60; // environ 60 images par seconde
    const stepTime = Math.max(duration / steps, 16);
    const increment = value / steps;

    return interval(stepTime).pipe(
      take(steps + 1),
      map(i => Math.round(i * increment))
    );
  }
}



