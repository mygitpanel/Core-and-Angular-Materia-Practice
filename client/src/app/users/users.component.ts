import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title = 'Add New User';
  data:any;
  displayedColumns: string[];
  apiurl:string = 'http://localhost:5000/api/user/userlist';
  userCount:Number;

  public dataSource = new MatTableDataSource<any>();

  constructor(private _httpclient:HttpClient){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this._httpclient.get(this.apiurl).subscribe(response => {
      this.displayedColumns = ['Id', 'User Name'];
      this.dataSource.data = response as any[];
      this.userCount = this.dataSource.data.length;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  rowdata(row){
    console.log(row)
    alert(row.userName + " has Id = " + row.id)
  }

  applyFilter(filterVal:string){
    this.dataSource.filter = filterVal.trim().toLowerCase();
  }

}
