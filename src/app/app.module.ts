import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormSharedModule } from './core/form.module';
import { MaterialModule } from './core/material.module';
<<<<<<< HEAD
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

=======
import { HomeComponent } from './components/home/home.component';
import { AnomalyComponent } from './components/anomaly/anomaly.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'anomaly', component: AnomalyComponent }
  ];

>>>>>>> routing added
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnomalyComponent,
    NavbarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormSharedModule,
  ],
  exports: [
    MaterialModule,
    FormSharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
