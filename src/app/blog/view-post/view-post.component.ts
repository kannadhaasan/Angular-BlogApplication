import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Post } from 'src/app/blog/dtos/post';
import { PostComment } from 'src/app/blog/dtos/comment';
import { BlogModuleService } from 'src/app/blog/blog-module.service';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  id=null;
  post:Post;
  comments:Array<PostComment>;
  newComment:PostComment;
  max=0;

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);
  commentFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(private blogService:BlogModuleService,private route:ActivatedRoute,private router:Router,private datePipe: DatePipe) { }

  ngOnInit() {
    debugger;
    this.newComment=new PostComment();
    this.post=new Post();
    this.comments=new Array<PostComment>();
    var id=this.route.snapshot.paramMap.get('id');
    this.id=id;
    if(id!=null){

      this.blogService.getPostById(id).subscribe(
      data => {
        debugger;
        this.post=data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

    this.blogService.getCommentsByPostId(id).subscribe(
      data => {
        debugger;
        this.comments=data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );

    this.blogService.getAllComments().subscribe(
      data => {
        debugger;
        this.setMaxNumber(data);
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );


    }
  }

  addComment(){
    debugger;
    if(this.newComment.content=="" ||this.newComment.user==""){
      return;
    }


    var a='_' + Math.random().toString(36).substr(2, 9);
    var com:PostComment;
    com=new PostComment();
    com.content=this.newComment.content;
    com.date=this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    com.id=this.max;
    com.parent_id=null;
    com.postId=this.post.id;
    com.user=this.newComment.user;

    this.max=this.max+1;
    this.blogService.AddComment(com).subscribe(
      data => {
        debugger;
        this.comments.push(com);
        this.newComment=new PostComment();
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  setMaxNumber(arr:Array<PostComment>){
    for(var i=0;i<arr.length;i++){
      if(arr[i].id>this.max){
        this.max=arr[i].id;
      }
    }
    this.max=this.max+1;
  }

}
