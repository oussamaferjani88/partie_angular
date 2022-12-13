import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',

})
export class AddSportComponent implements OnInit {
  newSport = new Sport();
  genres!: Genre[];
  newIdG!: number;
  newGenre!: Genre;

  constructor(private sportService: SportService, private router: Router) { }

  ngOnInit(): void {
    this.sportService.listeGenres().subscribe(gn => { this.genres = gn._embedded.genres;
      console.log(gn);
    });


  }

  addSport() {
    this.newSport.genre = this.genres.find(gn => gn.idG == this.newIdG)!;
    this.sportService.ajouterSport(this.newSport).subscribe(spt => {
      console.log(spt);
      this.router.navigate(['sports']);
    });
  }
}
