import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { PlaylistService } from './abstract-playlist.service';
import { SpotifyPlaylistService } from './spotify-playlist.service';
import { MockPlaylistService } from './mock-playlist.service';
import { EnvironmentService } from './environment.service';

const playlistServiceFactory = (http: HttpClient, tokenService: TokenService, environmentService: EnvironmentService) => {
  const environment = environmentService.getEnvironment();
  if (environment.production) {
    return new SpotifyPlaylistService(http, tokenService);
  } else {
    return new MockPlaylistService(http, tokenService);
  }
};

export let playlistServiceProvider = {
  provide: PlaylistService,
  useFactory: playlistServiceFactory,
  deps: [HttpClient, TokenService, EnvironmentService]
};
