import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/models/app.action';
import { selectAppState } from 'src/app/models/app.selector';
import { Appstate } from 'src/app/models/appstate';
import { Users } from '../../models/users';
import { invokeUpdateUserAPI } from '../../models/users.action';
import { selectUserById } from '../../models/users.selector';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  // userForm: Users = {
  //   id:0,
  //   user_name:'',
  //   first_name:'',
  //   last_name:'',
  //   user_role:'',
  //   mobile:0,
  //   email:'',
  //   department:'',
  //   location:'',
  //   user_skill:'',
  //   pic:{}
  // };
  public comment_images: any={};
  public userForm!:FormGroup;
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
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {

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

     this.getUsers();
  }

  getUsers(){
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectUserById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.userForm.patchValue(data);
        this.comment_images = data.pic;
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  update() {

    let userData = this.userForm.value;
    this.userForm.patchValue({
      pic:this.comment_images
    });

    if(this.userForm.invalid){
      this.toastr.error('Please Fill All Mandatory Fields');
      return;
    }
        
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
    this.store.dispatch(
      invokeUpdateUserAPI({ updateUser: users })
    );
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
