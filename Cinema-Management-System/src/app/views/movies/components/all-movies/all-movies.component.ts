import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movies-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {
  movieList: any[] = [];
  deleteMovieModal = false;
  clickedMovieData: any;

  constructor(private movieService: MovieService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      const year = params['year'];

      if (category && year) {
        this.movieList = this.movieService
          .getMovies()
          .filter(
            movie =>
              movie.category === category &&
              movie.release.includes(year)
          );
      } else if (category) {
        // Filter movies by category
        this.movieList = this.movieService
          .getMovies()
          .filter(movie => movie.category === category);
      } else if (year) {
        this.movieList = this.movieService
          .getMovies()
          .filter(movie => movie.release.includes(year));
      } else {
        this.fetchMovies();
      }
    });
  }
            

  fetchMovies() {
    this.movieList = this.movieService.getMovies();
  }
 
  extractYear(release: string): number {
    const date = new Date(release);
    return date.getFullYear();
  }

  deleteMovie(item: any) {
    this.clickedMovieData = item;
    this.deleteMovieModal = true;
  }

  deleteMovieFromTable(movieId: number) {
    this.movieService.deleteMovie(movieId);
    this.fetchMovies();
    window.alert('Movie deleted');
    this.deleteMovieModal = false;
  }

  closeDeleteMovieModal() {
    this.deleteMovieModal = false;
  }
}
