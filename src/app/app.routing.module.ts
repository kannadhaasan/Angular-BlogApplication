import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { AllPostComponent } from "src/app/blog/all-post/all-post.component";
import { RouterModule } from "@angular/router";
const routes:Routes=[
    {path:'',component:AllPostComponent},
    {path:'allPosts',component:AllPostComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}