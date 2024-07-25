import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutpageComponent } from './pages/aboutpage/aboutpage.component';
import { ProjectpageComponent } from './pages/projectpage/projectpage.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomepageComponent
    },
    {
        path: "about",
        component: AboutpageComponent
    },
    {
        path: "projects",
        component: ProjectpageComponent
    }
];
