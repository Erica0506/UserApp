import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname:string = "";
  lastname:string = "";
  username:string = "";
  email:string = "";
  password:string = "";
  phone?:number;
  gender:string = "";
  dob:string = "";
  msg:string = "";

  msg2: string = "";
  myform!: FormGroup;


  constructor() {
    this.myform = new FormGroup({
      firstname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*$")]),
      lastname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*$")]),
      username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z0-9]+$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z09]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]),
      password: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]),
      phone: new FormControl("", [Validators.required,  Validators.pattern("^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$")]),
      gender: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required])
    });
  }


  CheckInfo(){
    
    if (this.myform.valid){
      this.msg = "You have successful registered!"
      this.msg2 = "Firstname: " + this.myform.controls.firstname.value + "<br>Lastname: " + this.myform.controls.lastname.value  +  "<br>Username: " + this.myform.controls.username.value  + "<br>Email: " + this.myform.controls.email.value+ "<br>Phone: " + this.myform.controls.phone.value + "<br>Gender: " + this.myform.controls.gender.value + "<br>Date of Birth: " + this.myform.controls.dob.value
      
    } else {
      this.msg2 = "Invalid";
    }

  }
  ngOnInit(): void {
  }

}
