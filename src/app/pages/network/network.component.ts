import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network/network.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  network:Network;
  loadingMembers = true;
  listOfMembers = [];

  currentUser = null;

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private networkService:NetworkService, private userService: UserService, private ngZone: NgZone) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('tccJayneUser'));
    if(this.currentUser == null) {
      this.router.navigate(['']);
      return;
    }

    this.getNetwork();
  }

  onBack() {
    this.router.navigate(['/home', 'profile']);
  }

  getNetwork = () => {
    const networkId = this.activatedRoute.snapshot.params.id;
    const network = this.networkService.getNetwork(networkId);
    let snapshot = null;
    network.subscribe(
      data => {
        snapshot = data;
        this.network = new Network(
          snapshot.id,
          snapshot.avatar,
          snapshot.name,
          snapshot.dateOfBirth,
          snapshot.genre,
          snapshot.bloodType,
          snapshot.specialNeeds,
          snapshot.interests,
          snapshot.admId,
          snapshot.membersId,
          []
        );
        this.getMembers();

        let signIn = true;
        for (let i = 0; i < this.network.getMembersId().length; i++) {
          if(this.network.getMembersId()[i] == this.currentUser.id) {
            signIn = false;
            console.log("Já é membro!");
          }
        }

        if(signIn) {
          console.log("Não é membro... adicionando a rede");
          this.networkService.signNetwork(this.currentUser.id, this.network.getId())
          .then(() => {
            this.router.navigate(['networks', this.network.getId()]);
          }).catch(error => error);
        }
      },
      error => console.log(error)
    );
  }

  getMembers() {
    this.networkService.getNetworkMembers(this.network.getId())
    .on('value', snapshot => {
      if(snapshot.val() != null && snapshot.val() != undefined) {
        Object.entries(snapshot.val().membersId).map(member => this.userService.getUserInfo(member[1]).subscribe(
          data => this.listOfMembers.push(data),
          error => error
        ));
        this.loadingMembers = false;
      }
    });
  }

  shareNetwork() {
    let nav:any;
    nav = window.navigator;
    if(nav && nav.share) {
      nav.share({
        title: 'Agenda de cuidados',
        text: `Entre na rede de cuidados ${this.network.getName()}`,
        url: `https://tcc-jayne.firebaseapp.com/network/${this.network.getId()}`,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    }
    else {
      let copyText = document.getElementById("networkCode") as HTMLInputElement;
      copyText.select();
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy");
      alert("Código da rede copiado para a área de transferência!");
    }
  }
}
