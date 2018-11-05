import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Playlist } from '../playlist.model';
import { PlaylistService } from '../../services/playlist.service';
import { Artist } from '../../artist/artist.model';
import Song from '../../songs/song.model';
import { ArtistService } from '../../services/artist.service';
import { Chart } from 'chart.js';

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
  genreChart: Chart = null;
  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  constructor(
    private playlistService: PlaylistService,
    private artistService: ArtistService,
    private elementRef: ElementRef
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

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
