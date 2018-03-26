import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BrowserComponent} from './browser/browser.component';
import {EditorComponent} from './editor/editor.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'browser/songs',
    pathMatch: 'full'
  },
  {
    path: 'browser/:type',
    component: BrowserComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
