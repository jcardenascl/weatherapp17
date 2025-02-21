import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { ClimaSearchComponent } from './clima-search/clima-search.component';
import { ClimaDetailsComponent } from './clima-details/clima-details.component';
import { WeatherStore } from '../../signalStores/clima.store';
import { JsonPipe } from '@angular/common';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [ClimaSearchComponent, ClimaDetailsComponent, JsonPipe],
  templateUrl: './clima.component.html',
  styleUrl: './clima.component.scss',
  providers: [WeatherStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class ClimaComponent implements OnInit {
  readonly store = inject(WeatherStore);

  constructor() {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
      console.log('books state changed', state);
    });
  }

  ngOnInit(): void {
    
    
  }

}
