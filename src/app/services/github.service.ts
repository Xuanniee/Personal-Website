import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
    private githubBaseUrl = "https://api.github.com";
    private colorsUrl = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';

    constructor(private http: HttpClient) {}
    
    /**
    * Retrieves Github Repo Information
    * 
    * Service makes HTTP requests using this.http.
    * Every HTTP request returns an RxJS Observable; when subscribed, it sends the request and emits the results when the server responds.
    * @param user GitHub username
    * @param repoName Repository name
    * @returns Observable with repository data
    */
    getGithubRepoData(user: string, repoName: string): Observable<any> {
        // Modify Base URL
        const githubApiUrl = `${this.githubBaseUrl}/repos/${user}/${repoName}`;
        return this.http.get<any>(githubApiUrl);
    }

    /**
     * Retrieves colors for various programming languages
     * @returns Dict of Colors for Various Coding Langs
     */
    getGithubColors(): Observable<any> {
        return this.http.get<any>(this.colorsUrl);
    }
  
}
