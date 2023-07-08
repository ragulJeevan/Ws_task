import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from '../../models/app.action';
import { selectAppState } from '../../models/app.selector';
import { Appstate } from '../../models/appstate';
import { Users } from '../../models/users';
import { invokeSaveNewUserAPI } from '../../models/users.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {

  public userForm!:FormGroup; /* USERS FORM */
  public comment_images: any=[];/* STORE UPLOADED IMAGE */
  public userDetails :any={}; /* STORE USERDETAILS FROM LOCALSTORAGE */
  // VARIABLE TO FOR PROVIDED ROLES 
  public roles : any = [
    {"id":1,"role_name":"Admin"},
    {"id":2,"role_name":"Manager"},
    {"id":3,"role_name":"Employee"}
  ];
  // VARIABLE FOR PROVIDED LOCATION 
  public locations : any = [
    {"id":1,"location_name":"Coimbatore"},
    {"id":2,"location_name":"Chennai"},
    {"id":3,"location_name":"Banglore"}
  ];
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    let  userData : any = localStorage.getItem('userData');
    this.userDetails = JSON.parse(userData);
    if(this.userDetails && (this.userDetails.user_role == 'Manager' || this.userDetails.user_role == 'Employee')){
      this.roles = [
        {"id":3,"role_name":"Employee"}
      ];
    }
    // INITIALIZE FORM 
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      user_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['',],
      user_role: ['', Validators.required],
      mobile: ['', Validators.pattern('[6-9]\\d{9}')],
      email: ['', [Validators.required]],
      user_skill: ['', Validators.required],
      location: ['', Validators.required],
      pic : [{},Validators.required]
  });
  }
// SAVE USER DATA 
  save() {
    
    if(this.comment_images.length == 0){
      this.toastr.error('Please Upload Image');
      return;
    }
    this.userForm.patchValue({
      pic:this.comment_images
    });
    let userData = this.userForm.value;
    if(this.userForm.invalid){
      this.toastr.error('Please Fill All Mandatory Fields');
      return;
    };
   
    
  let users: Users = {
    id: userData.id,
    user_name: userData.user_name,
    first_name: userData.first_name,
    last_name: userData.last_name,
    user_role: userData.user_role,
    mobile: userData.mobile,
    email: userData.email,
    department: userData.department,
    location: userData.location,
    user_skill: userData.user_skill,
    pic: userData.pic
  };
    this.store.dispatch(invokeSaveNewUserAPI({ newUser: users }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
         this.router.navigate(['/user-details']);
      }
    });
  }

  back(){
    this.router.navigate(['/user-details']);
  }
// TO UPLOAD IMAGE 
  onIssueFileChange(event: any) {
    if(this.checkFileSize(event)){
      for (var i = 0; i <= event.target.files.length - 1; i++) {
  
        let url: any;
        let file_data = event.target.files[i];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event_src) => {
          url = (<FileReader>event_src.target).result;
          this.comment_images = ({ 'file': file_data, 'source': url });
        }
      }
    }else{
      this.toastr.error('Invalid file format');
    }
  }
// IMAGE TYPE VALIDATION 
  checkFileSize(event: any) {
    let flag = true;
    for (let i = 0; i < event.target.files.length; i++) {
      if (!event.target.files[i].type.includes('image')) {
        flag = false;
      }
    }
    if (!flag) {
      this.toastr.error('Invalid file format');
      return;
    }
    return  flag;
  }

}
