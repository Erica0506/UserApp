import { Injectable, Inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginStatusService {

  isLoggedIn: boolean = false;

    // store the URL so we can redirect after logging in
    redirectUrl!: string;

  constructor() { }
}
