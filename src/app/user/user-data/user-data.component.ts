import { Component,OnInit,ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeDeleteUserAPI, invokeUsersAPI, } from '../models/users.action';
import { selectUsers } from '../models/users.selector';
import { Appstate } from 'src/app/user/models/appstate'
import { setAPIStatus } from 'src/app/user/models/app.action';
import { selectAppState } from 'src/app/user/models/app.selector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @ViewChild('comment_images_input') comment_images_input: any;

  public users$! : Observable<any>;
  public appStore: any;
  public userData : any = {};

  constructor(
    private store: Store,
    private router : Router,
    private modalService : NgbModal,
    private toastr: ToastrService,
  ){
  }
  

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(selectUsers));
    this.store.dispatch(invokeUsersAPI());
  }
  addUser(){
    this.router.navigate(['/user/add-user'])
  }

  delete() {
    this.store.dispatch(
      invokeDeleteUserAPI({
        id: this.userData.id,
      })
    );
    let apiStatus$ = this.appStore?.pipe(select(selectAppState));
    apiStatus$?.subscribe((apState:any) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.toastr.success('User Deleted Sucessfully');
      }
    });
    this.closeModal();
  }
  confirmDelete(modal: any, data:any) {
    this.userData = data;
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }
  closeModal(){
    this.modalService.dismissAll();
  }
}
