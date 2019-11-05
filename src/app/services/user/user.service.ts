import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/app/models/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser:User;

  constructor(private angularFireDatabase:AngularFireDatabase) {
    const user = JSON.parse(localStorage.getItem("tccJayneUser"));
    if(user != null) {
      let obj = new User(
        user.id,
        user.photo,
        user.firstName,
        user.lastName, 
        user.email,
        "secretPassword",
        []
      )
      this.currentUser = obj;
    }
  }

  getUserInfo = (userId) => {
    return this.angularFireDatabase.object(`users/${userId}`).valueChanges();
  }

  addNetwork = (network) => {
    return this.angularFireDatabase.database.ref(`users/${this.currentUser.getId()}/myNetworks`).push(network);
  }

  removeNetwork = (userId, networkId) => {
    return this.angularFireDatabase.database.ref(`users/${userId}/myNetworks/`).orderByChild('id').equalTo(networkId).once('value', (snapshot) => {
      const key = Object.keys(snapshot.val())[0];
      this.angularFireDatabase.database.ref(`users/${userId}/myNetworks/${key}`).remove();
    });
  }
}
