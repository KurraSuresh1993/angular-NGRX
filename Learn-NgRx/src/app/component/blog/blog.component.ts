import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BlogModel } from 'src/app/shared/store/blog/blog.model';
import { getblog } from 'src/app/shared/store/blog/blog.selecter';
import { AppStateModel } from 'src/app/shared/store/global/appstate.model';
import { AddblogComponent } from '../addblog/addblog.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogList!: BlogModel[];

  constructor(private store: Store<AppStateModel>, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.store.select(getblog).subscribe(item => {
      this.blogList = item;
      console.log(this.blogList)
    })

  }
  AddBlog(): void {
    this.openDailog();
  }
  openDailog(): void {
    this.dialog.open(AddblogComponent, { width: '40%' })
  }
}
