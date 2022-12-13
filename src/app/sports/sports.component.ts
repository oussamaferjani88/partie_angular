import { Component, OnInit } from '@angular/core';
import { Sport } from '../model/sport.model';
import { AuthService } from '../services/auth.service';
import { SportService } from '../services/sport.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
 
})
export class SportsComponent implements OnInit {

  sports? : Sport[];
  constructor( private sportService : SportService , public authService : AuthService) { }

  ngOnInit(): void {
    this.chargerSports();
  }




  chargerSports(){
    this.sportService.listeSports().subscribe(spt =>{
      console.log(spt);
      this.sports = spt;
  
  
     });
  }

  supprimerSport(s: Sport)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.sportService.supprimerSport(s.idSport).subscribe(() => {
  console.log("sport supprimé");
  this.chargerSports();
  });
  }



}
