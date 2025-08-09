import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHomepageComponent } from './article-homepage.component';

describe('ArticleHomepageComponent', () => {
  let component: ArticleHomepageComponent;
  let fixture: ComponentFixture<ArticleHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
