import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {WebService} from "../../services/web.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth: AuthService, private webService: WebService) { }

  user = {
  };

  ngOnInit() {
    if(this.auth.isAuthenticated) {
      this.webService.getUser().subscribe(res => {
        this.user = res
      })
    }

  }

}
