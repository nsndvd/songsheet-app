import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserComponent } from './components/browser/browser.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditorComponent } from './components/editor/editor.component';
import { NavComponent } from './components/nav/nav.component';
import { SongComponent } from './components/song/song.component';
import { EventComponent } from './components/event/event.component';

import { DataService } from './services/data/data.service';

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    SettingsComponent,
    EditorComponent,
    NavComponent,
    SongComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
