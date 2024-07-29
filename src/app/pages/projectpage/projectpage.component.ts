import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectcardComponent } from 'src/app/components/projectcard/projectcard.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-projectpage',
  standalone: true,
  imports: [ProjectcardComponent, NavbarComponent, CommonModule],
  templateUrl: './projectpage.component.html',
  styleUrl: './projectpage.component.css'
})
export class ProjectpageComponent implements OnInit {
    // OnInit is an interface used to perform initialisation tasks
    // Data Variables to track the API Calls
    repoListData: any[] = [];
    githubColors: any;

    // Inject the Github DataService to get our repos
    constructor(private githubService: GithubService) {}

    ngOnInit(): void {
        // Retrieve colors here first to prevent multiple API calls with each repo card
        this.githubService.getGithubColors().subscribe(
            colors => {
                this.githubColors = colors;
                this.fetchRepoData();
            },
            error => console.error('Error fetching colors:', error)
        );
    }

    fetchRepoData(): void {
        // Retrieve the list of relevant public repos
        this.githubService.getPublicRepoList(
            "Xuanniee"
        ).subscribe(
            repoListData => {
                this.repoListData = repoListData;
                console.log(this.repoListData);
            },
            error => console.error('Error: ', error)
        );
    }
}
