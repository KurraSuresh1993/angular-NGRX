import { Component, Inject, OnInit, inject } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  addblog,
  loadspinner,
  updateblog,
} from 'src/app/shared/store/blog/blog.actions';
import { BlogModel } from 'src/app/shared/store/blog/blog.model';
import { getblogbyid } from 'src/app/shared/store/blog/blog.selecter';
import { AppStateModel } from 'src/app/shared/store/global/appstate.model';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css'],
})
export class AddblogComponent implements OnInit {
  pageTitle = '';
  editBlogId = 0;
  editdata!: BlogModel;
  constructor(
    private matdislogref: MatDialogRef<AddblogComponent>,
    private builder: FormBuilder,
    private store: Store<AppStateModel>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log(this.data);
    this.pageTitle = this.data.title;
    if (this.data.isedit) {
      this.editBlogId = this.data.id;
      this.store.select(getblogbyid(this.editBlogId)).subscribe((data) => {
        this.editdata = data;
        console.log(data);
        this.blogForm.setValue({
          id: this.editdata.id,
          title: this.editdata.title,
          description: this.editdata.description,
        });
      });
    }
  }
  closePopUp(): void {
    this.matdislogref.close();
  }
  blogForm = this.builder.group({
    id: this.builder.control(0),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
  });

  saveBlog(): void {
    if (this.blogForm.valid) {
      const _blogInput: BlogModel = {
        id: this.data.isedit ? (this.blogForm.value.id as number) : 0,
        title: this.blogForm.value.title as string,
        description: this.blogForm.value.description as string,
      };
      this.store.dispatch(loadspinner({ IsLoaded: true }));
      setTimeout(() => {
        if (this.data.isedit) {
          _blogInput.id = this.blogForm.value.id as number;
          this.store.dispatch(updateblog({ bloginput: _blogInput }));
        } else {
          this.store.dispatch(addblog({ bloginput: _blogInput }));
        }

        this.closePopUp();
      }, 1000);
    }
  }
}
