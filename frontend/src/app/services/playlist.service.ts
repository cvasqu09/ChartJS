import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Playlist } from '../playlists/playlist.model';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getPlaylists() {
    const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.tokenService.getToken());

    return this.http.get(environment.SPOTIFY_BASE_WEB_API + '/v1/me/playlists', { headers: headers })
      .pipe(
        map((res: any) => {
          return res.items;
        }
      ));
  }
}
