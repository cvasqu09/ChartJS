import { Artist } from '../artist/artist.model';

export default class Song {
  constructor(private name: string, private artistUrl: string) {}

  public getName(): string {
    return this.name;
  }

  public getArtistUrl(): string {
    return this.artistUrl;
  }
}
