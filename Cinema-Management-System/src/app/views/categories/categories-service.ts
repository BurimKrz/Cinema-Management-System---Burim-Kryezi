import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private localStorageKey = 'categories';

  constructor() {
    this.initCategories();
  }

  initCategories() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getCategories(): any[] {
    const categories = localStorage.getItem(this.localStorageKey);
    return categories ? JSON.parse(categories) : [];
  }

  addCategory(category: any) {
    const categories = this.getCategories();
    const isDuplicate = categories.some(existingCategory => 
      existingCategory.name === category.name
    );
  
    if (isDuplicate) {
      throw new Error('A category with this name already exists.');
    }
    category.id = new Date().getTime();
    categories.push(category);
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }

  deleteCategory(categoryId: number) {
    let categories = this.getCategories();
    categories = categories.filter(category => category.id !== categoryId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }

  getCategoryById(categoryId: number): any {
    const categories = this.getCategories();
    return categories.find(category => category.id === categoryId);
  }
  
  updateCategory(updatedCategory: any) {
    let categories = this.getCategories();
    const index = categories.findIndex(category => category.id === updatedCategory.id);
    if (index !== -1) {
      categories[index] = updatedCategory;
      localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
    }
  }
}
