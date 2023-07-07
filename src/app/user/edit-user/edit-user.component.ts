import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { setAPIStatus } from 'src/app/user/models/app.action';
import { selectAppState } from 'src/app/user/models/app.selector';
import { Appstate } from 'src/app/user/models/appstate';
import { Users } from '../models/users';
import { invokeUpdateUserAPI } from '../models/users.action';
import { selectUserById } from '../models/users.selector';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: Users = {
    id:0,
    user_name:'',
    user_role:'',
    user_skill:'',
    pic:{},
  };
  comment_images: any={};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectUserById(id)));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.userForm = { ...data };
        this.comment_images = this.userForm.pic;
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.userForm.pic = this.comment_images;
    this.store.dispatch(
      invokeUpdateUserAPI({ updateUser: { ...this.userForm } })
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

  public onIssueFileChange(event: any, type: string) {

    if (type == 'image') {
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
      // if (this.checkFileSize1(event)) {
      // }
    }

  }

}
