import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SentMessagesComponent } from './sentMessages/sentMessages.component';
import { AuthGuard } from './guards/auth.guard';
import { RecivedMessagesComponent } from './recived-messages/recived-messages.component';

const routes: Routes = [
  {path: '', redirectTo: '/recivedMessages', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'signUp', component: SignUpComponent },
  {path: 'sentMessages', component: SentMessagesComponent, canActivate: [AuthGuard]},
  {path: 'recivedMessages', component: RecivedMessagesComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
