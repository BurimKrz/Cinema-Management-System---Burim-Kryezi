import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMoviesComponent } from './components/all-movies/all-movies.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';



@NgModule({
  declarations: [
    MoviesComponent,
    AllMoviesComponent,
    CreateMovieComponent,
    EditMovieComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
