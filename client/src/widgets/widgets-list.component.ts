import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Widget} from './widgets.service';

@Component({
  selector: 'widgets-list',
  template: `
    <div *ngFor="let widget of widgets"
         (click)="selected.emit(widget)"
         class="widget">
      <div class="title">{{widget.title}}</div>
      <div class="action-type">
        <button
          (click)="performAction.emit(widget); $event.stopPropagation();">
          Start {{widget.actionType}}!
        </button>
      </div>
      <div class="color">{{widget.color}}</div>
      <button (click)="selected.emit(widget)">Edit</button>
    </div>
  `,
  styles: [`
    .widget {
      margin: 28px;
      padding: 16px;
      background-color: #f8d9d9;
    }
    .widget + .widget {
      margin-left: 0;
    }
  `]
})
export class WidgetsList {
  @Input() widgets: Widget[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() performAction = new EventEmitter();
}
