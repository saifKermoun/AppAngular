import {Routes, RouterModule} from '@angular/router';
import {MessagesComponent} from '../messages/messages/messages.component';
import {HomeComponent} from '../home/home.component';
import {RegisterComponent} from '../register/register/register.component';
import {LoginComponent} from '../login/login.component';
import {UserComponent} from "../user/user.component";
import {AuthGuard} from '../guards/auth.guard';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component:  HomeComponent},
  { path: 'message/:name', component:  MessagesComponent},
  { path: 'messages', component:  MessagesComponent},
  { path: 'register', component:  RegisterComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'user', component:  UserComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home'},
];

export const routes = RouterModule.forRoot(appRoutes);
