import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeDeleteUserAPI, invokeUsersAPI, } from '../../models/users.action';
import { selectUsers } from '../../models/users.selector';
import { Appstate } from 'src/app/models/appstate'
import { setAPIStatus } from 'src/app/models/app.action';
import { selectAppState } from 'src/app/models/app.selector';
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

  public users$!: Observable<any>; /* OBSERVABLE TO GET USER LIST*/
  public userData: any = {}; /* STORE USERDETAILS TO POPULATE IN MODAL */
  public userList: any = []; /* STORE USERDETAILS FROM DB */
  public userDetails: any = {}; /* STORE USERDATA FROM LOCALSTORAGE */

  constructor(
    private store: Store,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private appStore: Store<Appstate>,
  ) {
  }


  ngOnInit(): void {
    let userData: any = localStorage.getItem('userData');
    this.userDetails = JSON.parse(userData);
    this.getUser()
    this.store.dispatch(invokeUsersAPI());
  }
  // TO GET ALL USER DATA 
  getUser() {
    this.users$ = this.store.pipe(select(selectUsers));
    this.users$.subscribe((users: any) => {
      if (this.userDetails.user_role == 'Admin') {
        this.userList = users ? users : [];
      } else {
        this.userList = users ? users.filter((x: any) => x.user_role != 'Admin') : [];
      }
    },
      ((err: any) => {
        console.log(err.error);
        if (err.error.message) {
          this.toastr.error(err.error.message);
        }
      }));
  }
  // NAVIGATE TO ADD USER SCREEN 
  addUser() {
    this.router.navigate(['/user/add-user']);
  }

  // TO DELETE SELECTED USER 
  delete() {
    this.store.dispatch(
      invokeDeleteUserAPI({
        id: this.userData.id,
      })
    );
    let apiStatus$ = this.appStore?.pipe(select(selectAppState));
    apiStatus$?.subscribe((apState: any) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.toastr.success('User Deleted Sucessfully');
      }
    }, ((err: any) => {
      if (err.error) {
        this.toastr.error(err.error.message);
      }
    }));
    this.closeModal();
  }
  // TO OPEN DELETE CONFIRMATION MODAL 
  confirmDelete(modal: any, data: any) {
    this.userData = data;
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }
  // TO CLOSE DELETE CONFIRMATION MODAL 
  closeModal() {
    this.modalService.dismissAll();
  }
}
