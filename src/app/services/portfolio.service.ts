import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ContactRequest, ApiResponse } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendContactMessage(request: ContactRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/contact`, request);
  }

  checkHealth(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/health`);
  }
}
