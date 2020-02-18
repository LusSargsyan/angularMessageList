import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '../../models/message.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  getSentMessages(): Observable<any> {
    return this.db.list('sentMessages').valueChanges();
  }

  getContactList(): Observable<any> {
    return this.db.list('contactList').valueChanges();
  }

  setMessage(data: any) {
    let newPostKey = this.db.database.ref().child('senrMessages').push().key;
    data.key = newPostKey;
    this.db.database.ref('sentMessages/' + newPostKey).set(data);
  }

  getRecivedMessages(): Observable<any> {
    return this.db.list('recivedMessages').valueChanges();
  }

  

}
