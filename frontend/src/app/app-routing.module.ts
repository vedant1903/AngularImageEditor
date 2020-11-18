import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OcrComponent} from 'src/app/ocr/ocr.component'

const routes: Routes = [
  { path: 'ocr', component: OcrComponent },
];

// @NgModule takes a metadata object that describes how to compile a component's template and how to create an injector at runtime
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
