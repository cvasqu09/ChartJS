export class Artist {
  constructor(private name: string, private artistUrl: string, private genres: []) {}

  public getName(): string {
    return this.name;
  }

  public getArtistUrl(): string {
    return this.artistUrl;
  }

  public getGenres(): [] {
    return this.genres;
  }
}
