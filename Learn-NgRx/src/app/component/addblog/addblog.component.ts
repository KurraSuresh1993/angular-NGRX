import { Component } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addblog } from 'src/app/shared/store/blog/blog.actions';
import { BlogModel } from 'src/app/shared/store/blog/blog.model';
import { AppStateModel } from 'src/app/shared/store/global/appstate.model';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent {
  
  constructor(private matdislogref: MatDialogRef<AddblogComponent>,private builder:FormBuilder,private store:Store<AppStateModel>) {

  }
  closePopUp(): void {
    this.matdislogref.close();
  }
  blogForm=this.builder.group({
    id:this.builder.control(0),
    title:this.builder.control('',Validators.required),
    description:this.builder.control('',Validators.required)
  });

  saveBlog():void{
    if(this.blogForm.valid){
      const _blogInput:BlogModel={
        id:0,
        title:this.blogForm.value.title as string,
        description:this.blogForm.value.description as string
      }
      this.store.dispatch(addblog({bloginput:_blogInput}));
      this.closePopUp();
    }
  }
}
