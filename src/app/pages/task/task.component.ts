import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { distanceInWords } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  task: Task;
  comments: any[] = [];
  submitting = false;
  currentNetwork = JSON.parse(localStorage.getItem('tccJayneNetwork'));
  currentUser = JSON.parse(localStorage.getItem('tccJayneUser'));
  inputValue = '';

  constructor(private router: Router,  private activatedRoute:ActivatedRoute, private taskService: TaskService, private modalService: NzModalService) { }

  ngOnInit() {
    this.getTask();
  }

  onBack() {
    this.router.navigate(['/home', 'routine']);
  }

  getTask = () => {
    const taskId = this.activatedRoute.snapshot.params.id;
    const task = this.taskService.getTaskById(taskId);
    let snapshot = null;
    task.subscribe(
      data => {
        snapshot = data;
        this.task = new Task(
          snapshot.id,
          snapshot.category,
          snapshot.name,
          snapshot.date,
          snapshot.time,
          snapshot.description,
          snapshot.responsible,
          snapshot.done,
          snapshot.comments == undefined ? [] : snapshot.comments
        );
        this.taskService.getComments(this.task.getId()).subscribe(
          data => {
            if(data.length > 0){
              this.comments = data.reverse();
            }
          },
          error => error
        )
      },
      error => error
    )
  }

  comment(): void {
    this.submitting = true;
    let date = new Date();
    let utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())).toJSON();
    utcDate.slice(0, 10).replace(/-/g,'/').split('/').reverse().join('/');
    let dateComment = utcDate.slice(0, 10).replace(/-/g,'/').split('/').reverse().join('/');
    let comment = {
      author: this.currentUser.firstName + ' ' + this.currentUser.lastName,
      date: dateComment,
      hour: date.getHours() + 'h' + date.getMinutes() + 'min',
      photo: this.currentUser.photo,
      message: this.inputValue
    }
    this.inputValue = '';
    this.taskService.addComment(this.task.getId(), comment);
  }

  setTaskDone(done:boolean): void {
    let message = "Deseja marcar esta atividade como realizada?";
    if(done) {
      message = "Deseja marcar esta atividade como não realizada?";
    }
    this.modalService.confirm({
      nzTitle: message,
      nzOnOk: () => this.taskService.toggleTaskAsDone(this.task.getId(), done)
    });
  }
}
