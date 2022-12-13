import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { Sport } from '../model/sport.model';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-update-sport',
  templateUrl: './update-sport.component.html',
  styles: [
  ]
})
export class UpdateSportComponent implements OnInit {
  currentSport = new Sport();
  genres!: Genre[];
  updatedGnId!: number;
  constructor(private activatedRoute: ActivatedRoute, private sportService: SportService, private router: Router) { }

  ngOnInit(): void {
    this.sportService.listeGenres().
    subscribe(gn => {console.log(gn);
    this.genres = gn._embedded.genres;
    }
    );
    this.sportService.consulterSport(this.activatedRoute.snapshot.params['id']).
    subscribe( spt =>{ this.currentSport = spt;
    this.updatedGnId = this.currentSport.genre.idG;
    } ) ;
    }
  updateSport() {
    this.currentSport.genre = this.genres.
      find(gn => gn.idG == this.updatedGnId)!;
    this.sportService.updateSport(this.currentSport).subscribe(spt => {
      this.router.navigate(['sports']);
    }
    );

  }

}
