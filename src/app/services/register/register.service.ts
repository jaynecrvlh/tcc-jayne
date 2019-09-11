import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/models/user';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  user: User;

  constructor(private http:HttpClient, private angularFireDatabase:AngularFireDatabase, private angularFireAuth:AngularFireAuth, private authService:AuthService, private router:Router, private message:NzMessageService) {
    this.user = new User('id', '', '', '', '');
  }

  registerUser = () => {
    const email = this.user.getEmail();
    const password = this.user.getPassword();
    const register = this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    register.then(value => {
      this.registerUserData(value.user.uid, password);
    })
    .catch(error => this.message.error("Erro ao cadastrar usuário!"));
  }

  registerUserData = (id, password) => {
    const user = {
      id: id,
      firstName: this.user.getFirstName(),
      lastName: this.user.getLastName(),
      email: this.user.getEmail()
    }
    const registerData = this.angularFireDatabase.database.ref("users").child(id).set(user);
    registerData.then(() => {
      this.message.success("Usuário cadastrado com sucesso!");
      this.authService.getCurrentUser(id, 'home');
      localStorage.setItem('tccJayneUser', JSON.stringify(user));
    }).catch(error => {
      this.message.error("Erro ao cadastrar usuário!");
      this.removeUserFromAuthentication(user.email, password);
    });
  }

  registerEmail = (email) => {
    const id = this.angularFireDatabase.database.ref().push().key;
    return this.angularFireDatabase.database.ref("emails").child(id).set(email);
  }

  removeUserFromAuthentication = (email, password) => {
    const remove = this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    remove.then( () => {
      let user = this.angularFireAuth.auth.currentUser;
      user.delete();
    }).catch(error => {
      this.removeUserFromAuthentication(email, password);
    })
  }
}
