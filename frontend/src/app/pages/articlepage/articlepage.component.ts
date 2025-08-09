import { Component } from "@angular/core";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";

@Component({
  selector: "app-articlepage",
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: "./articlepage.component.html",
  styleUrl: "./articlepage.component.css",
})
export class ArticlepageComponent {}
