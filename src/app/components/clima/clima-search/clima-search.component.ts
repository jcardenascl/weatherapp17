import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Observable, startWith, switchMap } from 'rxjs';
import { WeatherService } from '../../../services/weather.service';
import { CityObject } from '../../../interfaces/weather.interface';
import { MatOptionSelectionChange } from '@angular/material/core';
import { WeatherStore } from '../../../signalStores/clima.store';

@Component({
  selector: 'app-clima-search',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  providers: [WeatherStore],
  template: `<mat-form-field appearance="fill">
  <input type="text"
         placeholder="Buscar ciudad (Autocompletar)"
         matInput
         [formControl]="searchControl"
         [matAutocomplete]="auto">
  <mat-autocomplete class="w-full"
                    autoActiveFirstOption
                    #auto="matAutocomplete" [displayWith]="displayFn">
      <mat-option *ngFor="let option of filteredOptions  | async"
                  [value]="option"
                  (onSelectionChange)="selectedCity($event)"
                >
          {{ option.name }}
      </mat-option>
  </mat-autocomplete>
</mat-form-field>`,
  styleUrl: './clima-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClimaSearchComponent { 
  readonly store = inject(WeatherStore);
  searchControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];

  filteredOptions: Observable<CityObject[]> | undefined ;

  constructor(private weatherService: WeatherService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      debounceTime( 300 ),
      switchMap((value) => this.weatherService.searchCities(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(state: CityObject) {
    return state.name;
  }

  selectedCity(city: MatOptionSelectionChange) {
    if (city && city.source.value) {
      this.store.updateQuery(city.source.value.name);
      const q = this.store.filter.query
      this.store.loadByQuery(q);
      this.changeDetectorRef.detectChanges();
    }
  }
}
