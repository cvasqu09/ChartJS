import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../artist/artist.model';
import { TokenService } from './token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.tokenService.getToken());

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getArtist(artistUrl) {
    return this.http.get(artistUrl, {headers: this.headers});
  }
}
