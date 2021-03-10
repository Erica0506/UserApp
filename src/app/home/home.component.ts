import { Component, Inject } from '@angular/core';
import { UsersService } from '../shared/services/user/users.service'
import { User} from '../shared/classes/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  // users: User[] = [
  //   new User("Holly", "Zhou", "holly123", "holly@gmail.com", "h123", 1234567890, "f", "08/21/2020"),
  //   new User("Molly", "Zhou", "molly123", "molly@gmail.com", "m123", 2388929012, "f", "08/21/2021"),
  // ];
 
  str: string = "";
  sortcolumn = "firstname";
  order = 1;
  // constructor(){
  //   this.newusers = this.users;
  // }
  users: [] = [];
  newusers : User[] = []

  constructor(@Inject(UsersService) private UsersService: UsersService) { 
    this.UsersService.getUsers
    ().then(this.onPromiseSuccess, this.onPromiseError);
  }

  onGetDataClick(){
   
  }

  onPromiseSuccess = (response: any) => {
    this.users = response;
    this.newusers = this.users;
    console.log(response);
    console.log(this.users);
    }
    
  onPromiseError = () => {
    alert("error");
    }

  onDeleteClick(n: any) {
    if (confirm("Are you sure to delete this employee?")) {
        this.users.splice(n, 1);
    }
  }

onSearchClick(){
  this.newusers=this.users.filter((user:any) =>{
    return user.username.toLowerCase().indexOf(this.str.toLowerCase())>=0;
  });
  console.log(this.str);
  
}

onSortClick(){
  this.newusers = this.users.sort((user1:any, user2:any) => {
    // var n = 0;
    if (this.sortcolumn == "phone"){
      return (user1[this.sortcolumn]-user2[this.sortcolumn])*this.order;
    } else if (this.sortcolumn == "firstname" || 
               this.sortcolumn == "lastname" || 
               this.sortcolumn == "username" ||
               this.sortcolumn == "email"){
      return (user1[this.sortcolumn].charCodeAt(0)-user2[this.sortcolumn].charCodeAt(0))*this.order;
    } else{
      return (user1[this.sortcolumn]-user2[this.sortcolumn])*this.order;
    }
  });
}


}
