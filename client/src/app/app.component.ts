import { Component, OnInit } from '@angular/core';
import { userModel } from './_models/user';
import { UserregisterService } from './_Services/userregister.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  constructor(private _service:UserregisterService){}

  ngOnInit(){
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user:userModel = JSON.parse(localStorage.getItem('user'));
    this._service.SetCurrentUser(user);
  }
}
