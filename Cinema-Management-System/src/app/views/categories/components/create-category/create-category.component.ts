import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm:any = FormGroup
  constructor(private categoriesService:CategoriesService,
              private router:Router,
              ) { }

  ngOnInit(): void {
    this.createCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    
    if (this.createCategoryForm.valid) {
      try {
        this.categoriesService.addCategory(this.createCategoryForm.value);
        this.createCategoryForm.reset();
        window.alert('Category created. Click OK to see all users.');
        this.router.navigateByUrl('/categories/all-categories');
      } catch (error:any) {
        
          window.alert('Failed to create category. Please try again.');
      
      }
    } else {
      window.alert('Form is not valid. Please check your input.');
    }
  }
  
}