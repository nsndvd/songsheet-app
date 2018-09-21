import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEventFormComponent } from './song-event-form.component';

describe('SongEventFormComponent', () => {
  let component: SongEventFormComponent;
  let fixture: ComponentFixture<SongEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
