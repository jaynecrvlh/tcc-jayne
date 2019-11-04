import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { NetworkService } from '../../services/network/network.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  date = null;
  openDatePicker = false;
  datePickerCalled = false;
  loadingNetworks = true;
  myNetworks = [];
  tasks = [];
  codeModal = false;
  networkCode:string;
  tabSelected = null;

  currentUser = null;

  months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ];

  day: string;
  month: string;
  year: string;
  dayOfTheWeek: string;

  constructor(private authService: AuthService, private userService: UserService, private networkService: NetworkService, private taskService: TaskService, private router: Router, private activatedRoute:ActivatedRoute, private ngZone: NgZone) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('tccJayneUser'));
    
    if(this.currentUser == null) {
      this.router.navigate(['']);
      return;
    }

    if(this.activatedRoute.snapshot.params.tab === 'routine') {
      this.tabSelected = 0;
    }
    else {
      this.tabSelected = 1;
    }

    this.user = new User(
      this.currentUser.id,
      this.currentUser.photo,
      this.currentUser.firstName,
      this.currentUser.lastName,
      this.currentUser.email,
      this.currentUser.password,
      []
    );
    this.userService.currentUser = this.user;
    this.networkService.getUserNetworks(this.user.getId())
    .on("value", snapshot => {
      if(snapshot.val() !== undefined && snapshot.val() !== null) {
        this.ngZone.run(() => {
          const networks = Object.entries(snapshot.val()).map(e => Object.assign(e[1], { key: e[0] }));
          this.myNetworks = networks;
          this.networkService.changeNetwork(this.myNetworks[0].id);
          this.loadingNetworks = false;
        });
      }
      else {
        this.loadingNetworks = false;
      }
    });

    let today = new Date();
    this.day = String(today.getDate()).padStart(2, '0');
    this.month = this.transformMonth(today.getMonth());
    this.year = String(today.getFullYear());
    this.dayOfTheWeek = this.transformDayOfTheWeek(today.getDay());
    if(this.networkService.currentNetwork !== null) {
      this.getTasks(today, this.networkService.currentNetwork.id);
    }
  }

  getTasks(result: Date, networkId): void {
    this.fixDate(result.toString());
    let monthPath;
    if(this.months.indexOf(this.month) + 1 < 10) {
      monthPath = '0' + (this.months.indexOf(this.month) + 1);
    }
    else {
      monthPath = this.months.indexOf(this.month) + 1;
    }
    this.taskService.getTasksByDay(this.day + monthPath + this.year, networkId)
    .on("value", snapshot => {
      if(snapshot.val() !== undefined && snapshot.val() !== null) {
        this.ngZone.run(() => {
          const tasks = Object.entries(snapshot.val()).map(e => Object.assign(e[1], { key: e[0] }));
          this.tasks = tasks;
        });
      }
      else {
        this.ngZone.run(() => {
          this.tasks = [];
        });
      }
    });
    this.openDatePicker = false;
  }

  fixDate(date:string) {
    this.dayOfTheWeek = this.transformDayOfTheWeek(date.substring(3, 0));
    this.month = this.transformMonth(date.substring(4, 7));
    this.day = date.substring(8, 10);
    this.year = date.substring(11, 15);
  }

  transformMonth(month) {
    let index;
    if(typeof(month) == "string") {
      switch (month) {
        case 'Jan':
          index = 0;
          break;
        case 'Feb':
          index = 1;
          break;
        case 'Mar':
          index = 2;
          break;
        case 'Apr':
          index = 3;
          break;
        case 'May':
          index = 4;
          break;
        case 'Jun':
          index = 5;
          break;
        case 'Jul':
          index = 6;
          break;
        case 'Aug':
          index = 7;
          break;
        case 'Sep':
          index = 8;
          break;
        case 'Oct':
          index = 9;
          break;
        case 'Nov':
          index = 10;
          break;
        case 'Dec':
          index = 11;
          break;
      }
    }
    else {
      index = month;
    }
    return this.months[index];
  }

  transformDayOfTheWeek(dayOfTheWeek) {
    let index;
    let daysOfTheWeek = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado'
    ];
    if(typeof(dayOfTheWeek) == "string") {
      switch (dayOfTheWeek) {
        case 'Sun':
          index = 0;
          break;
        case 'Mon':
          index = 1;
          break;
        case 'Tue':
          index = 2;
          break;
        case 'Wed':
          index = 3;
          break;
        case 'Thu':
          index = 4;
          break;
        case 'Fri':
          index = 5;
          break;
        case 'Sat':
          index = 6;
          break;
      }
    }
    else {
      index = dayOfTheWeek;
    }
    return daysOfTheWeek[index];
  }

  toggleDatePicker() {
    this.openDatePicker = !this.openDatePicker;
  }

  closeDatePicker() {
    this.openDatePicker = false;
  }

  showCodeModal(): void {
    this.codeModal = true;
  }

  handleOk(): void {
    this.networkService.signNetwork(this.user.getId(), this.networkCode)
    .then(() => {
      this.router.navigate(['home', 'profile']);
    }).catch(error => error);
    this.codeModal = false;
  }

  handleCancel(): void {
    this.codeModal = false;
  }

  onLogout() {
    this.authService.logoff();
  }

  switchNetwork (networkId) {
    this.networkService.changeNetwork(networkId);
    let today = new Date();
    this.getTasks(today, networkId);
  }
}
