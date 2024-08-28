import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'counter',component:CounterbuttonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
