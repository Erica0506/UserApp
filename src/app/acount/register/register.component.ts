import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Event, NavigationStart } from '@angular/router';
import { User } from 'src/app/shared/classes/user/user';
import { RegisterService } from 'src/app/shared/services/registerservice/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  phone?: number;
  gender: string = "";
  dob: string = "";
  msg: string = "";

  myform!: FormGroup;

  canNavigate: boolean = true;

  constructor(private rs: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.myform = new FormGroup({
      firstname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*$")]),
      lastname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z09]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]),
      password: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]),
      phone: new FormControl("", [Validators.required, Validators.pattern("^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$")]),
      gender: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required])
    });


    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {

        if (!this.myform.valid && this.myform.untouched) {
          this.canNavigate = true;
        } else if (this.myform.valid) {
          this.canNavigate = true;
        } else {
          this.canNavigate = false;
        }
      }
      // if (event instanceof NavigationEnd) {
      //   // Hide loading indicator
      // }
      // if (event instanceof NavigationError) {
      //   // Hide loading indicator
      //   // Present error to user
      //   console.log(event.error);
      // }
    });
  }
  //@HostListener('window:beforeunload')

  PostData() {
    if (this.myform.valid) {

      let newUser = this.myform.value;
      newUser["status"] = "active";
      console.log(newUser);

      this.rs.register(newUser).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status=="error") {
            alert(res.message)
          } else { 
            this.msg = "You have successful registered!"
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
            this.router.navigateByUrl(returnUrl);
          }
        },
        () => { console.log('error in post'); }
      )
    } else {
      //this.canNavigate=false;
      this.msg = "Invalid";
    }
  }

  ngOnInit(): void {
  }

}
