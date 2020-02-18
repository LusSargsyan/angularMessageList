import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseService } from '../services/fireBase/firebase.service';
import { MessagesService } from '../services/messages/messages.service';
import { Message } from '../models/message.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './sentMessages.component.html',
  styleUrls: ['./sentMessages.component.css']
})
export class SentMessagesComponent implements OnInit {

  sentMessages: Message[];
  pattern: string;
  contactList: Message[];
  isChatBoxOpen = false;
  chatOwnerData: any;

  constructor(private firebase: FirebaseService, private messageService: MessagesService) {
   }

  ngOnInit() {
     this.messageService.getSentMessages().subscribe(resData => {
      this.sentMessages = resData;
    });

    this.getContactList();
  }

  sendMessage(input: string) {
    const message = {name: this.chatOwnerData.name, message: input};
    this.messageService.setMessage(message);
  }

  getContactList() {
    this.messageService.getContactList().subscribe(resData => {
      this.contactList = resData;
    });
  }

  search() {
    if(this.pattern == "") {
      this.ngOnInit();
    } else {
      this.sentMessages = this.sentMessages.filter(
        word => {
          return word.name.toLocaleLowerCase().match(this.pattern.toLocaleLowerCase())
        }
      );
    }
  }

  searchInContactList(pattern) {
    if(pattern.target.value == "") {
      this.ngOnInit();
    } else {
      this.contactList = this.contactList.filter(
        word => {
          return word.name.toLocaleLowerCase().match(pattern.target.value.toLocaleLowerCase())
        }
      );
    }
  }

  openChatBox(event: []) {
    this.isChatBoxOpen = true;
    this.chatOwnerData = event;
  }



}
