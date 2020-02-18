import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/fireBase/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularMessaging';

  isAuthenticated = false;

  constructor (private firebase: FirebaseService) {}

  ngOnInit() {
    this.firebase.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.firebase.autoLogin();
  }

  onLogout(){
    this.firebase.logout();
  }

}
