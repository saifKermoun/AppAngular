import { Component, OnInit } from '@angular/core';
import {WebService} from '../../services/web.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  show: boolean;
  // ActivatedRoute permet d'acceder aux parametres url
  constructor(private webService: WebService, private route: ActivatedRoute, private auths: AuthService) { }

  ngOnInit() {
    this.show = false;
    let auth: any = this.route.snapshot.params.name;
    this.webService.getMessages(auth);
  }

  deleteMsg(id_msg) {
    this.webService.deleteMessage(id_msg);
  }

  shows(bool) {
    this.show = bool
  }

}
