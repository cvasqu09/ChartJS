import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { PlaylistService } from './abstract-playlist.service';
import { environment } from '../../environments/environment';
import { concatAll, map } from 'rxjs/operators';
import { Playlist } from '../playlists/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class MockPlaylistService extends PlaylistService {
  constructor(private http: HttpClient, private tokenSerivce: TokenService) {
    super();
  }

  getPlaylists() {
    return this.http.get(environment.MOCK_WEB_API).pipe(
      map((response: any) => {
        return response.items;
      }),
      concatAll()
    );
  }

  getPlaylistTracks(tracksUrl: string) {}

  editSelectedPlaylist(newPlaylist: Playlist) {}

  getPlaylistObs() {}
}
