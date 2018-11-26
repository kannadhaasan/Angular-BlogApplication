import { Component, OnInit } from '@angular/core';
import { BlogModuleService } from 'src/app/blog/blog-module.service';
import { PostComment } from 'src/app/blog/dtos/comment';
import { Post } from 'src/app/blog/dtos/post';
import { ApiData } from 'src/app/blog/dtos/ApiData';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.scss']
})
export class AllPostComponent implements OnInit {
  posts:Array<Post>;
  apiData:ApiData;
  constructor(private blogService:BlogModuleService) { }

  ngOnInit() {
    debugger;
    this.apiData=new ApiData();
    this.apiData.posts=new Array<Post>();
    this.posts=new Array<Post>();
    this.blogService.getAllposts().subscribe(
      data => {
        debugger;
        this.posts=data;
        this.posts.sort((a,b)=>new Date(b.publish_date).getTime()-new Date(a.publish_date).getTime());
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

  }

}
