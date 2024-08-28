import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { customincrement } from 'src/app/shared/store/counter.actions';
import { CounterModel } from 'src/app/shared/store/counter.model';

@Component({
  selector: 'app-customcounter',
  templateUrl: './customcounter.component.html',
  styleUrls: ['./customcounter.component.css'],
})
export class CustomcounterComponent {
  counterInput!: number;
  actionType = 'add';
  constructor(private store: Store<{ counter: CounterModel }>) {}
  onIncrement() {
    this.store.dispatch(
      customincrement({ value: +this.counterInput, action: this.actionType })
    );
  }
}
