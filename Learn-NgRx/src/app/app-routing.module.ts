import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component';
import { BlogComponent } from './component/blog/blog.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'counter', component: CounterbuttonComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
