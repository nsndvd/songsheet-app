import { AppRoutingModule } from '../../app-routing.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserComponent } from './browser.component';
import { SongComponent } from '../song/song.component';
import { EventComponent } from '../event/event.component';
import { EditorComponent } from '../editor/editor.component';
import { SettingsComponent } from '../settings/settings.component';

describe('BrowserComponent', () => {
  let component: BrowserComponent;
  let fixture: ComponentFixture<BrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        BrowserComponent,
        SongComponent,
        EventComponent,
        EditorComponent,
        SettingsComponent
      ],
      imports: [
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
