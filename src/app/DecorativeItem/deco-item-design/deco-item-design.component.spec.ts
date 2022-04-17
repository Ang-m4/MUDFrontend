import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoItemDesignComponent } from './deco-item-design.component';

describe('DecoItemDesignComponent', () => {
  let component: DecoItemDesignComponent;
  let fixture: ComponentFixture<DecoItemDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoItemDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoItemDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
