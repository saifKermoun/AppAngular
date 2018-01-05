import { Component, OnInit } from '@angular/core';
import {WebService} from "../services/web.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private webService: WebService) { }

  model:any = {};

  ngOnInit() {
    this.webService.getUser().subscribe(res => {
      this.model = res;
    });
  }

  post() {

    this.webService.saveUser(this.model).subscribe();
  }
}
