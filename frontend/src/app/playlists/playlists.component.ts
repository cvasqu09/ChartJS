import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/abstract-playlist.service';
import { Playlist } from './playlist.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  playlistSelected = false;
  selectedPlaylist: Playlist = null;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.playlistService
      .getPlaylists()
      .pipe(
        map((playlist: any) => {
          return new Playlist(playlist.name, playlist.tracks, playlist.images[0].url);
        })
      )
      .subscribe((playlist: Playlist) => {
        this.playlists.push(playlist);
      });
  }

  onEnter(playlistIndex: number): void {
    console.log(this.playlists[playlistIndex]);
    this.selectedPlaylist = this.playlists[playlistIndex];
    this.playlistService.editSelectedPlaylist(this.selectedPlaylist);
    this.playlistSelected = true;
  }
}
