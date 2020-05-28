import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StavkaPorudzbine } from '../models/stavkaPorudzbine';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  // End Point u Development mode-u
  // private readonly API_URL = 'http://localhost:8083/stavkaPorudzbine/';
  // private readonly API_URL_BYID = 'http://localhost:8083/stavkeZaPorudzbinaId/';

  // End Point u Deployment mode-u
  private readonly API_URL = 'https://backend-rva.herokuapp.com/stavkaPorudzbine/';
  private readonly API_URL_BYID = 'https://backend-rva.herokuapp.com/stavkeZaPorudzbinaId/';

  dataChange: BehaviorSubject<StavkaPorudzbine[]> = new BehaviorSubject<StavkaPorudzbine[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaPorudzbinu(idPorudzbine: number): Observable<StavkaPorudzbine[]> {
    this.httpClient.get<StavkaPorudzbine[]>(this.API_URL_BYID + idPorudzbine).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
    return this.dataChange.asObservable();
  }

  public addStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): void {
    this.httpClient.post(this.API_URL, stavkaPorudzbine).subscribe();
  }

  public updateStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): void {
    this.httpClient.put(this.API_URL, stavkaPorudzbine).subscribe();
  }

  public deleteStavkaPorudzbine(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
