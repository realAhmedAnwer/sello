import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  imports: [],
  templateUrl: './section-title.component.html',
})
export class SectionTitleComponent {
  public readonly title = input();
  public readonly highlight = input();
}
