import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const BASE_URL = 'http://localhost:3000/widgets/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

export interface Widget {
  id: number;
  title: string;
  actionType: string;
  color: string;
}

@Injectable()
export class WidgetsService {
  constructor(private http: Http) {}


  loadWidgets() {
    //noinspection TypeScriptUnresolvedFunction
    //return this.http.get(BASE_URL)
    //  .map(res => res.json())
    //  .toPromise();

    // static widgets to start with
    let firstWidget: Widget =
    {
      id: 1,
      title: "Super Widget",
      actionType: "Flying",
      color: "Purple"
    };
    let secondWidget: Widget =
    {
      id: 2,
      title: "Awesome Widget",
      actionType: "Swimming",
      color: "Orange"
    };
    let thirdWidget: Widget =
    {
      id: 3,
      title: "Totally Sweet Widget",
      actionType: "Steamrolling",
      color: "Chartreuse"
    };

    return [firstWidget, secondWidget, thirdWidget];
  }

  saveWidget(widget: Widget) {
    return (widget.id) ? this.updateWidget(widget) : this.createWidget(widget);
  }

  createWidget(widget: Widget) {
    //noinspection TypeScriptUnresolvedFunction
    return this.http.post(`${BASE_URL}`, JSON.stringify(widget), HEADER)
      .map(res => res.json())
      .toPromise();
  }

  updateWidget(widget: Widget) {
    //noinspection TypeScriptUnresolvedFunction
    return this.http.put(`${BASE_URL}${widget.id}`, JSON.stringify(widget), HEADER)
      .map(res => res.json())
      .toPromise();
  }

  deleteWidget(widget: Widget) {
    //noinspection TypeScriptUnresolvedFunction
    return this.http.delete(`${BASE_URL}${widget.id}`)
      .map(res => res.json())
      .toPromise();
  }
}
