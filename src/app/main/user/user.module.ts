import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {RouterModule,Routes} from '@angular/router';
import { RoleModule } from '../role/role.module';

const userRoutes: Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:UserComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [UserComponent]
})
export class UserModule { }
