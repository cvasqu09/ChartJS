import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { PlaylistService } from './abstract-playlist.service';
import { Token } from '@angular/compiler';
import { environment } from '../../environments/environment';
import { SpotifyPlaylistService } from './spotify-playlist.service';
import { MockPlaylistService } from './mock-playlist.service';

const playlistServiceFactory = (http: HttpClient, tokenService: TokenService, isProduction: boolean) => {
  if (isProduction) {
    return new SpotifyPlaylistService(http, tokenService);
  } else {
    return new MockPlaylistService(http, tokenService);
  }
};

export const playlistServiceProvider = {
  provide: PlaylistService,
  useFactory: playlistServiceFactory,
  deps: [HttpClient, TokenService]
};
