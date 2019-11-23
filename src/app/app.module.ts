import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormSharedModule } from './core/form.module';
import { MaterialModule } from './core/material.module';
import { HomeComponent } from './components/home/home.component';
import { AnomalyComponent } from './components/anomaly/anomaly.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'anomaly', component: AnomalyComponent }
  ];

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
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MaterialModule,
    FormSharedModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
