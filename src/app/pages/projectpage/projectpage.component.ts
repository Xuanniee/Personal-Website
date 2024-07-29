import { Component } from '@angular/core';

import { ProjectcardComponent } from 'src/app/components/projectcard/projectcard.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-projectpage',
  standalone: true,
  imports: [ProjectcardComponent, NavbarComponent],
  templateUrl: './projectpage.component.html',
  styleUrl: './projectpage.component.css'
})
export class ProjectpageComponent {

}
