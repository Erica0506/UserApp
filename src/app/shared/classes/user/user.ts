export class User {
  firstname:string = "";
  lastname:string = "";
  uid: string = "";
  email:string = "";
  password:string = "";
  phone?:number;
  gender:string = "";
  dob:string = "";
 

  constructor( a:string, b:string, c: string, d:string, e:string, f:number, g:string, h:string) {
    this.firstname = a;
    this.lastname = b;
    this.uid = c;
    this.email = d;
    this.password = e;
    this.phone = f;
    this.gender = g;
    this.dob = h;
   }

}
