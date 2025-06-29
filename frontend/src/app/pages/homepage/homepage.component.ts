import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { forkJoin } from "rxjs";

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ProjectcardComponent } from "src/app/components/projectcard/projectcard.component";
import { GithubService } from "src/app/services/github.service";
import { InternshipsService } from "src/app/services/internship/internships.service";
import { Internship } from "src/app/services/internship/internship.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-homepage",
  standalone: true,
  imports: [NavbarComponent, ProjectcardComponent, CommonModule, RouterLink],
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.css",
})
export class HomepageComponent implements OnInit {
  // Cannot be private cos im importing and using them in the html
  internships: Internship[] = [];
  repositoriesData: any[] = [];
  githubColors: any;
  // Private variable that stores all my internships after being retrieved from Backend
  private githubUsername: string = environment.githubUsername;

  // Inject the Github DataService to get our repos
  constructor(
    private githubService: GithubService,
    private internshipService: InternshipsService
  ) {}

  ngOnInit(): void {
    // Parallel API Calls
    this.fetchGithubColors();
    this.fetchPinnedInternships();
    this.fetchPinnedRepositories(["Bus-Express", "Finance", "PandaPlay"]);
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

  /**
   * Currently fetches all the internships as I only have a few. But once I have more,
   * only fetch at most 3
   */
  fetchPinnedInternships(): void {
    // Retrieve all the internships from the DB
    this.internshipService.retrieveInternships().subscribe({
      next: (internships) => {
        this.internships = internships;
      },
      error: (error) => {
        console.error("Error fetching internships:", error);
      },
      complete: () => {
        console.log("Internship fetch completed!");
      },
    });
  }

  /**
   * Retrieves the repositories I would like to display for homepage
   *
   * @param repositoryNames string[]
   */
  fetchPinnedRepositories(repositoryNames: string[]): void {
    const repoRequests = repositoryNames.map((repositoryName) =>
      this.githubService.getSpecificRepositoryData(
        this.githubUsername,
        repositoryName
      )
    );

    forkJoin(repoRequests).subscribe({
      next: (responses) => {
        this.repositoriesData = responses;
      },
      error: (error) => {
        console.error("Error: ", error);
      },
      complete: () => {
        console.log("Fetched all pinned Repos...");
      },
    });
  }
}
