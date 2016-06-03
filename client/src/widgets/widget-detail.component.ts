import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Widget} from './widgets.service';

@Component({
  selector: 'widget-detail',
  template: `
  <div class="widget-card">
    <div class="">
      <h2 class="" *ngIf="selectedWidget.id">Editing {{originalTitle}}</h2>
      <h2 class="" *ngIf="!selectedWidget.id">What would you like your new widget to do?</h2>
    </div>
    <div class="">
      <form novalidate>
          <div class="">
            <label>Widget Title</label>
            <input [(ngModel)]="selectedWidget.title"
              placeholder="Enter a name"
              class="" type="text">
          </div>

          <div class="">
            <label>Widget Action</label>
            <input [(ngModel)]="selectedWidget.actionType"
              placeholder="Enter a gerund"
              class="" type="text">
          </div>
          <button (click)="goForIt.emit(selectedWidget)">Go for it!</button>

          <div class="">
            <label>Widget Color</label>
            <input [(ngModel)]="selectedWidget.color"
              placeholder="Enter a color"
              class="" type="text">
          </div>
      </form>
    </div>
    <div class="">
        <button type="submit" (click)="cancelled.emit(selectedWidget)"
          class="">Cancel</button>
        <button type="submit" (click)="saved.emit(selectedWidget)"
          class="">Save</button>
    </div>
  </div>
  `,
  styles: [`
    h2 {
      font-size: 20px;
    }
  `]
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
