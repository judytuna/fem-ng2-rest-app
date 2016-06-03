import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Widget} from './widgets.service';

@Component({
  selector: 'widget-detail',
  template: `
  <div class="widget-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text" *ngIf="selectedWidget.id">Editing {{originalTitle}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!selectedWidget.id">Create New Widget</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <form novalidate>
          <div class="mdl-textfield mdl-js-textfield">
            <label>Widget Title</label>
            <input [(ngModel)]="selectedWidget.title"
              placeholder="Enter a name"
              class="mdl-textfield__input" type="text">
          </div>

          <div class="mdl-textfield mdl-js-textfield">
            <label>Widget Action</label>
            <input [(ngModel)]="selectedWidget.actionType"
              placeholder="Enter a gerund"
              class="mdl-textfield__input" type="text">
          </div>
          <button (click)="goForIt.emit(selectedwidget)"></button>

          <div class="mdl-textfield mdl-js-textfield">
            <label>Widget Color</label>
            <input [(ngModel)]="selectedWidget.color"
              placeholder="Enter a color"
              class="mdl-textfield__input" type="text">
          </div>
      </form>
    </div>
    <div class="mdl-card__actions">
        <button type="submit" (click)="cancelled.emit(selectedWidget)"
          class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
        <button type="submit" (click)="saved.emit(selectedWidget)"
          class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
    </div>
  </div>
  `
})
export class WidgetDetail {
  originalTitle: string;
  selectedWidget: Widget;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Output() goForIt = new EventEmitter();

  @Input() set widget(value: Widget){
    if (value) this.originalTitle = value.title;
    this.selectedWidget = Object.assign({}, value);
  }
}
