import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../movies-service';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  editMovieForm:any = FormGroup;
  movieDetails:any
  movieId:any

  constructor(private route:ActivatedRoute,
    private movieService:MovieService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.movieId = params['movieId'];
    });
    this.editMovieForm = new FormGroup({
      name: new FormControl('', Validators.required),
      director: new FormControl('', Validators.required),
      release: new FormControl('', Validators.required),
      synopsis: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
    this.fetchUserDetails()
    
  }

  fetchUserDetails() {
    this.movieDetails =this.movieService.getMovieById(JSON.parse(this.movieId)); 
    this.fillInputs()
  }

  fillInputs(){
    this.editMovieForm.get('name').setValue(this.movieDetails.name);
    this.editMovieForm.get('director').setValue(this.movieDetails.director);
    this.editMovieForm.get('release').setValue(this.movieDetails.release);
    this.editMovieForm.get('synopsis').setValue(this.movieDetails.synopsis);
    this.editMovieForm.get('category').setValue(this.movieDetails.category)
  }


  onSubmit() {
    if (this.editMovieForm.valid) {
      try {
        let payload = {
          id:JSON.parse(this.movieId),
          name:this.editMovieForm.value.name,
          director:this.editMovieForm.value.director,
          release:this.editMovieForm.value.release,
          synopsis:this.editMovieForm.value.synopsis,
          category:this.editMovieForm.value.category
        }
        this.movieService.updateMovie(payload);
        this.editMovieForm.reset();
        window.alert('Movie edited. Click OK to see all movies.');
        this.router.navigateByUrl('/movies/all-movies');
      } catch (error:any) {
        console.error('Error editing movie:', error);
        window.alert('Failed to edit movie. Please try again.');
        
      }
    } 
  }
}