import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../playlist.model';
import { PlaylistService } from '../../services/playlist.service';
import { Artist } from '../../artist/artist.model';
import Song from '../../songs/song.model';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input()
  playlist: Playlist = null;
  songs: Song[] = [];
  artists: Artist[] = [];

  constructor(
    private playlistService: PlaylistService,
    private artistService: ArtistService
  ) {}

  ngOnInit() {
    this.playlistService
      .getPlaylistTracks(this.playlist.getTracksUrl())
      .subscribe(response => {
        const items = response.items;

        console.log(JSON.stringify(items));

        items.forEach(item => {
          const artist = item.track.artists[0];
          this.songs.push(new Song(item.track.name, artist.href));
        });
        console.log(JSON.stringify(this.songs));

        this.songs.forEach(song => {
          this.artistService
            .getArtist(song.getArtistUrl())
            .subscribe((artist: any) => {
              this.artists.push(
                new Artist(artist.name, artist.href, artist.genres)
              );
            });
        });
      });
  }
}
