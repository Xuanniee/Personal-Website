import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
    // readonly makes properties immutable
    private readonly githubBaseUrl = "https://api.github.com";
    private readonly colorsUrl = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';
    // unique identifying for storing and retrieving data
    private readonly cacheKey = "githubRepoCache";
    // Setting a duration so that the cached data will be updated
    private readonly cacheDuration = 30 * 60 * 1000; // 30mins

    constructor(private http: HttpClient) {}

    // Check if a browser exists before we attempt to use localStorage
    private isBrowser(): boolean {
        return typeof window !== 'undefined';
    }

    // Function that retrieves cached data based on a time limit
    private getCachedData(key: string): any {
        if (this.isBrowser()) {
            // Retrieve the cached data
            const cached = localStorage.getItem(key);

            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                
                // Determine how much time has passed since the data has been cached
                const age = new Date().getTime() - timestamp;
                if (age < this.cacheDuration) {
                    return JSON.parse(data);
                }
            }
        }
        return null;
    }

    // Function that caches data and the current time
    private cacheData(key: string, data: any): void {
        if (this.isBrowser()) {
            const currTimestamp = new Date().getTime();

            // Cache the data and current time
            localStorage.setItem(key, JSON.stringify({ data, currTimestamp }));
        }

    }
    
    /**
    * Retrieves Github Repo Information
    * 
    * Service makes HTTP requests using this.http.
    * Every HTTP request returns an RxJS Observable; when subscribed, it sends the request and emits the results when the server responds.
    * @param user GitHub username
    * @param repoName Repository name
    * @returns Observable with repository data
    */
    getGithubRepoData(username: string, repoName: string): Observable<any> {
        // Modify Base URL
        const githubApiUrl = `${this.githubBaseUrl}/repos/${username}/${repoName}`;
        const cacheKey = `${this.cacheKey}-${username}-${repoName}`;

        // See if we have valid cache within 30 mins
        const cachedData = this.getCachedData(cacheKey);
        if (cachedData) {
            return of(cachedData);
        }
    
        // Make the API call
        return this.http.get<any>(githubApiUrl).pipe(
            map(data => {
                // Cache the response data
                if (this.isBrowser()) {
                    this.cacheData(cacheKey, data);
                    return data;
                }
            }),
            catchError(error => {
                // Handle errors here
                console.error('Error fetching repo data', error);
                return of(null); // Return null on error
            })
        );
    }
    

    /**
     * Retrieves colors for various programming languages
     * @returns Dict of Colors for Various Coding Langs
     */
    getGithubColors(): Observable<any> {
        return this.http.get<any>(this.colorsUrl);
    }

    /**
     * Retrieves the list of all the public repos under this's user Github profile.
     * Check for cached data from local storage before making the API call, then cache API responses if cache data does not exist
     * 
     * @param username a string of the user's Github username
     */
    getPublicRepoList(username: string): Observable<any[]> {
        const cacheKey = this.cacheKey;

        // Use the function to see if we have a valid cache, hasnt expired
        const cachedData = this.getCachedData(cacheKey);
        if (cachedData) {
            return of(cachedData);
        }

        // if (this.isBrowser()) {
        //     // Check if this data is available locally
        //     const cachedData = localStorage.getItem(this.cacheKey);
        //     if (cachedData) {
        //         // Return the Cached Data to reduce API Calls
        //         // of is an operator used to create an Observable that emits the values provided to it
        //         // parse is required to convert a JSON string back to a JSON object after retrieving from storage
        //         return of(JSON.parse(cachedData));
        //     }
        // }

        // Set up the URL & Make the API Call
        const githubApiUrl = `${this.githubBaseUrl}/users/${username}/repos`;
        
        // Make the API call and filter the results
        return this.http.get<any[]>(githubApiUrl).pipe(
            map(repos => {
                // Filter the repos to accept only those with a description
                const filteredRepos = repos.filter(repo => repo.description !== null);
                // Cache the response using the key and converting it to a string for storage
                this.cacheData(cacheKey, filteredRepos);
                return filteredRepos;
            }),
            catchError(error => {
                // Handle errors here
                console.error('Error fetching repo list', error);
                return of([]); // Return empty array on error
            })
        );
    }
  
}
