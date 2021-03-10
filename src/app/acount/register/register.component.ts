import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/classes/user/user';
import { RegisterService } from 'src/app/shared/services/registerservice/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname:string = "";
  lastname:string = "";
  email:string = "";
  password:string = "";
  phone?:number;
  gender:string = "";
  dob:string = "";
  msg:string = "";

  msg2: string = "";
  myform!: FormGroup;


  constructor(private rs: RegisterService,
              private router: Router ) {
    this.myform = new FormGroup({
      firstname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*$")]),
      lastname: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9]+(\.[_a-z09]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")]),
      password: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")]),
      phone: new FormControl("", [Validators.required,  Validators.pattern("^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$")]),
      gender: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required])
    });
  }


  PostData(){
    
    if (this.myform.valid){
      this.msg = "You have successful registered!"
      console.log(this.myform.value);
      this.myform.value["uid"]=this.myform.value.email
      console.log(this.myform.value);
      
      //this.msg2 = "Firstname: " + this.myform.controls.firstname.value + "<br>Lastname: " + this.myform.controls.lastname.value  +  "<br>Username: " + this.myform.controls.username.value  + "<br>Email: " + this.myform.controls.email.value+ "<br>Phone: " + this.myform.controls.phone.value + "<br>Gender: " + this.myform.controls.gender.value + "<br>Date of Birth: " + this.myform.controls.dob.value

      // var newuser = new User(this.firstname, this.lastname, this.email, this.password, this.phone!, this.gender, this.dob, this.email)
      // console.log(newuser);
      
      this.rs.register(this.myform.value).subscribe(
        (res: any) => {
          console.log(res);
        },
        () => console.log('erro in post')
      )
    } else {
      this.msg = "Invalid";
    }
  }

  ngOnInit(): void {
  }

}
