import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
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

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.getPlaylists().subscribe((playlists: Playlist[]) => {
      playlists.forEach((playlist: any) => {
        this.playlists.push(new Playlist(playlist.name, playlist.tracks, playlist.images[0].url));
      });
    });
  }

  onEnter(playlistIndex: number): void {
    console.log(this.playlists[playlistIndex]);
    this.selectedPlaylist = this.playlists[playlistIndex];
    this.playlistSelected = true;
  }
}
