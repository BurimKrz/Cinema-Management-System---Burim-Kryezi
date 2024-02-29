import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../movies-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movieDetails:any
  movieId:any
  deleteMovieModal:boolean = false
  clickedMovieData:any
  movieList: any[] = [];

  constructor(private movieService:MovieService, 
              private route:ActivatedRoute,
              private router:Router) { 
    this.route.queryParams.subscribe(params => {
      this.movieId = params['movieId'];
    });
  }
  ngOnInit(): void {
    this.fetchMovieDetails()
    this.fetchMovies();
  }

  fetchMovieDetails() {
    this.movieDetails = this.movieService.getMovieById(JSON.parse(this.movieId));   
  }

  fetchMovies() {
    this.movieList = this.movieService.getMovies();
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
    this.router.navigateByUrl('/movies/all-movies');
  }

  closeDeleteMovieModal() {
    this.deleteMovieModal = false;
  }
}
