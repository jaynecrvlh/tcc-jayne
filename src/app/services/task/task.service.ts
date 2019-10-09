import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Task } from 'src/app/models/task';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { NetworkService } from '../network/network.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  task:Task;

  constructor(private angularFireDatabase:AngularFireDatabase, private router:Router, private message:NzMessageService, private networkService: NetworkService) {
    this.task = new Task("", "", "", "", "", "", {id:"", firstName:"", lastName:"", photo:""}, false, []);
  }

  registerTask = () => {
    let currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    let path = this.task.getDate().replace(/[^\w\s]/gi, '') + '/' + this.task.getTime().replace(/[^\w\s]/gi, '');
    this.router.navigate(['home', 'routine']);
    this.message.success('Tarefa criada com sucesso!');
    this.angularFireDatabase.database.ref(`networks/${currentNetwork.id}/tasks`).child(path).set(this.task);
    this.networkService.changeNetwork(currentNetwork.id);
  }

  getTasksByDay = (day) => {
    let currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    return this.angularFireDatabase.database.ref(`networks/${currentNetwork.id}/tasks/${day}`);
  }

  getTaskById = (taskId:string) => {
    let currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    let day = taskId.substring(8, 0);
    let time = taskId.substring(8, 12);
    return this.angularFireDatabase.object(`networks/${currentNetwork.id}/tasks/${day}/${time}`).valueChanges();
  }

  toggleTaskAsDone = (taskId:string, done:boolean) => {
    let currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    let day = taskId.substring(8, 0);
    let time = taskId.substring(8, 12);
    return this.angularFireDatabase.database.ref(`networks/${currentNetwork.id}/tasks/${day}/${time}`).child('done').set(done);
  }

  addComment = (taskId:string, comment) => {
    const id = this.angularFireDatabase.database.ref().push().key;
    let currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    let day = taskId.substring(8, 0);
    let time = taskId.substring(8, 12);
    return this.angularFireDatabase.database.ref(`networks/${currentNetwork.id}/tasks/${day}/${time}/comments`).child(id).set(comment);
  }

  getComments = (taskId:string) => {
    let currentNetwork = JSON.parse(localStorage.getItem("tccJayneNetwork"));
    let day = taskId.substring(8, 0);
    let time = taskId.substring(8, 12);
    return this.angularFireDatabase.list(`networks/${currentNetwork.id}/tasks/${day}/${time}/comments`).valueChanges();
  }
}
