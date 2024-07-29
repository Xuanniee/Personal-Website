import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-projectcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projectcard.component.html',
  styleUrl: './projectcard.component.css'
})
export class ProjectcardComponent implements OnInit {
    // State Var to store repo data 
    repoData: any;
    repoCreatedYear: string = '';
    repoUpdatedYear: string = ''
    githubColors: any;

    // Inject the Github DataService
    constructor(private githubService: GithubService) {}

    // Helper function to extract date
    extractDateYear(date: Date) {
        // Extract the Datestamp from the RepoData and extract only the year
        const createdDate = new Date(date);
        
        return createdDate.getFullYear().toString();
    }

    ngOnInit(): void {
        // Fetch colors and repo data
        this.githubService.getGithubColors().subscribe(
            colors => {
            this.githubColors = colors;
            this.fetchRepoData(); // Fetch repo data after colors are loaded
            },
            error => console.error('Error fetching colors:', error)
        );
    }

    fetchRepoData(): void {
        // Subscribe to the Observer
        this.githubService.getGithubRepoData(
            "Xuanniee",
            "Bus-Express"
        ).subscribe(
            repoData => {
                this.repoData = repoData;
                this.repoCreatedYear = this.extractDateYear(repoData.created_at)
                this.repoUpdatedYear = this.extractDateYear(repoData.updated_at)
                console.log(this.repoData);
            },
            error => console.error('Error: ', error)
        );
    }
}
