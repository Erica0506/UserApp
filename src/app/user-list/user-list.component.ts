import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { User } from '../shared/classes/user/user';
import { UsersService } from '../shared/services/user/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements AfterViewInit{

  str: string = "";
  sortcolumn = "firstname";
  order = 1;
  users: [] = [];
  newusers: User[] = []


  displayedColumns: string[] = ['uid', 'firstname', 'lastname', 'phone'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(UsersService) private UsersService: UsersService) {
     this.UsersService.getUsers().then(this.onPromiseSuccess, this.onPromiseError);
  }
  //onGetDataClick() {}

  onPromiseSuccess = (response: any) => {
    this.users = response;
    this.newusers = this.users;
    console.log(this.users);
  }

  onPromiseError = () => {
    alert("error");
  }

  ngAfterViewInit() {
    if(this.paginator&&this.sort){
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }






  onDeleteClick(n: any) {
    if (confirm("Are you sure to delete this employee?")) {
      this.users.splice(n, 1);
    }
  }

  onSearchClick() {
    this.newusers = this.users.filter((user: any) => {
      return user.username.toLowerCase().indexOf(this.str.toLowerCase()) >= 0;
    });
    console.log(this.str);
  }

  onSortClick() {
    this.newusers = this.users.sort((user1: any, user2: any) => {
      // var n = 0;
      if (this.sortcolumn == "phone") {
        return (user1[this.sortcolumn] - user2[this.sortcolumn]) * this.order;
      } else if (this.sortcolumn == "firstname" ||
        this.sortcolumn == "lastname" ||
        this.sortcolumn == "username" ||
        this.sortcolumn == "email") {
        return (user1[this.sortcolumn].charCodeAt(0) - user2[this.sortcolumn].charCodeAt(0)) * this.order;
      } else {
        return (user1[this.sortcolumn] - user2[this.sortcolumn]) * this.order;
      }
    });
  }

}
