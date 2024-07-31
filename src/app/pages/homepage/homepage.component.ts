import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProjectcardComponent } from 'src/app/components/projectcard/projectcard.component';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavbarComponent, ProjectcardComponent, CommonModule, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
    repoData: any[] = [];
    githubColors: any;

    // Inject the Github DataService to get our repos
    constructor(private githubService: GithubService) {}

    ngOnInit(): void {
        // Retrieve colors here first to prevent multiple API calls with each repo card
        this.githubService.getGithubColors().subscribe(
            colors => {
                this.githubColors = colors;
                this.fetchPinnedRepos(["Bus-Express", "Finance", "Network-Django", "PandaPlay"]); // Update with your repo names
            },
            error => console.error('Error fetching colors:', error)
        );
    }

    fetchPinnedRepos(repos: string[]): void {
        const repoRequests = repos.map(repo => 
            this.githubService.getGithubRepoData("Xuanniee", repo)
        );

        forkJoin(repoRequests).subscribe(
            (responses) => {
                console.log('API Responses:', responses); // Log the raw responses
                this.repoData = responses;
                console.log(this.repoData);
            },
            error => console.error('Error: ', error)
        );
    }
}
