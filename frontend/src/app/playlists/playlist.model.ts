export class Playlist {
  constructor(public name: string, public tracks: {href: string, total: string}, public imageUrl: string) {}
}
