import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories-service';

@Component({
  selector: 'app-all-catetories',
  templateUrl: './all-catetories.component.html',
  styleUrls: ['./all-catetories.component.css']
})
export class AllCatetoriesComponent implements OnInit {

  categoryList:any = []
  deletecategoryModal:boolean = false
  clickedcategoryData:any
  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.fetchCategories()
  }

  
  fetchCategories() {
    this.categoryList = this.categoriesService.getCategories();
  }
 

  deleteCategory(item:any){
    this.clickedcategoryData = item
    this.deletecategoryModal = true
  }

  deletecategoryFromTable(categoryId: number) {
    this.categoriesService.deleteCategory(categoryId);
    this.fetchCategories();
    window.alert('Category deleted, Click ok to see all categories')
    this.deletecategoryModal = false
  }

  closeDeletecategoryModal(){
    this.deletecategoryModal = false
  }


}

