import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from '../models/app.action';
import { selectAppState } from '../models/app.selector';
import { Appstate } from '../models/appstate';
import { Users } from '../models/users';
import { invokeSaveNewUserAPI } from '../models/users.action';


@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent implements OnInit {
  @ViewChild('comment_images_input') comment_images_input: any;

  userForm: Users = {
    id:0,
    user_name:'',
    user_role:'',
    user_skill:'',
    pic:{},
  };
  comment_images: any={};
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  save() {
    this.userForm.pic = this.comment_images;
    this.store.dispatch(invokeSaveNewUserAPI({ newUser: this.userForm }));
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
      this.comment_images_input.nativeElement.value = '';
      // if (this.checkFileSize1(event)) {
      // }
    }

  }

}
