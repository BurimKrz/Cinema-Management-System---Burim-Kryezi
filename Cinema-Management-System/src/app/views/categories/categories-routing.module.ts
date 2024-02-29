import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./categories.component";
import { AllCatetoriesComponent } from "./components/all-catetories/all-catetories.component";
import { CreateCategoryComponent } from "./components/create-category/create-category.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";



const routes: Routes = [
  {
    path: 'categories', component: CategoriesComponent, children: [
    {path:'all-categories',component:AllCatetoriesComponent},
    {path:'create-category',component:CreateCategoryComponent},
    {path:'edit-movie/:id',component:EditCategoryComponent},
    ]
  }
];
export const CategoriesRoutingModule = RouterModule.forChild(routes);