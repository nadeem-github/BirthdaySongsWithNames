import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private readonly baseUrl = 'http://localhost:8002';

  constructor(private http: HttpClient) {}

  getBirthdaySong(name: string): Observable<Blob> {
    const url = `${this.baseUrl}/song/${encodeURIComponent(name.toLowerCase())}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Error fetching song. Please try again.'));
  }

}
