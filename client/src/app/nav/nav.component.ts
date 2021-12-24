import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserregisterService } from '../_Services/userregister.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  //username: string = null;

  constructor(
    public _userregisterservice: UserregisterService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //this.getCurrentUser();
  }

  // getCurrentUser() {
  //   this._userregisterservice.currentuser$.subscribe(
  //     (user) => {
  //       this.username = user.userName; // !!user :- means if user is null then false else true. !! works like conditional statement here.
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  logout() {
    this._userregisterservice.logout();
    this._snackBar.open('Logout successfully', 'Dismiss');
    this._router.navigate(['/home']);
  }
}
