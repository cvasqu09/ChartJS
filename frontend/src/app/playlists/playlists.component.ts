import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from './playlist.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.getPlaylists().subscribe((playlists: []) => {
      playlists.forEach(playlist => {
        this.playlists.push(new Playlist(playlist.name, playlist.tracks, playlist.images[0].url));
      });
    });
  }
}
