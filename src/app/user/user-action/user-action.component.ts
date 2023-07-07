import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from '../models/app.action';
import { selectAppState } from '../models/app.selector';
import { Appstate } from '../models/appstate';
import { Users } from '../models/users';
import { invokeSaveNewUserAPI } from '../models/users.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {

  public userForm!:FormGroup;
  public comment_images: any=[];
  
  public roles : any = [
    {"id":1,"role_name":"Manager"},
    {"id":2,"role_name":"Team Lead"},
    {"id":3,"role_name":"Employee"}
  ];
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
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      user_name: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['',],
      role: ['', Validators.required],
      mobile: ['', Validators.pattern('[6-9]\\d{9}')],
      email: ['', [Validators.required]],
      skill: ['', Validators.required],
      location: ['', Validators.required],
      pic : [{},Validators.required]
  });
  }

  save() {
    let userData = this.userForm.value;
    if(this.comment_images.length == 0){
      this.toastr.error('Please Upload Image');
      return;
    }
    this.userForm.patchValue({
      pic:this.comment_images
    });
    if(this.userForm.invalid){
      this.toastr.error('Please Fill All Mandatory Fields');
      return;
    };
   
    
  let users: Users = {
    id: this.userForm.value.id,
    user_name: this.userForm.value.user_name,
    first_name: this.userForm.value.first_name,
    last_name: this.userForm.value.last_name,
    user_role: this.userForm.value.role,
    mobile: this.userForm.value.mobile,
    email: this.userForm.value.email,
    department: this.userForm.value.department,
    location: this.userForm.value.location,
    user_skill: this.userForm.value.skill,
    pic: this.userForm.value.pic
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
