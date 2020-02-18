import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SentMessagesComponent } from './sentMessages/sentMessages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { AngularFireLite } from 'angularfire-lite';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/fireBase/firebase.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { RecivedMessagesComponent } from './recived-messages/recived-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SentMessagesComponent,
    ErrorComponent,
    RecivedMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireLite.forRoot(environment.config),
    FormsModule
  ],
  providers: [
    FirebaseService,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
