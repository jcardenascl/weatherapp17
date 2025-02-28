import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClimaComponent } from './components/clima/clima.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClimaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'weatherapp17';
}
