import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SleepinessPage } from './sleepiness.page';

describe('SleepinessPage', () => {
  let component: SleepinessPage;
  let fixture: ComponentFixture<SleepinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SleepinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
