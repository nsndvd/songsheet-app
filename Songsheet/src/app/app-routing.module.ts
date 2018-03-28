import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {BrowserComponent} from './components/browser/browser.component';
import {EditorComponent} from './components/editor/editor.component';
import {SettingsComponent} from './components/settings/settings.component';

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
