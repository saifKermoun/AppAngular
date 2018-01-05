import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages/messages.component';
import {WebService} from './services/web.service';
import {HttpClientModule} from '@angular/common/http';
import { NewMessagesComponent } from './messages/new-messages/new-messages.component';
// Importer ReactiveFormsModule pour use formbuilder
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavComponent } from './nav/nav/nav.component';
import {routes} from './routes/routes';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register/register.component';
import {AuthService} from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {AuthGuard} from "./guards/auth.guard";
import {ErrorsService} from "./services/errors.service";

import { BsDropdownModule } from "ngx-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NewMessagesComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routes,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    WebService,
    AuthService,
    AuthGuard,
    ErrorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
