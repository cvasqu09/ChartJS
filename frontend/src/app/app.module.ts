import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatToolbar, MatToolbarModule, MatListModule, MatDividerModule, MatIconModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SongsComponent } from './songs/songs.component';
import { CookieService } from 'ngx-cookie-service';
import { PlaylistComponent } from './playlists/playlist/playlist.component';
import { ArtistComponent } from './artist/artist.component';
import { playlistServiceProvider } from './services/playlist.provider';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'playlists', component: PlaylistsComponent },
  // { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: '**', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaylistsComponent,
    SongsComponent,
    PlaylistComponent,
    ArtistComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes),
  ],
  providers: [LoginService, CookieService, playlistServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
