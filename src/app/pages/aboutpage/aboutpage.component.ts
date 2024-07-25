import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-aboutpage',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './aboutpage.component.html',
  styleUrl: './aboutpage.component.css'
})
export class AboutpageComponent {

}
