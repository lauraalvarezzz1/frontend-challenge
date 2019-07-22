import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieDialogComponent } from './tie-dialog.component';

describe('TieDialogComponent', () => {
  let component: TieDialogComponent;
  let fixture: ComponentFixture<TieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
