import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoItemShowComponent } from './deco-item-show.component';

describe('DecoItemShowComponent', () => {
  let component: DecoItemShowComponent;
  let fixture: ComponentFixture<DecoItemShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoItemShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoItemShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
