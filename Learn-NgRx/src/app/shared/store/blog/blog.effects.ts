import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterService } from '../../master.service';
import {
  LOAD_BLOG,
  addblog,
  addblogsuccess,
  deleteblog,
  deleteblogsuccess,
  loadblogfail,
  loadblogsuccess,
  loadspinner,
  updateblog,
  updateblogsuccess,
} from './blog.actions';
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { BlogModel } from './blog.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emptyaction, showalert } from '../global/app.action';
@Injectable()
export class BlogEffects {
  constructor(
    private action$: Actions,
    private service: MasterService,
    private snackbar: MatSnackBar
  ) {}
  _blog = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_BLOG),
      exhaustMap((action) => {
        return this.service.GetAllBlogs().pipe(
          map((data) => {
            return loadblogsuccess({ bloglist: data });
          }),
          catchError((_error) =>
            of(
              loadblogfail({ Errortext: _error }),
              loadspinner({ IsLoaded: false })
            )
          )
        );
      })
    )
  );

  _addblog = createEffect(() =>
    this.action$.pipe(
      ofType(addblog),
      switchMap((action) =>
        this.service.CreateBlog(action.bloginput).pipe(
          switchMap((res) =>
            of(
              addblogsuccess({ bloginput: action.bloginput }),
              showalert({
                message: 'Blog Added is Successfully',
                actionresult: 'pass',
              })
            )
          ),
          catchError((_error) =>
            of(
              showalert({
                message: 'Blog added is faild! Due to ' + _error.message,
                actionresult: 'fail',
              }),
              loadspinner({ IsLoaded: false })
            )
          )
        )
      )
    )
  );

  _updateblog = createEffect(() =>
    this.action$.pipe(
      ofType(updateblog),
      switchMap((action) =>
        this.service.UpdateBlog(action.bloginput).pipe(
          switchMap((res) =>
            of(
              updateblogsuccess({ bloginput: action.bloginput }),
              showalert({
                message: 'Blog Updated is Successfully',
                actionresult: 'pass',
              })
            )
          ),
          catchError((_error) =>
            of(
              showalert({
                message: 'Blog Updated is faild! Due to ' + _error.message,
                actionresult: 'fail',
              }),
              loadspinner({ IsLoaded: false })
            )
          )
        )
      )
    )
  );
  _deleteblog = createEffect(() =>
    this.action$.pipe(
      ofType(deleteblog),
      switchMap((action) =>
        this.service.DeleteBlog(action.id).pipe(
          switchMap((res) =>
            of(
              deleteblogsuccess({ id: action.id }),
              showalert({
                message: 'Blog Deleted is Successfully',
                actionresult: 'pass',
              })
            )
          ),
          catchError((_error) =>
            of(
              showalert({
                message: 'Blog Deleted is faild! Due to ' + _error.message,
                actionresult: 'fail',
              }),
              loadspinner({ IsLoaded: false })
            )
          )
        )
      )
    )
  );
}
