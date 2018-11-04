export class Playlist {
  constructor(private name: string, private tracks: {href: string, total: string}, private imageUrl: string) {}

  public getName() {
    return this.name;
  }

  public getTracksUrl(): string {
    return this.tracks.href;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

}
