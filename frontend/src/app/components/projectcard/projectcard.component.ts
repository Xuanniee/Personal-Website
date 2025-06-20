import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// Required for Angular directives like ngIf
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projectcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projectcard.component.html',
  styleUrl: './projectcard.component.css'
})
export class ProjectcardComponent {
    // Receive data from the Page via @Input() property
    @Input() repoData: any;
    @Input() githubColors: any;

    // Empty Strings while waiting for data
    repoCreatedYear: string = '';
    repoUpdatedYear: string = ''

    constructor() {}

    // Lifecycle hook called when any data-bound property of a directive changes. 
    // We use this hook to update the repoCreatedYear and repoUpdatedYear properties whenever repoData changes.
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['repoData'] && this.repoData) {
            // Extract the years when we receive the data
            this.repoCreatedYear = this.extractDateYear(this.repoData.created_at);
            this.repoUpdatedYear = this.extractDateYear(this.repoData.updated_at);
        }
    }

    // Helper function to extract date
    extractDateYear(date: Date) {
        // Extract the Datestamp from the RepoData and extract only the year
        const createdDate = new Date(date);
        return createdDate.getFullYear().toString();
    }
}
