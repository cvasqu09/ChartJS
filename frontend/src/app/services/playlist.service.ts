import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { Playlist } from '../playlists/playlist.model';
import { Observable, BehaviorSubject, from } from 'rxjs';

import { map, concatAll, mergeAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlistSubject: BehaviorSubject<Playlist> = new BehaviorSubject<Playlist>(null);
  private playlist$: Observable<Playlist> = this.playlistSubject.asObservable();

  headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.tokenService.getToken());

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getPlaylists() {
    return this.http.get(environment.SPOTIFY_BASE_WEB_API + '/v1/me/playlists', { headers: this.headers })
      .pipe(
        map((res: any) => {
          const items = res.items;
          return items;
        }),
        concatAll()
      );
  }

  getPlaylistTracks(tracksUrl: string): Observable<any> {
    return this.http.get(tracksUrl, { headers: this.headers }).pipe(
      map((response: any) => response.items),
      concatAll()
    );
  }

  editSelectedPlaylist(newPlaylist: Playlist): void {
    this.playlistSubject.next(newPlaylist);
  }

  playlistObs(): Observable<Playlist> {
    return this.playlist$;
  }
}
