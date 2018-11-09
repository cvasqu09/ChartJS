import { Artist } from '../artist/artist.model';

export default class Song {
  constructor(private name: string, private artistUrl: string, private popularity: number) {}

  public getName(): string {
    return this.name;
  }

  public getArtistUrl(): string {
    return this.artistUrl;
  }

  public getPopularity(): number {
    return this.popularity;
  }
}
