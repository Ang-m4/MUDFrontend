import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoItemListComponent } from './deco-item-list.component';

describe('DecoItemListComponent', () => {
  let component: DecoItemListComponent;
  let fixture: ComponentFixture<DecoItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
