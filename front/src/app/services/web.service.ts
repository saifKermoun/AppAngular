import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Rx';
import {AuthService} from "./auth.service";
import {ErrorsService} from "./errors.service";

@Injectable()
export class WebService {

  BASE_URL = 'http://localhost:3000';

  private messageStore: any = [];

  private messageSubject = new Subject();

  messages = this.messageSubject.asObservable();

  constructor(private http: HttpClient, private auth: AuthService, private errors: ErrorsService) {
  }

  getMessages(user = null) {
      user = (user) ? '/' + user : '';
      this.http.get(this.BASE_URL + '/messages' + user).subscribe(
        response => {
          this.messageStore = response;
          this.messageSubject.next(this.messageStore);
        },
        error => this.errors.handleError(error, 'Imposible de récupérer les messages')
      );
  }

  async postMessage(message) {
    try {
      this.messageStore.push(await this.http.post(this.BASE_URL + '/messages', message).toPromise());
      this.messageSubject.next(this.messageStore);
      this.errors.handleSuccess("Le message a été ajouter avec succès !")
    }catch (error) {
      this.errors.handleError(error, "Une erreur est survenue à l'ajout du message");
    }
  }

  deleteMessage(id_msg) {
    let new_id_msg = (id_msg) ? '/' + id_msg : '';
    this.http.delete(this.BASE_URL + '/messages' + new_id_msg).subscribe(
      res => {
      this.getMessages();
      this.errors.handleSuccess("Le message a été supprimer avec succès !");
    },
      error => this.errors.handleError(error, "Une erreur est survenue avec le serveur !"));
  }

  getUser() {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.BASE_URL + '/auth/users/me', {headers: header});
  }

  saveUser(userData) {
    let header = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    return this.http.post(this.BASE_URL + '/auth/users/me', userData , {headers: header}).map(
      res => {
        this.errors.handleSuccess(res)
      },
      error => this.errors.handleError(error, 'une erreur est servenue avec le serveur !')
    )
  }



}
