import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsheetTextareaComponent } from './songsheet-textarea.component';

describe('SongsheetTextareaComponent', () => {
  let component: SongsheetTextareaComponent;
  let fixture: ComponentFixture<SongsheetTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsheetTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsheetTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
