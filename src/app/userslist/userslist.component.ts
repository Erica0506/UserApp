import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


import { User } from '../shared/classes/user/user';
import { UsersService } from '../shared/services/user/users.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
 /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['uid', 'firstname', 'lastname', 'phone'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(@Inject(UsersService) private UsersService: UsersService) { }

  ngOnInit(){
    this.UsersService.getUsers().then(this.onPromiseSuccess, this.onPromiseError);
  }

  onPromiseSuccess = (response: any) => {
    const users = response;
    this.dataSource = new MatTableDataSource(users);

    // Assign the paginator *after* dataSource is set
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPromiseError = () => {
    alert("error");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
