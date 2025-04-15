import { Component } from '@angular/core';
import { ApisService } from '../apis.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name: string = '';
  audioSrc: string | null = null;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private songService: ApisService) { }

  playSong() {
    const trimmedName = this.name.trim();
    if (!trimmedName) {
      this.errorMessage = 'Please enter a name.';
      return;
    }

    this.loading = true;
    this.audioSrc = null;
    this.errorMessage = '';

    this.songService.getBirthdaySong(trimmedName)
      .pipe(take(1))
      .subscribe({
        next: (blob) => {
          this.audioSrc = URL.createObjectURL(blob);
          this.errorMessage = '';
          this.loading = false;
        },
        error: () => {
          this.audioSrc = null;
          this.errorMessage = 'Sorry, no birthday song found for this name.';
          this.loading = false;
        }
      });
  }
  onNameChange(): void {
    this.audioSrc = null;
    this.errorMessage = '';
  }
  
}
