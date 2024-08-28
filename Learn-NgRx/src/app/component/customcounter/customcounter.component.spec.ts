import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomcounterComponent } from './customcounter.component';

describe('CustomcounterComponent', () => {
  let component: CustomcounterComponent;
  let fixture: ComponentFixture<CustomcounterComponent>;
  let store: Store<{ counter: { counter: number } }>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomcounterComponent],
      imports: [FormsModule, StoreModule.forRoot({ counter: counterReducer })],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CustomcounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch customincrement action with the correct value', () => {
    spyOn(store, 'dispatch').and.callThrough();
    component.counterInput = 5;
    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledWith(customincrement({ value: 5 }));
  });
});
