import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { AllPostComponent } from "src/app/blog/all-post/all-post.component";
import { RouterModule } from "@angular/router";
import { ViewPostComponent } from "src/app/blog/view-post/view-post.component";
const routes:Routes=[
    {path:'post/:id',component:ViewPostComponent},
    {path:'allPosts',component:AllPostComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class BlogRoutingModule{}