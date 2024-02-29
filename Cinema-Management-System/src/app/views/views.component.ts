import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MovieService } from './movies/movies-service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.css']
})
export class ViewsComponent implements OnInit {
  categories: string[] = [];
  years: string[] = [];
  movieDetails: any[] = [];
  selectedCategory: string | null = null;
  selectedYear: string | null = null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchYears();
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || null;
      this.selectedYear = params['year'] || null;
      if (this.selectedCategory) {
        this.filterMoviesByCategory(this.selectedCategory);
      } else if (this.selectedYear) {
        this.filterMoviesByYear(this.selectedYear);
      } else {
        this.fetchAllMovies();
      }
    });
  }

  fetchCategories() {
    const categoriesString = localStorage.getItem('categories');
    if (categoriesString) {
      const categories = JSON.parse(categoriesString);
      this.categories = categories.map((category: any) => category.name);
    }
  }

  fetchYears() {
    const moviesString = localStorage.getItem('movies');
    if (moviesString) {
      const movies = JSON.parse(moviesString);
      this.years = Array.from(new Set(movies.map((movie: any) => movie.release.slice(0, 4))));
    }
  }

  fetchAllMovies() {
    const moviesString = localStorage.getItem('movies');
    if (moviesString) {
      this.movieDetails = JSON.parse(moviesString);
    }
  }

  filterMoviesByCategory(category: string) {
    const moviesString = localStorage.getItem('movies');
    if (moviesString) {
      const movies = JSON.parse(moviesString);
      this.movieDetails = movies.filter((movie: any) => movie.category === category);
    }
    this.selectedCategory = category;
    this.selectedYear = null;
    this.updateRouteParams();
  }

  filterMoviesByYear(year: string) {
    const moviesString = localStorage.getItem('movies');
    if (moviesString) {
      const movies = JSON.parse(moviesString);
      this.movieDetails = movies.filter((movie: any) => movie.release.includes(year));
    }
    this.selectedYear = year;
    this.selectedCategory = null; 
    this.updateRouteParams();
  }

  updateRouteParams() {
    const queryParams: Params = {};
    if (this.selectedCategory) {
      queryParams['category'] = this.selectedCategory;
    }
    if (this.selectedYear) {
      queryParams['year'] = this.selectedYear;
    }
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}
