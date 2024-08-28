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
    this.counter$ = this.store.select('counter');
    console.log(this.counter$);
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
}
