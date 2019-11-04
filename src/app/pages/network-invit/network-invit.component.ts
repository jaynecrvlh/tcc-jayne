import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network/network.service';

@Component({
  selector: 'app-network-invit',
  templateUrl: './network-invit.component.html',
  styleUrls: ['./network-invit.component.scss']
})
export class NetworkInvitComponent implements OnInit {

  network:Network;
  currentUser = null;

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private networkService:NetworkService) { }

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
        )
      },
      error => error
    )
  }

  signInNetwork = () => {
    this.networkService.signNetwork(this.currentUser.id, this.network.getId())
    .then(() => {
      this.router.navigate(['home', 'profile']);
    }).catch(error => error)
  }

}
