import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date = null;
  openDatePicker = false;
  loading = false;
  data = [
    {
      id: 1,
      title: 'Hidroginástica',
      done: true,
      hour: '14:00',
      category: {
        name: 'Exercício',
        color: 'green'
      },
      responsible: {
        name: 'Daniel',
        avatar: 'http://rumconnection.com/wp-content/bpds_custom/914-Picture_153.png'
      }
    },
    {
      id: 2,
      title: 'Banho',
      done: true,
      hour: '15:10',
      category: {
        name: 'Higiene',
        color: 'magenta'
      },
      responsible: {
        name: 'Daniel',
        avatar: 'http://rumconnection.com/wp-content/bpds_custom/914-Picture_153.png'
      }
    },
    {
      id: 3,
      title: 'Lanche',
      done: true,
      hour: '15:30',
      category: {
        name: 'Refeição',
        color: 'gold'
      },
      responsible: {
        name: 'Maria',
        avatar: 'https://www.msudenver.edu/media/content/marketingandcommunications/images/Nguyen,-Mai-Linh_7944_160330-8x5.5cc.jpg'
      }
    },
    {
      id: 4,
      title: 'Dormir',
      done: true,
      hour: '16:00',
      category: {
        name: 'Repouso',
        color: 'geekblue'
      },
      responsible: {
        name: 'Maria',
        avatar: 'https://www.msudenver.edu/media/content/marketingandcommunications/images/Nguyen,-Mai-Linh_7944_160330-8x5.5cc.jpg'
      }
    },
    {
      id: 5,
      title: 'Televisão',
      done: false,
      hour: '18:00',
      category: {
        name: 'Lazer',
        color: 'purple'
      },
      responsible: {
        name: 'Joana',
        avatar: 'https://cf.dropboxstatic.com/static/images/jobs/jobs_2015/profile-people-ops-liz-vflEQeQ3b.jpg'
      }
    },
    {
      id: 6,
      title: 'Jantar',
      done: true,
      hour: '20:00',
      category: {
        name: 'Refeição',
        color: 'gold'
      },
      responsible: {
        name: 'Joana',
        avatar: 'https://cf.dropboxstatic.com/static/images/jobs/jobs_2015/profile-people-ops-liz-vflEQeQ3b.jpg'
      }
    },
    {
      id: 7,
      title: 'Dormir',
      done: false,
      hour: '21:00',
      category: {
        name: 'Repouso',
        color: 'geekblue'
      },
      responsible: {
        name: 'Daniel',
        avatar: 'http://rumconnection.com/wp-content/bpds_custom/914-Picture_153.png'
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onChangeDate(result: Date): void {
    console.log('onChange: ', result);
  }

  toggleDatePicker() {
    this.openDatePicker = !this.openDatePicker;
  }

}
