import { Meta } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostdetailsService } from './../home/postdetails.service';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent {
  date: Date = new Date();
  showExpanded: any = {
    date: this.date,
    user_id: '',
    title: '',
    description: '',
    url: '',
    tbl_id: 1,
  };
  entityId: string;
  showModal: boolean;
  updateUserInfo: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postdetailsservice: PostdetailsService,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    // console.log(this.router.url);
    // let id = this.router.url;
    // var lastChar = id.substr(id.length - 1);
    // console.log("Last Char", lastChar);
    // this.getLargeImageUrl(lastChar);
    this.id = this.route.snapshot.paramMap.get('id');
    this.postdetailsservice.getNewUserInfo().subscribe((info) => {
      this.showExpanded = info;
      this.addMetaTags(info);
    });
  }

  public addMetaTags(data: any): void {
    //this.meta.addTag({ name: 'description', content: 'example description' });
    //this.meta.addTag({ property: 'og:title', content: 'Item ' + this.id });
    this.meta.addTag({ name: 'description', content: 'example description' });
    this.meta.addTag({ property: 'og:title', content: 'Item ' + this.id });
    this.meta.addTag({
      property: 'og:description',
      content: 'example og:description',
    });
    this.meta.addTag({
      property: 'og:site_name',
      content: 'example og:site_name',
    });
    console.log('available data:', data);
    // this.meta.updateTag({
    //   property: 'og:description',
    //   content: data.description,
    // });
    // this.meta.updateTag({
    //   property: 'og:title',
    //   content: data.title,
    // });
  }
  @Input() id;

  getLargeImageUrl(id) {
    let data = {
      date: '2019-06-20T19:58:47.000Z',
      description: ' added John',
      tbl_id: '1',
      title: 'Loris',
      user_id: 'System',
    };
    this.showExpanded = data;
  }

  hide() {
    this.showModal = false;
  }
}
