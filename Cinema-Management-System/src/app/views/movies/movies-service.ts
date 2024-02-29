import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private localStorageKey = 'movies';

  constructor() {
    this.initMovies();
  }

  initMovies() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  getMovies(): any[] {
    const movies = localStorage.getItem(this.localStorageKey);
    return movies ? JSON.parse(movies) : [];
  }

  addMovie(movie: any) {
    const movies = this.getMovies();
    const isDuplicate = movies.some(
      existingMovie => 
      existingMovie.name === movie.name
    );
  
    if (isDuplicate) {
      throw new Error('A movie with this name already exists.');
    }
    movie.id = new Date().getTime();
    movies.push(movie);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  
  deleteMovie(movieId: number) {
    let movies = this.getMovies();
    movies = movies.filter(movie => movie.id !== movieId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  getMovieById(movieId: number): any {
    const movies = this.getMovies();
    return movies.find(movie => movie.id === movieId);
  }
  
  updateMovie(updatedMovie: any) {
    let movies = this.getMovies();
    const index = movies.findIndex(movie => movie.id === updatedMovie.id);
    if (index !== -1) {
      movies[index] = updatedMovie;
      localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    }
  }
}
    