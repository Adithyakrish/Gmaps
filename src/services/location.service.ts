import { Injectable } from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  updateDriverLocation(data: any) {
    const json = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    };
    const url = 'https://road-runner-crud-7zjtqk6yoq-el.a.run.app?operation=UPDATE&collection=vehicles';
    return this.http.post(url , json, httpOptions)
  }
}

