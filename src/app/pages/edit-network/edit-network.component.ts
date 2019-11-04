import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/network/network.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-network',
  templateUrl: './edit-network.component.html',
  styleUrls: ['./edit-network.component.scss']
})
export class EditNetworkComponent implements OnInit {

  loadingMembers = true;
  listOfMembers = [];
  currentUser = null;
  admId:string;

  avatarUrl: string;
  name: string;
  dateOfBirth: string;
  genre: string;
  bloodType: string;
  specialNeeds: Array<string>;
  interests: Array<string>;

  membersId: Array<string>;

  dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  validateForm: FormGroup;

  listOfBloodType = [
    {
      label: 'A+',
      value: 'A+'
    },
    {
      label: 'A-',
      value: 'A-'
    },
    {
      label: 'B+',
      value: 'B+'
    },
    {
      label: 'B-',
      value: 'B-'
    },
    {
      label: 'AB+',
      value: 'AB+'
    },
    {
      label: 'AB-',
      value: 'AB-'
    },
    {
      label: 'O+',
      value: 'O+'
    },
    {
      label: 'O-',
      value: 'O-'
    },
  ];

  listOfSpecialNeeds = [
    {
      label: 'Autismo',
      value: 'Autismo'
    },
    {
      label: 'Hipertensão',
      value: 'Hipertensão'
    },
    {
      label: 'Baixa visão',
      value: 'Baixa visão'
    },
    {
      label: 'Cegueira',
      value: 'Cegueira'
    },
    {
      label: 'Doença Crônica',
      value: 'Doença Crônica'
    },
    {
      label: 'Baixa audição',
      value: 'Baixa audição'
    },
    {
      label: 'Surdez',
      value: 'Surdez'
    },
    {
      label: 'Deficiência Intelectual',
      value: 'Deficiência Intelectual'
    },
    {
      label: 'Deficiência de Aprendizado',
      value: 'Deficiência de Aprendizado'
    },
    {
      label: 'Perda de Memória',
      value: 'Perda de Memória'
    },
    {
      label: 'Doença Mental',
      value: 'Doença Mental'
    },
    {
      label: 'Deficiência física',
      value: 'Deficiência física'
    },
    {
      label: 'Distúrbio de fala e linguagem',
      value: 'Distúrbio de fala e linguagem'
    }
  ];

  listOfInterests = [
    {
      label: 'Atividades física',
      items: [
        {
          label: 'Corrida',
          value: 'Corrida'
        },
        {
          label: 'Caminhada',
          value: 'Caminhada'
        },
        {
          label: 'Musculação',
          value: 'Musculação'
        },
        {
          label: 'Esportes',
          value: 'Esportes'
        },
        {
          label: 'Pilates',
          value: 'Pilates'
        },
        {
          label: 'Yoga',
          value: 'Yoga'
        },
      ]
    },
    {
      label: 'Música',
      items: [
        {
          label: 'Axé',
          value: 'Axé'
        },
        {
          label: 'Blues',
          value: 'Blues'
        },
        {
          label: 'Eletrônica',
          value: 'Música Eletrônica'
        },
        {
          label: 'Forró',
          value: 'Forró'
        },
        {
          label: 'Funk',
          value: 'Funk'
        },
        {
          label: 'Gospel',
          value: 'Gospel'
        },
        {
          label: 'Hip Hop',
          value: 'Hip Hop'
        },
        {
          label: 'Jazz',
          value: 'Jazz'
        },
        {
          label: 'MPB',
          value: 'MPB'
        },
        {
          label: 'Música clássica',
          value: 'Música clássica'
        },
        {
          label: 'Pagode',
          value: 'Pagode'
        },
        {
          label: 'Pop',
          value: 'Pop'
        },
        {
          label: 'Rap',
          value: 'Rap'
        },
        {
          label: 'Reggae',
          value: 'Reggae'
        },
        {
          label: 'Rock',
          value: 'Rock'
        },
        {
          label: 'Samba',
          value: 'Samba'
        },
        {
          label: 'Sertanejo',
          value: 'Música Sertaneja'
        },
      ]
    },
    {
      label: 'Leitura',
      items: [
        {
          label: 'Poesia',
          value: 'Poesias'
        },
        {
          label: 'Romance',
          value: 'Livros de Romance'
        },
        {
          label: 'Fábula',
          value: 'Fábulas'
        },
        {
          label: 'Conto',
          value: 'Contos'
        },
        {
          label: 'Crônica',
          value: 'Crônicas'
        },
        {
          label: 'Ficção Científica',
          value: 'Livros de Ficção Científica'
        },
        {
          label: 'Suspense',
          value: 'Livros de Suspense'
        }
      ]
    },
    {
      label: 'Assistir',
      items: [
        {
          label: 'Ação',
          value: 'Filmes/Seriados de Ação'
        },
        {
          label: 'Aventura',
          value: 'Filmes/Seriados de  Aventura'
        },
        {
          label: 'Comédia',
          value: 'Filmes/Seriados de Comédia'
        },
        {
          label: 'Documentário',
          value: 'Documentários'
        },
        {
          label: 'Drama',
          value: 'Filmes/Seriados de Drama'
        },
        {
          label: 'Ficção científica',
          value: 'Filmes/Seriados de Ficção científica'
        },
        {
          label: 'Musical',
          value: 'Musicais'
        },
        {
          label: 'Romance',
          value: 'Filmes/Seriados de Romance'
        },
        {
          label: 'Suspense',
          value: 'Filmes/Seriados de Suspense'
        },
        {
          label: 'Terror',
          value: 'Filmes/Seriados de Terror'
        }
      ]
    },
  ];

