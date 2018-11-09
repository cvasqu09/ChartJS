import { Playlist } from '../playlists/playlist.model';
import { Observable } from 'rxjs';

export interface IPlaylistService {
  getPlaylists();

  getPlaylistTracks();

  editSelectedPlaylist(newPlaylist: Playlist): void;

  playlistObs(): Observable<Playlist>;
}
