import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProjectcardComponent } from "src/app/components/projectcard/projectcard.component";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { GithubService } from "src/app/services/github.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-projectpage",
  standalone: true,
  imports: [ProjectcardComponent, NavbarComponent, CommonModule],
  templateUrl: "./projectpage.component.html",
  styleUrl: "./projectpage.component.css",
})
export class ProjectpageComponent implements OnInit {
  // OnInit is an interface used to perform initialisation tasks
  // Data Variables to track the API Calls
  repoListData: any[] = [];
  githubColors: any;
  private githubUsername: string = environment.githubUsername;

  // Inject the Github DataService to get our repos
  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    // Retrieve colors here first to prevent multiple API calls with each repo card
    this.fetchGithubColors();
    this.fetchAllRepositoriesData();
  }

  fetchGithubColors(): void {
    this.githubService.getGithubColors().subscribe({
      next: (colors) => {
        this.githubColors = colors;
      },
      error: (error) => {
        console.error("Error fetching colors:", error);
      },
      complete: () => {
        console.log("Github colors fetched.");
      },
    });
  }

  fetchAllRepositoriesData(): void {
    // Retrieve the list of relevant public repos
    this.githubService.getPublicRepoList(this.githubUsername).subscribe({
      next: (repoListData) => {
        this.repoListData = repoListData;
        console.log(this.repoListData);
      },
      error: (error) => {
        console.error(
          "Error in fetching Repositories for Project Page: ",
          error
        );
      },
      complete: () => {
        console.log("Repositories fetched for Project Page.");
      },
    });
  }
}
