import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/app/models/user'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user:User;
  currentUser = null;

  constructor(private angularFireDatabase:AngularFireDatabase, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("tccJayneUser"));
    // if(this.currentUser != null) {
    //   let obj = new User(
    //     user.id,
    //     user.photo,
    //     user.firstName,
    //     user.lastName, 
    //     user.email,
    //     "secretPassword",
    //     []
    //   )
    //   this.user = obj;
    // }
  }

  getUserInfo = (userId) => {
    return this.angularFireDatabase.object(`users/${userId}`).valueChanges();
  }

  addNetwork = (network) => {
    return this.angularFireDatabase.database.ref(`users/${this.currentUser.id}/myNetworks`).push(network);
  }

  removeNetwork = (userId, networkId) => {
    return this.angularFireDatabase.database.ref(`users/${userId}/myNetworks/`).orderByChild('id').equalTo(networkId).once('value', (snapshot) => {
      const key = Object.keys(snapshot.val())[0];
      this.angularFireDatabase.database.ref(`users/${userId}/myNetworks/${key}`).remove();
    });
  }

  changeUserLocalData = () => {
    this.angularFireDatabase.database.ref(`users/${this.currentUser.id}`).once('value')
    .then(snapshot => {
      localStorage.setItem("tccJayneUser", JSON.stringify(snapshot.val()));
      this.currentUser = JSON.parse(localStorage.getItem("tccJayneUser"));
    }).catch(error => error);
  }

  updateUser = (photo, firstName, lastName) => {
    if(photo !== this.currentUser.photo) {
      this.angularFireDatabase.database.ref(`users/${this.currentUser.id}`).update({photo: photo});
    }
    if(firstName !== this.currentUser.firstName) {
      this.angularFireDatabase.database.ref(`users/${this.currentUser.id}`).update({firstName: firstName});
    }
    if(lastName !== this.currentUser.lastName) {
      this.angularFireDatabase.database.ref(`users/${this.currentUser.id}`).update({lastName: lastName});
    }
    this.changeUserLocalData();
    this.router.navigate(['/home', 'profile']);
  }
}
