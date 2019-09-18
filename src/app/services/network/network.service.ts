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
    this.network = new Network('id', '', '', '', '', '', [], [], '', []);
  }

  registerNetwork = () => {
    this.message.success('Rede criada com sucesso!');
    const id = this.angularFireDatabase.database.ref().push().key;
    const admId = this.userService.currentUser.getId();
    this.network.setId(id);
    this.network.setAdmId(admId);
    this.network.setMembersId([admId]);
    this.router.navigate(['home']);
    this.userService.addNetwork({id: this.network.getId(), avatar: this.network.getAvatar(), name: this.network.getName(), qtdMembers: this.network.getMembersId().length});
    return this.angularFireDatabase.database.ref("networks").child(id).set(this.network);
  }

  getUserNetworks = (userId) => {
    return this.angularFireDatabase.database.ref(`users/${userId}/myNetworks`);
  }

  signNetwork = async (userId, networkId) => {
    let networkName = "";
    let networkMembers = 0;
    await this.angularFireDatabase.database.ref(`networks/${networkId}`).once('value')
    .then(snapshot => {
      networkName = snapshot.val().name;
      networkMembers = snapshot.val().membersId.length;
    }).catch(error => error);
    await this.userService.addNetwork({id: networkId, name: networkName, qtdMembers: networkMembers});
    return this.angularFireDatabase.database.ref("networks").child(networkId).child("membersId").push(userId);
  }

  getUserNetworksMembers = (userId) => {
    return this.angularFireDatabase.database.ref("networks").orderByChild("admId").equalTo(userId);
  }
}
