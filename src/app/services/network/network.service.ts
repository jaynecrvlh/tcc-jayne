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

  constructor(private angularFireDatabase:AngularFireDatabase, private userService:UserService, private router:Router, private message:NzMessageService) {
    this.network = new Network('id', '', '', '', '', '', [], [], '', [], []);
  }

  registerNetwork = () => {
    const id = this.angularFireDatabase.database.ref().push().key;
    const admId = this.userService.currentUser.getId();
    this.network.setId(id);
    this.network.setAdmId(admId);
    this.network.setMembersId([admId]);
    this.router.navigate(['home']);
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
    }).catch(error => error);
  }

  getCurrentNetworkMembers = () => {
    let currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    return this.angularFireDatabase.database.ref(`networks/${currentNetwork.id}`);
  }
}
