// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { map, mergeMap } from 'rxjs/operators';
// import { loadClimas, loadClimasSuccess } from './clima.actions';

// @Injectable()
// export class ClimaEffects {
//   constructor(private actions$: Actions) {}

//   loadProducts$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadClimas),
//       mergeMap(() =>
//         of([{ id: 1, name: 'Product A' }]).pipe(
//           map((climas) => loadClimasSuccess({ climas }))
//         )
//       )
//     )
//   );
// }