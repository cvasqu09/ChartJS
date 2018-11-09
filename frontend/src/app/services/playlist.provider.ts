import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { IPlaylistService } from './playlist.interface';
import { PlaylistService } from './playlist.service';
import { Token } from '@angular/compiler';
import { environment } from '../../environments/environment';

// const playlistServiceFactory = (http: HttpClient, tokenService: TokenService, isProduction: boolean) => {
//   if (isProduction) {
//     return new PlaylistService(http, tokenService);
//   } else {
//     return new MockPlaylistService();
//   }
// };
