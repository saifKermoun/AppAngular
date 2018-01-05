import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ErrorsService} from "./errors.service";


@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:3000/auth';
  NAME_KEY = 'nom';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router, private errors: ErrorsService) { }

  get name(){

    return localStorage.getItem(this.NAME_KEY);
  }

  // retourne vrai ou faux, si le token exist ou pas
  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  register(user) {
    delete user.confirmPassword;
    // On enregistre coté client le token et l'email l'or de l'enregistrement de l'utilisateur
    // On vérifie si le token exist et on redirige ver la page d'accueil dans le cas ou il existe

    this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
      this.authenticate(res);
      this.errors.handleSuccess("L'inscription s'est déroulé avec succès !")
    },
      error => this.errors.handleError(error, 'Une erreur est survenue avec le serveur ! ')
    )
  }

  login(loginData) {
    this.http.post(this.BASE_URL + '/login', loginData).subscribe(res => {
      this.authenticate(res);
    });
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['home']);
  }

  authenticate(res) {
    const authResponse = res;
    if (!authResponse.token)
      return;
      localStorage.setItem(this.TOKEN_KEY, authResponse.token);
      localStorage.setItem(this.NAME_KEY, authResponse.nom);
      this.router.navigate(['user']);
  }

}
