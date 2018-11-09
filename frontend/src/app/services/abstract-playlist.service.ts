import { Playlist } from '../playlists/playlist.model';
import { Observable } from 'rxjs';

export abstract class PlaylistService {
  abstract getPlaylists();

  abstract getPlaylistTracks(tracksUrl: string);

  abstract editSelectedPlaylist(newPlaylist: Playlist);

  abstract getPlaylistObs();
}
