import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsRoutingModule } from './views-routing.module';
import { RouterModule } from '@angular/router';
import { ViewsComponent } from './views.component';
import { CategoriesComponent } from './categories/categories.component';



@NgModule({
  declarations: [
    ViewsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    RouterModule
  ]
})
export class ViewsModule { }
