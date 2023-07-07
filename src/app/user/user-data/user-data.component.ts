import { Component,OnInit,ViewChild } from '@angular/core';
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

  public users$! : Observable<any>;
  public appStore: any;
  public userData : any = {};
  public userList : any =[];

  constructor(
    private store: Store,
    private router : Router,
    private modalService : NgbModal,
    private toastr: ToastrService,
  ){
  }
  

  ngOnInit(): void {
    this.getUser()
    this.store.dispatch(invokeUsersAPI());
  }
  getUser(){
    this.users$ = this.store.pipe(select(selectUsers));
    this.users$.subscribe((users:any) => {
      this.userList = users ? users.filter((x:any)=>x.user_role != 'Admin'):[];
    },
    ((err:any)=>{
      console.log(err.error);
      if(err.error.message){
        this.toastr.error(err.error.message);
      }
    }));
  }
  addUser(){
    this.router.navigate(['/user/add-user']);
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
