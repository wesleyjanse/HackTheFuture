import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormSharedModule } from './core/form.module';
import { MaterialModule } from './core/material.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatSortModule } from '@angular/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChooseBankComponent } from './components/choose-bank/choose-bank.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security.interceptor';


const appRoutes: Routes = [
  { path: '', component: ChooseBankComponent },
  { path: 'dashboard', component: DashboardComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    ChooseBankComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormSharedModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    BrowserModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    MaterialModule,
    FormSharedModule,
    MatIconModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
