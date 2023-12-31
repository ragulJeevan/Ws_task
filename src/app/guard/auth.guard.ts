import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public userDetails: any;
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userData: any = localStorage.getItem('userData');
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    this.userDetails = JSON.parse(userData);
    let userId = this.userDetails ? this.userDetails.id : 0;
    if (isLoggedIn !== 'true' && state.url == "/user-details") {
      this.router.navigate(['/login']);
    } else if (isLoggedIn == 'true' && state.url == "/login") {
      this.router.navigate(['/user-details']);
    } else if (isLoggedIn == 'true' && state.url == "/") {
      this.router.navigate(['/user-details']);
    }
    return true;
  }

}
