import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network/network.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  network:Network;

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private networkService:NetworkService) { }

  ngOnInit() {
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
      error => console.log(error)
    )
  }

}
