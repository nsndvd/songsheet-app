import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserComponent } from './browser/browser.component';
import { SettingsComponent } from './settings/settings.component';
import { EditorComponent } from './editor/editor.component';
import { NavComponent } from './nav/nav.component';
import { SongComponent } from './song/song.component';
import { EventComponent } from './event/event.component';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
