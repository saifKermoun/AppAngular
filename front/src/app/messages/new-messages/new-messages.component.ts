import { Component, OnInit} from '@angular/core';
import {WebService} from '../../services/web.service';
import {AuthService} from "../../services/auth.service";
import {MessagesComponent} from "../messages/messages.component";

@Component({
  selector: 'app-new-messages',
  templateUrl: './new-messages.component.html',
  styleUrls: ['./new-messages.component.css']
})

export class NewMessagesComponent implements OnInit {

  constructor(private webService: WebService, private auth: AuthService, private msg: MessagesComponent) { }

  message = {
    id_user: '',
    message: ''
  };

  ngOnInit() {
    if(this.auth.isAuthenticated) {
      this.webService.getUser().subscribe( res => {
       //this.message.id_user = res.id_user;
      })
    }
  }

  post() {
    if(this.webService.postMessage(this.message)) {
      this.msg.shows(false);
    }
  }

}
