import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCatetoriesComponent } from './all-catetories.component';

describe('AllCatetoriesComponent', () => {
  let component: AllCatetoriesComponent;
  let fixture: ComponentFixture<AllCatetoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCatetoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCatetoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
