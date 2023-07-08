import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loggIn$ = new BehaviorSubject<boolean>(false);
  private _loggOut$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoggIn(data: any) { if (data) { this._loggIn$.next(data); } }
  get getLoggIn() { return this._loggIn$.asObservable(); }

  setLoggOut(data: any) { if (data) { this._loggOut$.next(data); } }
  get getLoggOut() { return this._loggOut$.asObservable(); }
}
