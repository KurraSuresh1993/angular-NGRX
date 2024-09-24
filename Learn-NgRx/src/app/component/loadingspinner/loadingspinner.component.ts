import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getspinnerstate } from 'src/app/shared/store/blog/blog.selecter';

@Component({
  selector: 'app-loadingspinner',
  templateUrl: './loadingspinner.component.html',
  styleUrls: ['./loadingspinner.component.css'],
})
export class LoadingspinnerComponent implements OnInit {
  isloaded: boolean = true;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.select(getspinnerstate).subscribe((res) => {
      console.log(res);
      this.isloaded = res;
    });
  }
}
