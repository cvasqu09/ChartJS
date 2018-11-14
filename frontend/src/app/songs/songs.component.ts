import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';
import { Playlist } from '../playlists/playlist.model';
import { mergeMap, map, concatAll } from 'rxjs/operators';
import Song from './song.model';
import { PlaylistService } from '../services/abstract-playlist.service';
import { SpotifyPlaylistService } from '../services/spotify-playlist.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  isChartDataAvailable = false;
  data = new Array<number>(10);

  labels = [
    '0-9',
    '10-19',
    '20-29',
    '30-39',
    '40-49',
    '50-59',
    '60-69',
    '70-79',
    '80-89',
    '90-99'
  ];

  songs: Song[] = [];

  constructor(private spotifyPlaylistService: SpotifyPlaylistService) {}

  ngOnInit() {
    this.isChartDataAvailable = false;
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

    this.spotifyPlaylistService.getStaticSongs().subscribe(song => {
      this.songs.push(song);
    });
  }

  onClick() {
    this.calculatePopularityData();
    this.isChartDataAvailable = true;
  }

  private calculatePopularityData() {
    this.songs
      .map(song => {
        return this.getPopularityIndex(song.getPopularity());
      })
      .forEach((popularityIndex: number) => {
        if (!this.data[popularityIndex]) {
          this.data[popularityIndex] = 1;
        } else {
          this.data[popularityIndex]++;
        }
      });
  }

  private getPopularityIndex(songPopularity: number): number {
    if (songPopularity < 100) {
      return songPopularity % 10;
    } else {
      return 9;
    }
  }
}
