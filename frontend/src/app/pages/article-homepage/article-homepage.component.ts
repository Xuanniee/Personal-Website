import { Component } from "@angular/core";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";

@Component({
  selector: "app-article-homepage",
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: "./article-homepage.component.html",
  styleUrl: "./article-homepage.component.css",
})
export class ArticleHomepageComponent {}
