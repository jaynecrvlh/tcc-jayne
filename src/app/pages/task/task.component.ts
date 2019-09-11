import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distanceInWords } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private router: Router, private modalService: NzModalService) { }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  title: string = "Hidroginástica";
  data: any[] = [];

  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: distanceInWords(new Date(), new Date())
        }
      ].map(e => {
        return {
          ...e,
          displayTime: distanceInWords(new Date(), e.datetime)
        };
      });
    }, 800);
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Deseja marcar esta atividade como feita?',
      nzOnOk: () => console.log('OK')
    });
  }
}
