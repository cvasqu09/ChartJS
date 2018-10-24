import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatToolbar, MatToolbarModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { PlaylistsComponent } from './playlists/playlists.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: '', pathMatch: 'full', redirectTo: '/songs'},
  { path: '**', component: PlaylistsComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaylistsComponent,
    SongsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
