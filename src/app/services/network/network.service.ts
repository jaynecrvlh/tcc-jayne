import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Network } from 'src/app/models/network';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  network: Network;
  currentNetwork = null;

  constructor(private angularFireDatabase:AngularFireDatabase, private userService:UserService, private router:Router, private message:NzMessageService) {
    this.network = new Network('id', '', '', '', '', '', [], [], '', [], []);
    this.currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
  }

  registerNetwork = () => {
    const id = this.angularFireDatabase.database.ref().push().key;
    const admId = this.userService.currentUser.getId();
    this.network.setId(id);
    this.network.setAdmId(admId);
    this.network.setMembersId([admId]);
    this.router.navigate(['home', 'profile']);
    this.userService.addNetwork({id: this.network.getId(), avatar: this.network.getAvatar(), name: this.network.getName()});
    this.message.success('Rede criada com sucesso!');
    localStorage.setItem("tccJayneNetwork", JSON.stringify(this.network));
    return this.angularFireDatabase.database.ref("networks").child(id).set(this.network);
  }

  getNetwork = (networkId) => {
    return this.angularFireDatabase.object(`networks/${networkId}`).valueChanges();
  }

  getUserNetworks = (userId) => {
    return this.angularFireDatabase.database.ref(`users/${userId}/myNetworks`);
  }

  signNetwork = async (userId, networkId) => {
    let networkName = "";
    let networkAvatar = "";
    await this.angularFireDatabase.database.ref(`networks/${networkId}`).once('value')
    .then(snapshot => {
      networkName = snapshot.val().name;
      networkAvatar = snapshot.val().avatar;
      this.changeNetwork(networkId);
    }).catch(error => error);
    await this.userService.addNetwork({id: networkId, avatar: networkAvatar, name: networkName});
    return this.angularFireDatabase.database.ref("networks").child(networkId).child("membersId").push(userId);
  }

  changeNetwork = (networkId) => {
    this.angularFireDatabase.database.ref(`networks/${networkId}`).once('value')
    .then(snapshot => {
      localStorage.setItem("tccJayneNetwork", JSON.stringify(snapshot.val()));
      this.currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    }).catch(error => error);
  }

  getCurrentNetworkMembers = () => {
    let currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    return this.angularFireDatabase.database.ref(`networks/${currentNetwork.id}`);
  }

  getNetworkMembers = (networkId) => {
    return this.angularFireDatabase.database.ref(`networks/${networkId}`);
  }

  updateNetwork = (networkId, avatarUrl, name, dateOfBirth, genre, bloodType, specialNeeds, interests, membersId) => {
    this.changeNetwork(networkId);
    if(avatarUrl !== this.currentNetwork.avatar) {
      this.angularFireDatabase.database.ref(`networks/${networkId}`).update({avatar: avatarUrl});
    }
    if(name !== this.currentNetwork.name) {
      this.angularFireDatabase.database.ref(`networks/${networkId}`).update({name: name});
    }
    if(dateOfBirth !== this.currentNetwork.dateOfBirth) {
      this.angularFireDatabase.database.ref(`networks/${networkId}`).update({dateOfBirth: dateOfBirth});
    }
    if(genre !== this.currentNetwork.genre) {
      this.angularFireDatabase.database.ref(`networks/${networkId}`).update({genre: genre});
    }
    if(bloodType !== this.currentNetwork.bloodType) {
      this.angularFireDatabase.database.ref(`networks/${networkId}`).update({bloodType: bloodType});
    }
    if(specialNeeds !== this.currentNetwork.specialNeeds) {
      this.angularFireDatabase.database.ref(`networks/${networkId}`).update({specialNeeds: specialNeeds});
    }
    if(interests !== this.currentNetwork.interests) {
      this.angularFireDatabase.database.ref(`networks/${networkId}`).update({interests: interests});
    }

    let currentMembersId = Object.values(this.currentNetwork.membersId);
    if(membersId.length !== currentMembersId.length) {
      console.log("Lista diferente");
      this.angularFireDatabase.database.ref(`networks/${networkId}`).update({membersId: membersId});

      for(let i=0; i < currentMembersId.length; i++) {
        console.log(currentMembersId[i]);
        if(!membersId.includes(currentMembersId[i])) {
          console.log("Não inclui na lista");
          this.userService.removeNetwork(currentMembersId[i], networkId);
        }
      }
    }
    this.changeNetwork(networkId);
    this.router.navigate(['/network', networkId]);
  }
}
