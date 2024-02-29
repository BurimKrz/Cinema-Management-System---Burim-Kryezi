import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../movies-service';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/views/categories/categories-service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  createMovieForm:any = FormGroup;
  categories: string[] = [];

  constructor(
    private movieService:MovieService,
    private catevoriesService:CategoriesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.createMovieForm = new FormGroup({
      name: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      release: new FormControl('', Validators.required),
      synopsis: new FormControl('', Validators.required),
    });
    this.fetchCategories();
  }

  fetchCategories() {
    const categoriesString = localStorage.getItem('categories');
    if (categoriesString) {
      const categories = JSON.parse(categoriesString);
      this.categories = categories.map((category: any) => category.name);
    }
  }

  onSubmit() {
    if (this.createMovieForm.valid) {
      try {
        this.movieService.addMovie(this.createMovieForm.value);
        this.createMovieForm.reset();
        window.alert('Movie created. Click OK to see all movies.');
        this.router.navigateByUrl('/movies/all-movies');
      } catch (error:any) {
        if (error.message === 'A Movie with these details already exists.') {
          window.alert('A Movie with this name already exists. Please check your input.');
        } else {
          console.error('Error creating movie:', error);
          window.alert('Failed to create movie. Please try again.');
        }
      }
    } else {
      window.alert('Form is not valid. Please check your input.');
    }
  }
}