import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BlogModel, Blogs } from 'src/app/shared/store/blog/blog.model';
import { getblog, getbloginfo } from 'src/app/shared/store/blog/blog.selecter';
import { AppStateModel } from 'src/app/shared/store/global/appstate.model';
import { AddblogComponent } from '../addblog/addblog.component';
import {
  deleteblog,
  loadblog,
  loadspinner,
} from 'src/app/shared/store/blog/blog.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogList!: BlogModel[];
  blogInfo!: Blogs;

  constructor(private store: Store<AppStateModel>, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.store.dispatch(loadspinner({ IsLoaded: true }));
    setTimeout(() => {
      this.store.dispatch(loadblog());
    }, 1000);
    this.store.select(getbloginfo).subscribe((item) => {
      this.blogInfo = item;
      console.log(this.blogInfo);
    });
  }
  AddBlog(): void {
    this.openDailog(0, 'Add Blog');
  }
  openDailog(id: any, title: any, isedit = false): void {
    this.dialog.open(AddblogComponent, {
      width: '40%',
      data: {
        id: id,
        title: title,
        isedit: isedit,
      },
    });
  }
  editBlog(id: any): void {
    console.log(id);
    this.openDailog(id, 'Edit Blog', true);
  }
  deleteBlog(id: any): void {
    console.log(id);
    if (confirm('Are you sure want to delete?')) {
      this.store.dispatch(loadspinner({ IsLoaded: true }));
      setTimeout(() => {
        this.store.dispatch(deleteblog({ id: id }));
      }, 1000);
    }
  }
}
