import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'ws_task';
  public isLogged: boolean = true;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.getLoggIn.subscribe((x: any) => {
      if (x) {
        this.isLogged = true;
      }
    });
    this.loginService.getLoggOut.subscribe((x: any) => {
      if (x) {
        this.isLogged = false;
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.loginService.setLoggOut(true);
  }
}
