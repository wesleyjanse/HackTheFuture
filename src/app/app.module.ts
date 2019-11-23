import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnomalyComponent } from './components/anomaly/anomaly.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormSharedModule } from './core/form.module';
import { MaterialModule } from './core/material.module';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnomalyComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormSharedModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    MaterialModule,
    FormSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
