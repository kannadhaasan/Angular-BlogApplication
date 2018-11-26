import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AllPostComponent } from './all-post/all-post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import {RouterModule} from '@angular/router';
import { BlogRoutingModule } from 'src/app/blog/blog.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BlogRoutingModule
  ],
  declarations: [AllPostComponent, ViewPostComponent]
})
export class BlogModule { }
