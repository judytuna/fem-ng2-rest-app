import {Component, OnInit} from '@angular/core';
import {WidgetsService, Widget} from './widgets.service';
import {WidgetsList} from './widgets-list.component';

@Component({
  selector: 'widgets',
  template: `
  <div class="widgets"
       *ngIf="tagline">
    {{ tagline }}
  </div>
  <widgets-list [widgets]="widgets"></widgets-list>
  `,
  styles: [`
    .widgets {
      margin: 28px 28px 0;
      padding: 16px;
      background-color: #FDDE86;
    }
    widgets-list {
      display: flex;
    }
  `],
  providers: [WidgetsService],
  directives: [WidgetsList]
})
export class WidgetsComponent implements OnInit {
  tagline: string;
  widgets: Array<Widget>;
  selectedWidget: Widget;

  constructor(private widgetsService: WidgetsService) {}

  ngOnInit() {
    this.tagline = "🚀 I'm a widgets tagline. 🦄";
    this.widgets = this.widgetsService.loadWidgets();
  }
}
