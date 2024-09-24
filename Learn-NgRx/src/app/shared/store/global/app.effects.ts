import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, map, pipe } from 'rxjs';
import { showalert, emptyaction } from './app.action';

@Injectable()
export class AppEffects {
  constructor(private action$: Actions, private snackbar: MatSnackBar) {}

  _showalert = createEffect(() =>
    this.action$.pipe(
      ofType(showalert),
      exhaustMap((action) => {
        return this.ShowsnackbarAlert(action.message, action.actionresult)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyaction();
            })
          );
      })
    )
  );

  ShowsnackbarAlert(message: string, actionresult: string = 'fail') {
    let _class = actionresult == 'pass' ? 'green-snackbar' : 'red-snackbar';
    return this.snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [_class],
      duration: 5000,
    });
  }
}
