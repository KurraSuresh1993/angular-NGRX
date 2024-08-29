import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterModel } from 'src/app/shared/store/counter.model';
import { getchannelname } from 'src/app/shared/store/counter.selecter';

@Component({
  selector: 'app-counterdisplay',
  templateUrl: './counterdisplay.component.html',
  styleUrls: ['./counterdisplay.component.css'],
})
export class CounterdisplayComponent implements OnInit, OnDestroy {
  counterValue: number = 0;
  channelName: string = '';
  counterSubscribe!: Subscription;
  counter$!: Observable<CounterModel>;
  constructor(private store: Store<{ counter: CounterModel }>) {}

  ngOnInit(): void {
    this.counterSubscribe = this.store.select(getchannelname).subscribe((data) => {
      //console.log(data.counter);
    //  this.counterValue = data.counter;
      this.channelName = data;
      console.log('counter display');
    });
    // this.counter$ = this.store.select('counter');
    // console.log(this.counter$);
  }

  ngOnDestroy(): void {
    if (this.counterSubscribe) {
      this.counterSubscribe.unsubscribe();
    }
  }
}
