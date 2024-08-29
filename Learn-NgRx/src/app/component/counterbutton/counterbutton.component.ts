import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  changechannelname,
  decrement,
  increment,
  reset,
} from 'src/app/shared/store/counter.actions';
import { CounterModel } from 'src/app/shared/store/counter.model';
import { getcounter } from 'src/app/shared/store/counter.selecter';

@Component({
  selector: 'app-counterbutton',
  templateUrl: './counterbutton.component.html',
  styleUrls: ['./counterbutton.component.css'],
})
export class CounterbuttonComponent implements OnInit {
  counterValue: number = 0;
  channelName: string = '';
  counterSubscribe!: Subscription;
  counter$!: Observable<CounterModel>;
  constructor(private store: Store<{ counter: CounterModel }>) {}
  ngOnInit(): void {

     this.counterSubscribe = this.store.select(getcounter).subscribe((data) => {
     // console.log(data.counter);
      this.counterValue = data;
    
      console.log('counter button');
    });

    // this.counter$ = this.store.select('counter');
    // console.log(this.counter$);
  }
  onIncrement() {
    this.store.dispatch(increment());
  }
  onDecrement() {
    this.store.dispatch(decrement());
  }
  onReset() {
    this.store.dispatch(reset());
  }
  change() {
    this.store.dispatch(
      changechannelname({
        channelname: 'Welcome to Suresh Technologies Pvt Ltd',
      })
    );
  }
  ngOnDestroy(): void {
    if (this.counterSubscribe) {
      this.counterSubscribe.unsubscribe();
    }
  }
}
