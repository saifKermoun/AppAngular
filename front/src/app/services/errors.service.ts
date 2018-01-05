import { Injectable } from '@angular/core';

@Injectable()
export class ErrorsService {

  constructor() { }

  handleError(error, msg) {
    console.error(error);
    this.snackBar(msg);
  }

  handleSuccess(msg) {
    this.snackBar(msg);
  }

  private snackBar (msg) {
    // Get the snackbar DIV
    const x = document.getElementById('snackbar');

    // Add the "show" class to DIV
    x.className = 'show';
    x.textContent = msg;

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace('show', ''); }, 3000);
  }
}
