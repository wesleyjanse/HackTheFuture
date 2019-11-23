import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import { AnomalyComponent } from './anomaly/anomaly.component';
import { NavbarComponent } from './navbar/navbar.component';
=======
import { MaterialModule } from './core/material.module';
import { FormSharedModule } from './core/form.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
>>>>>>> bootstrap  & material


const appRoutes: Routes = [
  { path: '', component: AppComponent },
  ];
@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    HomeComponent,
    AnomalyComponent,
    NavbarComponent
=======
    HomeComponent
>>>>>>> bootstrap  & material
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
