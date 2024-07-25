import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectpageComponent } from './projectpage.component';

describe('ProjectpageComponent', () => {
  let component: ProjectpageComponent;
  let fixture: ComponentFixture<ProjectpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
