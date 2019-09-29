import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkService } from '../../services/network/network.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-register-network',
  templateUrl: './register-network.component.html',
  styleUrls: ['./register-network.component.scss']
})
export class RegisterNetworkComponent implements OnInit {

  loadingPhoto = false;
  avatarUrl: string;
  name: string;
  dateOfBirth: string;
  genre: string;
  bloodType: string;
  specialNeeds: Array<string>;
  interests: Array<string>;

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
      label: 'Perda de Visão e Cegueira',
      value: 'Perda de Visão e Cegueira'
    },
    {
      label: 'Doença Crônica',
      value: 'Doença Crônica'
    },
    {
      label: 'Perda Auditiva e Surdez',
      value: 'Perda Auditiva e Surdez'
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
          label: 'Esportes aquáticos',
          value: 'Esportes aquáticos'
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

  onRegisterNetwork(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.networkService.network.setAvatar(this.avatarUrl);
    this.networkService.network.setName(this.name);
    this.networkService.network.setDateOfBirth(this.dateOfBirth);
    this.networkService.network.setGenre(this.genre);
    this.networkService.network.setBloodType(this.bloodType);
    this.networkService.network.setSpecialNeeds(this.specialNeeds);
    this.networkService.network.setInterests(this.interests);
    this.networkService.registerNetwork();
  }

  constructor(private router: Router, private fb: FormBuilder, private networkService: NetworkService, private msg: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      genre: [null, [Validators.required]],
      bloodType: [null, [Validators.required]],
      specialNeeds: [null, [Validators.required]],
      interests: [null, [Validators.required]]
    });
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loadingPhoto = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loadingPhoto = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loadingPhoto = false;
        break;
    }
  }

  teste(){
    console.log(this.dateOfBirth);
  }
}
