import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ag-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() type: string;
  @Input() placeholder: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
