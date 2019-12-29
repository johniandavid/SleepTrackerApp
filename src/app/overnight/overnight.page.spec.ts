import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OvernightPage } from './overnight.page';

describe('OvernightPage', () => {
  let component: OvernightPage;
  let fixture: ComponentFixture<OvernightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvernightPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OvernightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
