import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/fireBase/firebase.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }

  onLogout() {
    this.firebase.logout();
  }

}
