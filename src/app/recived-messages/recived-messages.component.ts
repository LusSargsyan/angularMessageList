import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages/messages.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-recived-messages',
  templateUrl: './recived-messages.component.html',
  styleUrls: ['./recived-messages.component.css']
})
export class RecivedMessagesComponent implements OnInit {

  recivedMessages: Message[];
  contactList: Message[];
  pattern: string;
  isChatBoxOpen = false;
  chatOwnerData: any;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.getRecivedMessages().subscribe(resData => {
      this.recivedMessages = resData;
    });

    this.messageService.getContactList().subscribe(resData => {
      this.contactList = resData;
    });

  }

  sendMessage(input: string) {
    const message = {name: this.chatOwnerData.name, message: input};
    this.messageService.setMessage(message);
  }

  search() {
    if(this.pattern == "") {
      this.ngOnInit();
    } else {
      this.recivedMessages = this.recivedMessages.filter(
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
