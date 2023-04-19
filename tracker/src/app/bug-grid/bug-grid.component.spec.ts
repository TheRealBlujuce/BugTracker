import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugGridComponent } from './bug-grid.component';

describe('BugGridComponent', () => {
  let component: BugGridComponent;
  let fixture: ComponentFixture<BugGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
