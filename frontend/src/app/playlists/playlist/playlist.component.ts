import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  AfterContentInit,
  OnChanges
} from '@angular/core';
import { Playlist } from '../playlist.model';
import { PlaylistService } from '../../services/playlist.service';
import { Artist } from '../../artist/artist.model';
import Song from '../../songs/song.model';
import { ArtistService } from '../../services/artist.service';
import { Chart } from 'chart.js';
import { of, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnChanges {
  songs: Song[] = [];
  artists: Artist[] = [];
  genreChart: Chart = null;
  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  isChartDataPopulated = false;
  selectedPlaylist: Playlist;

  public genreCount = {};

  constructor(
    private playlistService: PlaylistService,
    private artistService: ArtistService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.playlistService.playlistObs().subscribe((playlist: Playlist) => {
      this.isChartDataPopulated = false;
      this.doughnutChartLabels = [];
      this.doughnutChartData = [];
      this.genreCount = {};

      this.selectedPlaylist = playlist;

      this.playlistService.getPlaylistTracks(this.selectedPlaylist.getTracksUrl())
        .subscribe(items => {
          items.forEach(item => {
            const artist = item.track.artists[0];
            this.songs.push(new Song(item.track.name, artist.href));
            return this.artistService
              .getArtist(artist.href)
              .subscribe((result: any) => {
                const newArtist = new Artist(
                  result.name,
                  result.href,
                  result.genres
                );
                newArtist.getGenres().forEach((genre: string) => {
                  if (!this.genreCount[genre]) {
                    this.genreCount[genre] = 1;
                  } else {
                    this.genreCount[genre]++;
                  }
                });
                this.artists.push(newArtist);
              });
          });
        });
    });
  }

  onBreakdown(): void {
    this.setChartOptions();
  }

  private setChartOptions(): void {
    console.log(this.artists);
    this.doughnutChartLabels = Object.keys(this.genreCount);
    this.doughnutChartData = Object.values(this.genreCount);
    this.isChartDataPopulated = true;
  }

  private countGenre(genre: string): void {
    if (!this.genreCount[genre]) {
      this.genreCount[genre] = 1;
    } else {
      this.genreCount[genre]++;
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
