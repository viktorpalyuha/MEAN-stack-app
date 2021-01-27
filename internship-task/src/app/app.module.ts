import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkersComponent } from 'src/app/pages/workers/workers.component';
import { WorkerComponent } from './pages/workers/worker/worker.component';
import { WorkerEditComponent } from './pages/workers/worker-edit/worker-edit.component';
import { WorkerCreateComponent } from './pages/workers/worker-create/worker-create.component';
import { WorkersListComponent } from './pages/workers/workers-list/workers-list.component';
import { IsLoggedIn } from './isLogged.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    WorkersComponent,
    WorkerComponent,
    WorkerEditComponent,
    WorkerCreateComponent,
    WorkersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService, IsLoggedIn],
  bootstrap: [AppComponent]
})
export class AppModule { }
