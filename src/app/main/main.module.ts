import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule, Route } from '@angular/router'
//import { UserModule } from './user/user.module';
//import { HomeModule } from './home/home.module';
import { UtilityService } from '../core/servies/utility.service';
import { AuthenService } from '../core/servies/authen.service';
@NgModule({
  imports: [
    CommonModule,
   // UserModule,
    //HomeModule,
    RouterModule.forChild(mainRoutes)

  ],
  declarations: [MainComponent],
  providers:[UtilityService,AuthenService]
})
export class MainModule { }
