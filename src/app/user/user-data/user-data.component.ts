import { Component,OnInit,ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeDeleteUserAPI, invokeUsersAPI, } from '../models/users.action';
import { selectUsers } from '../models/users.selector';
import { Appstate } from 'src/app/user/models/appstate'
import { setAPIStatus } from 'src/app/user/models/app.action';
import { selectAppState } from 'src/app/user/models/app.selector';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @ViewChild('comment_images_input') comment_images_input: any;

  public users$! : Observable<any>;
  appStore: any;
  deleteModal: any;
  comment_images: any[] = [];

  constructor(
    private store: Store,
    private router : Router
  ){
  }
  

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(selectUsers));
    this.store.dispatch(invokeUsersAPI());
  }
  addUser(){
    this.router.navigate(['/user/add-user'])
  }

  delete(data:any) {
    this.store.dispatch(
      invokeDeleteUserAPI({
        id: data.id,
      })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState:any) => {
      if (apState.apiStatus == 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
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
          this.comment_images.push({ 'file': file_data, 'source': url });
        }
      }
      this.comment_images_input.nativeElement.value = '';
      // if (this.checkFileSize1(event)) {
      // }
    }

  }

  // checkFileSize1(event: any) {
  //   let flag = true;
  //   let invalidType = false;
  //   for (let i = 0; i < event.target.files.length; i++) {
  //     let file_size = parseFloat((event.target.files[i].size / (1024 * 1024)).toFixed(2));
  //     if (file_size > 20) {
  //       flag = false;
  //     }
  //     if (!event.target.files[i].type.includes('image')) {
  //       invalidType = true;
  //     }
  //     if (invalidType) {
  //       this.toastr.error('Invalid file format', 'Alert!');
  //       return;
  //     }
  //     if (!flag) {
  //       this.toastr.error('File size should be less than or equal to 20 MB', 'Alert!');
  //     }
  //   }
  //   return flag || invalidType;
  // }

}
