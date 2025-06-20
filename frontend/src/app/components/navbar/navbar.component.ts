import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    // Navbar is initially closed
    navbarOpen = false;

    // Function to show or hide the navbar
    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }
  
}
