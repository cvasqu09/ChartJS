import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { Playlist } from '../playlists/playlist.model';
import { mergeMap, map, concatAll } from 'rxjs/operators';
import Song from './song.model';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songs: Song[] = [];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    // this.playlistService.getPlaylists().pipe(
    //   map((playlist: any) => {
    //     return new Playlist(playlist.name, playlist.tracks, playlist.images[0].url);
    //   }),
    //   mergeMap((playlist: Playlist) => {
    //     return this.playlistService.getPlaylistTracks(playlist.getTracksUrl());
    //   }),
    //   map(track => {
    //     return new Song(track.track.name, track.track.artists[0].href, track.track.popularity);
    //   })
    // )
    // .subscribe((song: Song) => {
    //   this.songs.push(song);
    //   console.log(JSON.stringify(song));
    // });

    this.playlistService.getStaticSongs().subscribe(song => {
      this.songs.push(song);
    });
  }

  onClick() {
    debugger;
  }

}
