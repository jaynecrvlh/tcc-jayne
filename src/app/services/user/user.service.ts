import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/app/models/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser:User;

  constructor(private angularFireDatabase:AngularFireDatabase) {
    const user = JSON.parse(localStorage.getItem("conviverUser"));
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
    console.log("addNetwork");
    return this.angularFireDatabase.database.ref(`users/${this.currentUser.getId()}/myNetworks`).push(network);
  }
}
