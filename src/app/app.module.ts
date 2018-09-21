import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatButtonModule, MatInputModule, MatCardModule, MatDialogModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserComponent } from './components/browser/browser.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditorComponent } from './components/editor/editor.component';
import { SongComponent } from './components/song/song.component';
import { EventComponent } from './components/event/event.component';
import { SongEventFormComponent } from './components/song-event-form/song-event-form.component';
import { ColorComponent } from './components/color/color.component';
import { IconsComponent } from './components/icons/icons.component';
import { PreviewComponent } from './components/preview/preview.component';

import { DataService } from './services/data.service';
import { ParserService } from './services/parser.service';
import { HtmlFactoryService } from './services/html-factory.service';

import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    SettingsComponent,
    EditorComponent,
    SongComponent,
    EventComponent,
    ColorComponent,
    SongEventFormComponent,
    IconsComponent,
    SafePipe,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    DataService,
    ParserService,
    HtmlFactoryService
  ],
  entryComponents: [
    SongEventFormComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }