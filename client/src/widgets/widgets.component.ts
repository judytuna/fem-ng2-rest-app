import {Component, OnInit} from '@angular/core';
import {WidgetsService, Widget} from './widgets.service';
import {WidgetsList} from './widgets-list.component';
import {WidgetDetail} from './widget-detail.component';

@Component({
  selector: 'widgets',
  template: `
  <div class="widgets"
       *ngIf="tagline">
    {{ tagline }}
  </div>
  <widgets-list
    [widgets]="widgets"
    (selected)="selectWidget($event)"
    (deleted)="deleteWidget(widget)"
    (goForIt)="goForItWidget(widget)">
    <pre>loading widgets-list</pre>
  </widgets-list>

  <div class="mdl-cell mdl-cell--6-col">
    <widget-detail
      (saved)="saveWidget(widget)"
      (cancelled)="resetWidget(widget)"
      [widget]="selectedWidget">
      <pre>DEBUG: loading widget-detail...</pre>
    </widget-detail>
   </div>
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
  directives: [WidgetsList, WidgetDetail]
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

  resetWidget() {
    let emptyWidget: Widget = {id: null, title: '', actionType: '', color: ''};
    this.selectedWidget = emptyWidget;
  }

  selectWidget(widget: Widget) {
    this.selectedWidget = widget;
  }

  saveWidget(widget: Widget) {
    this.widgetsService.saveWidget(widget)
      .then(responseWidget => {
        if (widget.id) {
          this.replaceWidget(responseWidget);
        } else {
          this.pushWidget(responseWidget);
        }
      });

    // Generally, we would want to wait for the result of `widgetsService.saveWidget`
    // before resetting the current widget.
    this.resetWidget();
  }

  replaceWidget(widget: Widget) {
    this.widgets = this.widgets.map(mapWidget => {
      return mapWidget.id === widget.id ? widget : mapWidget;
    });
  }

  pushWidget(widget: Widget) {
    this.widgets.push(widget);
  }

  deleteWidget(widget: Widget) {
    this.widgetsService.deleteWidget(widget)
      .then(() => {
        this.widgets.splice(this.widgets.indexOf(widget), 1);
      });

    // Generally, we would want to wait for the result of `widgetsService.deleteWidget`
    // before resetting the current widget.
    this.resetWidget();
  }
}
