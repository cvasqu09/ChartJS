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
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator } from '@angular/material';

interface ArtistSong {
  artist: Artist;
  song: Song;
}

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  songs: Song[] = [];
  artists: Artist[] = [];

  // Mat Table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columns: string[] = ['artist', 'song'];
  dataSource: MatTableDataSource<ArtistSong>;

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
      this.resetChart();
      this.selectedPlaylist = playlist;
      this.playlistService
        .getPlaylistTracks(this.selectedPlaylist.getTracksUrl())
        .pipe(
          map(returnedTrack => {
            const artist = returnedTrack.track.artists[0];
            this.songs.push(new Song(returnedTrack.track.name, artist.href, returnedTrack.track.popularity));
            return returnedTrack;
          }),
          mergeMap((returnedTrack: any) => {
            return this.artistService.getArtist(returnedTrack.track.artists[0].href);
          })
        )
        .subscribe((artist: any) => {
          const newArtist = new Artist(artist.name, artist.href, artist.genres);
          newArtist.getGenres().forEach((genre: string) => {
            this.updateGenreCount(genre);
          });
          this.artists.push(newArtist);

          const artistSongs: ArtistSong[] = this.artists.map((v, i) => {
            return {artist: v, song: this.songs[i]};
          });

          this.dataSource = new MatTableDataSource<ArtistSong>(artistSongs);
          this.dataSource.paginator = this.paginator;
        });
    });
  }

  onBreakdown(): void {
    this.setChartOptions();
  }

  onCloseChart(): void {
    this.selectedPlaylist = null;
    this.resetChart();
  }

  private setChartOptions(): void {
    this.doughnutChartLabels = Object.keys(this.genreCount);
    this.doughnutChartData = Object.values(this.genreCount);
    this.isChartDataPopulated = true;
  }

  private updateGenreCount(genre: string): void {
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

  private resetChart() {
    this.isChartDataPopulated = false;
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];
    this.artists = [];
    this.songs = [];
    this.genreCount = {};
  }
}
