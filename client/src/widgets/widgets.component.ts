import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'widgets',
  template: `
  <div class="widgets"
       *ngIf="tagline">
    {{ tagline }}
  </div>
  `,
  styles: [`
    .widgets {
      margin: 28px 28px 0;
      padding: 16px;
      background-color: #FDDE86;
    }
  `]
})
export class Widgets implements OnInit {
  tagline: string;

  constructor() {}

  ngOnInit() {
    this.tagline = "🚀 I'm a widgets tagline. 🦄"
  }
}
