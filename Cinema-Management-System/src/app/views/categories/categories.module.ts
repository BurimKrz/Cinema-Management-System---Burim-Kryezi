import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCatetoriesComponent } from './components/all-catetories/all-catetories.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesRoutingModule } from '../movies/movies-routing.module';
import { CategoriesRoutingModule } from './categories-routing.module';



@NgModule({
  declarations: [
    AllCatetoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MoviesRoutingModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
