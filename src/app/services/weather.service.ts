import { HttpClient } from '@angular/common/http';
import { effect, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { CityObject, WeatherObject } from '../interfaces/weather.interface';


@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private apiKey = '13421173b3dd4fbaa1d130454252002';
  private baseUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {
  }

  searchCities(query: string): Observable<CityObject[]> {
    return this.http
      .get(`${this.baseUrl}/search.json?key=${this.apiKey}&q=${query}`)
      .pipe(map((res: any) => res));
  }

  getCurrentWeather(city: string) {
    return this.http
      .get<WeatherObject>(`${this.baseUrl}/current.json?key=${this.apiKey}&q=${city}`)
      .pipe(shareReplay(1));
  }




}
