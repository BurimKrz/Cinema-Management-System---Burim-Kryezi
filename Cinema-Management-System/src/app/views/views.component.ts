import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MovieService } from './movies/movies-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  username$: Observable<string | null> = this.usernameSubject.asObservable();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.isLoggedInSubject.next(isLoggedIn);
  
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    this.usernameSubject.next(loggedInUsername);
  }

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

  login(email: string, password: string): boolean {
    // Check hardcoded credentials
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedInSubject.next(true);
      return true;
    }
  
    const userString = localStorage.getItem('userData');
    if (userString) {
      const users: any[] = JSON.parse(userString);
      const user = users.find(u => u.email === email);
      if (user && user.password === password) {
        localStorage.setItem('isLoggedIn', 'true');
        this.isLoggedInSubject.next(true);
        this.usernameSubject.next(user.username);
        // Store isLoggedIn and username in localStorage
        localStorage.setItem('loggedInUserEmail', user.email);
        localStorage.setItem('loggedInUsername', user.username);
        return true;
      }
    }
  
    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);
    this.usernameSubject.next(null);
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