  constructor(private router: Router, private activatedRoute:ActivatedRoute, private networkService:NetworkService, private userService: UserService, private fb: FormBuilder, private ngZone: NgZone) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('tccJayneUser'));
    this.getNetwork();

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      genre: [null, [Validators.required]],
      bloodType: [null, [Validators.required]],
      specialNeeds: [null, null],
      interests: [null, [Validators.required]]
    });
  }

  onBack() {
    this.router.navigate(['/network', this.activatedRoute.snapshot.params.id]);
  }

  getNetwork = () => {
    const networkId = this.activatedRoute.snapshot.params.id;
    const network = this.networkService.getNetwork(networkId);
    let snapshot = null;
    network.subscribe(
      data => {
        snapshot = data;
        this.admId = snapshot.admId;
        this.avatarUrl = snapshot.avatar;
        this.name = snapshot.name;
        this.dateOfBirth = snapshot.dateOfBirth;
        this.genre = snapshot.genre;
        this.bloodType = snapshot.bloodType;
        this.specialNeeds = snapshot.specialNeeds;
        this.interests = snapshot.interests;
        this.membersId = Object.values(snapshot.membersId);
      },
      error => error
    );
    this.getMembers();
  }

  getMembers() {
    this.networkService.getNetworkMembers(this.activatedRoute.snapshot.params.id)
    .on('value', snapshot => {
      if(snapshot.val() != null && snapshot.val() != undefined) {
        Object.entries(snapshot.val().membersId).map(member => this.userService.getUserInfo(member[1]).subscribe(
          data => {
            this.ngZone.run(() => {
              this.listOfMembers.push(data);
              if(this.listOfMembers.length === Object.keys(snapshot.val().membersId).length) {
                this.loadingMembers = false;
              }
            });
          },
          error => error
        ));
      }
    });
  }

  changeProfilePic(event){
    let profilePic = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener("loadend", () => {
      this.avatarUrl = String(reader.result);
    }, false);
    reader.readAsDataURL(profilePic);
  }

  removeMember(index) {
    this.membersId.splice(index, 1);
    this.listOfMembers.splice(index, 1);
  }

  onEditNetwork():void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if(this.validateForm.valid) {
      this.networkService.updateNetwork(
        this.activatedRoute.snapshot.params.id,
        this.avatarUrl,
        this.name,
        this.dateOfBirth, this.genre, this.bloodType, this.specialNeeds, this.interests, this.membersId);
    }
  }

}
