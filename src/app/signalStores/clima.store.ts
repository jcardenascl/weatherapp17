import { computed, effect, inject, Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, exhaustMap, lastValueFrom, pipe, switchMap, tap } from 'rxjs';
import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { WeatherService } from '../services/weather.service';
import { WeatherObject } from '../interfaces/weather.interface';
 
type WeatherState = { 
    weather: WeatherObject; 
    isLoading: boolean,
    filter: { query: string; order: 'asc' | 'desc' };
 };
 
const initialState: WeatherState = {
  weather: {},
  isLoading: false,
  filter: { query: '', order: 'asc' },
};
 
export const WeatherStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ weather }) => ({
        ciudad: computed(() => weather.location?.name)
    })),
    withMethods((store, weatherService = inject(WeatherService)) => ({
        updateQuery(query: string): void {
            patchState(store, (state) => ({ filter: { ...state.filter, query } }));
        },
        loadByQuery: rxMethod<string>(
            pipe(
              debounceTime(300),
              distinctUntilChanged(),
              tap(() => patchState(store, { isLoading: true })),
              switchMap((query) => {
                return weatherService.getCurrentWeather(query).pipe(
                  tapResponse({
                    next: (weather) => patchState(store, { weather, isLoading: false }),
                    error: (err) => {
                      patchState(store, { isLoading: false });
                      console.error(err);
                    },
                  })
                );
              })
            )
        ),
    })),
    withHooks({
        onInit(store) {
          effect(() => {
            // 👇 The effect is re-executed on state change.
            const state = getState(store);
            console.log('counter state', state);
          });
    
        },
    })
);
 
//   weather = this.state.weather;
//   isLoading = this.state.isLoading;
 
//   readonly loadWeather = rxMethod<string>(
//     pipe(
//       tap(() => patchState(this.state, { isLoading: true })),
//       exhaustMap((city) => {
//         return this.#weatherService.getCurrentWeather(city).pipe(
//           tapResponse({
//             next: (weather) => patchState(this.state, { weather }),
//             error: console.error,
//             finalize: () => patchState(this.state, { isLoading: false }),
//           })
//         );
//       })
//     )
//   );



  

