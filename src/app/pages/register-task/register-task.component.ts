import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetworkService } from 'src/app/services/network/network.service';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register-task',
  templateUrl: './register-task.component.html',
  styleUrls: ['./register-task.component.scss']
})
export class RegisterTaskComponent implements OnInit {

  category:string;
  name:string;
  date:string;
  time:string;
  description:string;
  responsible:{
    id:string,
    firstName:string,
    lastName:string,
    photo:string
  };

  listOfCategories = [
    {
      label: 'Medicações',
      value: 'Medicações'
    },
    {
      label: 'Compromissos',
      value: 'Compromissos'
    },
    {
      label: 'Lazer/recreativas',
      value: 'Lazer/recreativas'
    },
    {
      label: 'Atividades físicas',
      value: 'Atividades físicas'
    },
    {
      label: 'Rotina',
      value: 'Rotina'
    },
    {
      label: 'Refeições',
      value: 'Refeições'
    }
  ];

  appointmentsTasks = [
    {
      label: 'Consultas médicas',
      value: 'Consultas médicas'
    },
    {
      label: 'Exames',
      value: 'Exames'
    },
    {
      label: 'Compras',
      value: 'Compras'
    },
    {
      label: 'Banco',
      value: 'Banco'
    },
    {
      label: 'Outro',
      value: 'Outro'
    },
  ];

  recreationTasks = [
    {
      label: 'Passeio',
      value: 'Passeio'
    },
    {
      label: 'Cinema',
      value: 'Cinema'
    },
    {
      label: 'Teatro',
      value: 'Teatro'
    },
    {
      label: 'Show',
      value: 'Show'
    },
    {
      label: 'Livro',
      value: 'Livro'
    },
    {
      label: 'Computador',
      value: 'Computador'
    },
    {
      label: 'Jogos',
      value: 'Jogos'
    },
    {
      label: 'Televisão',
      value: 'Televisão'
    },
  ];

  physicalActivitiesTasks = [
    {
      label: 'Fisioterapia',
      value: 'Fisioterapia'
    },
    {
      label: 'Caminhada',
      value: 'Caminhada'
    },
    {
      label: 'Hidroginástica',
      value: 'Hidroginástica'
    },
    {
      label: 'Massagem',
      value: 'Massagem'
    },
    {
      label: 'Pilates',
      value: 'Pilates'
    },
    {
      label: 'Yoga',
      value: 'Yoga'
    },
    {
      label: 'Outro',
      value: 'Outro'
    },
  ];

  routineTasks = [
    {
      label: 'Banho',
      value: 'Banho'
    },
    {
      label: 'Acordar',
      value: 'Acordar'
    },
    {
      label: 'Dormir',
      value: 'Dormir'
    }
  ];

  mealsTasks = [
    {
      label: 'Café da manhã',
      value: 'Café da manhã'
    },
    {
      label: 'Lanche',
      value: 'Lanche'
    },
    {
      label: 'Almoço',
      value: 'Almoço'
    },
    {
      label: 'Jantar',
      value: 'Jantar'
    },
  ];

  listOfMembers = [];

  validateForm: FormGroup;

  onRegisterTask(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if(this.validateForm.valid) {
      const id = this.date + this.time;
      this.taskService.task.setId(id.replace(/[^\w\s]/gi, ''));
      this.taskService.task.setCategory(this.category);
      this.taskService.task.setName(this.name);
      this.taskService.task.setDate(this.date);
      this.taskService.task.setTime(this.time);
      this.taskService.task.setDescription(this.description);
      this.taskService.task.setResponsible(this.responsible);
      this.taskService.registerTask();
    }
  }

  constructor(private router: Router, private fb: FormBuilder, private networkService: NetworkService, private taskService: TaskService, private userService: UserService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      category: [null, [Validators.required]],
      name: [null, [Validators.required]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      description: [null, [Validators.required]],
      responsible: [null, [Validators.required]]
    });

    this.getMembers();
  }

  onBack() {
    this.router.navigate(['/home', 'routine']);
  }

  getMembers() {
    this.networkService.getCurrentNetworkMembers()
    .on('value', snapshot => {
      if(snapshot.val() != null && snapshot.val() != undefined) {
        Object.entries(snapshot.val().membersId).map(member => this.userService.getUserInfo(member[1]).subscribe(
          data => this.listOfMembers.push(data),
          error => error
        ));
      }
    });
  }

}
