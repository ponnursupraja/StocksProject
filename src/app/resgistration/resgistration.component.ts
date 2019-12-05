import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resgistration',
  templateUrl: './resgistration.component.html',
  styleUrls: ['./resgistration.component.css']
})
export class ResgistrationComponent implements OnInit {
username : string;
email: string;
address : string;
password : string;

  constructor() { }

  ngOnInit() {
  }

  submit(){

  }

}
