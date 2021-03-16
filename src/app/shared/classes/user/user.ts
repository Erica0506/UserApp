export class User {
  firstname:string = "";
  lastname:string = "";
  email:string = "";
  password:string = "";
  phone?:number;
  gender:string = "";
  dob:string = "";
  uid: string = "";
  status: string = "";
 

  constructor( a:string, b:string, c: string, d:string, e:number, f:string, g:string, h:string) {
    this.firstname = a;
    this.lastname = b;
    this.email = c;
    this.password = d;
    this.phone = e;
    this.gender = f;
    this.dob = g;
    this.uid = h;
   }

}
