import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostdetailsService {

  constructor() { }
  private Selectedpost = new BehaviorSubject<any>({
    'date': '','user_id':'','title':'',  'description':'', 'url':'', 'tbl_id':''
  });

  setNewpostInfo(post: any) {
    console.log("-----newpost --------",post)
    this.Selectedpost.next(post);
  }

  getNewUserInfo() {
    return this.Selectedpost.asObservable();
  }

}
