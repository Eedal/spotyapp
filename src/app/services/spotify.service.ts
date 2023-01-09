import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const token = localStorage.getItem('token')

    if(!token) {
      this.getToken();
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token} `,
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases').pipe(
      map((response: any) => response.albums.items)
    );
  }

  getArtists(term: string) {
    return this.getQuery(`search?q=${term}&type=artist`).pipe(
      map((response: any) => response.artists.items)
    );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => data['tracks'])
    );
  }

  getToken() {
    const clientId = 'a6fb547fe64a40f297909f1661f00a1b';
    const clientSecret = '7847e973f31d4a369f77e39d9e2abe2e';
    const body = new HttpParams()
      .append('grant_type', 'client_credentials')
      .append('client_id', clientId)
      .append('client_secret', clientSecret);
    return this.http
      .post('https://accounts.spotify.com/api/token', body)
      .toPromise()
      .then(
        (token: any) => {
          localStorage.setItem('token',  token['access_token']);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
}
