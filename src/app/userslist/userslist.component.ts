import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

import { User } from '../shared/classes/user/user';
import { LoginService } from '../shared/services/login-service/login.service';
import { RegisterService } from '../shared/services/registerservice/register.service';
import { UsersService } from '../shared/services/user/users.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['uid', 'firstname', 'lastname', 'phone', 'action'];
  dataSource!: MatTableDataSource<User>;
  users: User[] = [];

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private UsersService: UsersService,
    private myloginservice: LoginService,
    private register: RegisterService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.UsersService.getUsers().then(this.onPromiseSuccess, this.onPromiseError);
  }

  onPromiseSuccess = (response: any) => {
    for (let i = 0; i < response.length; i++) {
      if (response[i].status == "active") {
        this.users.push(response[i]);
      }
    }
    // this.users = response;
    this.dataSource = new MatTableDataSource(this.users);
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

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    row_obj.status = "active";
    this.register.register(row_obj)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == "error") {
            alert(res.message)
          } else {
            this.dataSource.data.push({
              uid: row_obj.email,
              firstname: row_obj.firstname,
              lastname: row_obj.lastname,
              email: row_obj.email,
              password: row_obj.password,
              phone: row_obj.phone,
              gender: row_obj.gender,
              dob: row_obj.dob,
              status: 'active'
            });
            this.table.renderRows();
            this.dataSource.data = this.dataSource.data.filter((value, key) => {
              return value.status = "active";
            });
          }
        },
        () => { console.log('error in post process'); }
      )


  }
  updateRowData(row_obj: any) {
    this.myloginservice.update(row_obj)
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => { alert(error); }
      );
    this.dataSource.data = this.dataSource.data.filter((user, key) => {
      if (user.uid == row_obj.uid) {
        user.uid = row_obj.email;
        user.firstname = row_obj.firstname;
        user.lastname = row_obj.lastname;
        user.email = row_obj.email;
        user.password = row_obj.password;
        user.phone = row_obj.phone;
        user.gender = row_obj.gender;
        user.dob = row_obj.dob;
      }
      return true;
    });
  }

  deleteRowData(row_obj: any) {
    this.myloginservice.delete(row_obj.uid)
      .pipe(first())
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => { alert(error); }
      );
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.uid != row_obj.uid;
    });
  }


  activeUser(uid: string) {
    if (confirm("Are you sure to active this User?")) {
      this.myloginservice.active(uid)
        .pipe(first())
        //.subscribe(() => this.users = this.users.filter(x => x.uid !== uid))
        .subscribe(
          (response: any) => {
            console.log(response);
          },
          (error: any) => { alert(error); }
        );
      this.table.renderRows();
    }
  }

}
