import { Component, OnInit } from '@angular/core';
import {WebService} from "../services/web.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messages = [];
  constructor(private ws: WebService) { }

  ngOnInit() {
    this.ws.getMessages();
  }
}
