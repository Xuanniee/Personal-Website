import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { Internship } from "./internship.model";

@Injectable({
  providedIn: "root",
})
export class InternshipsService {
  constructor(private http: HttpClient) {}
  private internshipUrl = `${environment.backendUrl}/internships`;

  retrieveInternships(): Observable<Internship[]> {
    return this.http.get<Internship[]>(this.internshipUrl);
  }

  getInternship(id: number): Observable<Internship> {
    return this.http.get<Internship>(`${this.internshipUrl}/${id}`);
  }
}
