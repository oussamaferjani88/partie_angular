import { Injectable } from '@angular/core';
import { Genre } from '../model/genre.model';
import { Sport } from '../model/sport.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/genreWrapped.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class SportService {
  sports! : Sport[]; //un tableau de Sport
  apiURL: string = 'http://localhost:8080/sports/api';
  apiURLGN: string = 'http://localhost:8080/sports/gn';


   constructor(private http : HttpClient) {}  
   
  listeSports() : Observable<Sport[]>
  {
    return this.http.get<Sport[]>(this.apiURL);
  }

  ajouterSport (spt  : Sport):Observable<Sport>
  {
     return this.http.post<Sport>(this.apiURL, spt , httpOptions);
  }

  supprimerSport (id : number){
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }


  consulterSport(id: number): Observable<Sport> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Sport>(url);
    }







  updateSport ( spt : Sport) : Observable<Sport>
  {
    return this.http.put<Sport>(this.apiURL, spt, httpOptions);

  }


  triersports(){
    this.sports = this.sports.sort((n1,n2) => {
    if (n1.idSport! > n2.idSport!) {
    return 1;
    }
    if (n1.idSport! < n2.idSport!) {
    return -1;
    }
    return 0;
    });
    }



  listeGenres():Observable<GenreWrapper>{
  return this.http.get<GenreWrapper>(this.apiURLGN);
  }



  rechercherParGenre(idG: number):Observable< Sport[]> {
    const url = `${this.apiURL}/sptgn/${idG}`;
    return this.http.get<Sport[]>(url);
    }


    rechercherParNom(nom: string):Observable< Sport[]> {
      const url = `${this.apiURL}/sptsByName/${nom}`;
      return this.http.get<Sport[]>(url);
      }


      ajouterGenre(gn : Genre):Observable<Genre>{
        return this.http.post<Genre>(this.apiURLGN, gn, httpOptions);
        }
}
