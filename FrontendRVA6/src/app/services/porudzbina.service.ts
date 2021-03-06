import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Porudzbina } from '../models/porudzbina';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {

  // End Point u Development mode-u
  // private readonly API_URL = 'http://localhost:8083/porudzbina/';

  // End Point u Deployment mode-u
  private readonly API_URL = 'https://backend-rva.herokuapp.com/porudzbina/';

  dataChange: BehaviorSubject<Porudzbina[]> = new BehaviorSubject<Porudzbina[]>([]);

  constructor(private httpClient: HttpClient) { }
  public getAllPorudzbina(): Observable<Porudzbina[]> {
      this.httpClient.get<Porudzbina[]>(this.API_URL).subscribe(data => {
          this.dataChange.next(data);
      },
          (error: HttpErrorResponse) => {
              console.log(error.name + ' ' + error.message);
          });
      return this.dataChange.asObservable();
  }
  public addPorudzbina(porudzbina: Porudzbina): void {
      this.httpClient.post(this.API_URL, porudzbina).subscribe();
  }
  public updatePorudzbina(porudzbina: Porudzbina): void {
      this.httpClient.put(this.API_URL, porudzbina).subscribe();
  }
  public deletePorudzbina(id: number): void {
      this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
