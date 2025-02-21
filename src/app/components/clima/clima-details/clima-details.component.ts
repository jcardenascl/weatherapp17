import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-clima-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatChipsModule
  ],
  template: `<mat-card class="example-card" appearance="outlined">
  <mat-card-header>
    <mat-card-title>{{ weatherData() | json}}</mat-card-title>
  </mat-card-header>
  <mat-card-content>
  <div class="content-info">
      <div class="top-content">
        <div>
          <h2>34° grados Celsius</h2>
          <h6>34° grados Fahrenheit</h6>
        </div>
        <div class="right_content">
         <p>Parcialmente nublado</p>
         <p>Viento: 18 km/h</p>
         <p>Humedad: 44%</p>
        </div>
        
      </div>
      <div >
        
      </div>
      
    </div>
  </mat-card-content>
  <mat-card-footer class="example-card-footer">
    <mat-chip-set aria-label="Otros Datos">
      <mat-chip>Pais: Argentina</mat-chip>
      <mat-chip>Región: Distrito Federal</mat-chip>
      <mat-chip>Índice UV: 0.8</mat-chip>
    </mat-chip-set>
  </mat-card-footer>
</mat-card>`,
  styleUrl: './clima-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClimaDetailsComponent { 
  weatherData = input<any>();
}
