import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newReleases: any[] = [];

  loading = false;
  error = false;
  messageError!: string;

  constructor(
    private http: HttpClient,
    private spotifyService: SpotifyService
  ) {
    this.getNewReleases();
  }

  getNewReleases() {
    this.loading = true;
    this.error = false;
    this.spotifyService.getNewReleases().subscribe((response: any) => {
      this.newReleases = response;
      this.error = false;
      this.loading = false;
    }, (error) => {
      if(error.status === 401) {
        this.spotifyService.getToken();
        this.getNewReleases();
      }
      
      this.loading = false;
      this.error = true;
      this.messageError = error.error.error.message;
      
    });
  }

  ngOnInit(): void {
    //  this.getToken()
  }
 
}
