import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import {Observable} from 'rxjs/Observable';
// import { of } from "rxjs/observable/of";
import { AppSetting } from 'src/app/app-setting';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PostComment } from 'src/app/blog/dtos/comment';
import { Observable } from 'rxjs/internal/Observable';
import { Post } from 'src/app/blog/dtos/post';

@Injectable({
  providedIn: 'root'
})
export class BlogModuleService {
  baseUrl:string=AppSetting.apiBaseUrl;
  getAllPostUrl:string=this.baseUrl+"/posts";
  getPostByIdUrl:string=this.baseUrl+"/posts";
  getCommentsByPostIdUrl:string=this.baseUrl+"/comments"
//Get All Posts

  getAllposts():Observable<Array<Post>>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let httpOptions = {
      headers: headers
    };
    return this.http.get(this.getAllPostUrl, httpOptions).pipe(
      tap((cre: Array<Post>) => this.log(`Get posts Success`)),
      catchError(this.handleError)
    );
  }
  private log(message: string) {
    //
  }

//Get Comments by postId from Json file 
getPostById(id):Observable<Post>{
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let httpOptions = {
    headers: headers
  };
  var url=this.getPostByIdUrl+"/"+id;
  return this.http.get(url, httpOptions).pipe(
    tap((cre: Post) => this.log(`Get posts Success`)),
    catchError(this.handleError)
  );
}


//Get Comments
getCommentsByPostId(id):Observable<Array<PostComment>>{
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let httpOptions = {
    headers: headers
  };
  var url=this.getCommentsByPostIdUrl+"?postId="+id;
  return this.http.get(url, httpOptions).pipe(
    tap((cre: Array<PostComment>) => this.log(`Get posts Success`)),
    catchError(this.handleError)
  );
}


//Get Al Comments
getAllComments():Observable<Array<PostComment>>{
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let httpOptions = {
    headers: headers
  };
  var url=this.getCommentsByPostIdUrl;
  return this.http.get(url, httpOptions).pipe(
    tap((cre: Array<PostComment>) => this.log(`Get posts Success`)),
    catchError(this.handleError)
  );
}



AddComment(com:PostComment):Observable<PostComment>{
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json');
  let httpOptions = {
    headers: headers
  };
  var url=this.getCommentsByPostIdUrl;
  
  
  return  this.http.post(url,
  JSON.stringify(com),httpOptions).pipe(
    tap((cre: PostComment) => this.log(`Get posts Success`)),
    catchError(this.handleError));
}


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
  
  constructor(private http: HttpClient) { }
}
