import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { selectUsers } from 'src/app/models/users.selector';
import { Router } from '@angular/router';
import { invokeUsersAPI } from 'src/app/models/users.action';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = '';/* VARIABLE TO STORE USERNAME */
  public password: string = '';/* VARIABLE TO STORE PASSWORD */
  public users$!: Observable<any>;/* OBSERVABLE TO GET USERS*/
  public userData: any = {}; /* VARIABLE TO STORE USERDATA  */
  public userList: any = []; /* VARIABLE TO STORE USERDATA FROM LOCALSTORAGE */

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private store: Store,
    private loginService: LoginService,
  ) {

  }

  ngOnInit(): void {
    this.getUser();
    this.store.dispatch(invokeUsersAPI());
  }
  // TO GET USER DETALS 
  getUser() {
    this.users$ = this.store.pipe(select(selectUsers));
    this.users$.subscribe((users: any) => {
      this.userList = users ? users : [];
    },
      ((err: any) => {
        console.log(err.error);
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }));
  }

  // TO LOGGED IN 
  login() {
    if (this.username == '' || this.username == null || this.password == '' || this.password == null) {
      this.toastr.error('Please Enter UserName and Password');
      return;
    };
    let passCode = environment.PASSWORD;
    if (this.password !== passCode) {
      this.toastr.error('Incorrect Password');
      return;
    };
    let users = this.userList.map((x: any) => x.user_name);
    if (users.includes(this.username)) {
      let userData = this.userList.find((x: any) => x.user_name == this.username);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/user-details']);
      this.loginService.setLoggIn(true);
    } else {
      this.toastr.error('User Not Found Please Contact Admin');
      return;
    }
  }

}


