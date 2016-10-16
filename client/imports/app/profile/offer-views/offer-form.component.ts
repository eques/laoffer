import { Component, OnDestroy } from "@angular/core";
import { Point } from "../../../../../both/models/point";
import { Subscription } from "rxjs/Subscription";
import { MeteorObservable } from "meteor-rxjs";
import { UserData } from "../../../../../both/models/user-data";
import { PointCollection } from "../../../../../both/collections/point.collection";

@Component({
  selector: 'offer-form',
  template: `
    <form>
        <h2>prepare new offer</h2>
        <div>select points</div>
        <div *ngFor="let point of points | async">
            {{point.name}} 
            <input type="checkbox"
                   name="selectPoints"
                   (change)="select(point, $event.target.checked)"/>
        </div>
        <div>price: <input type="number" placeholder="1.00"></div>
        <div>when active: <input type="text" placeholder="work days 10 - 16"></div>
        <molecula-builder></molecula-builder>
        <button (click)="saveOffer()">save</button>
    </form>
`
})
export class OfferFormComponent implements  OnDestroy {

  private points: Point[];
  private pointSubscription: Subscription;
  private selectedPoints: { [key:string]:{point: Point, selected: boolean}; } = {};

  constructor(){
    this.pointSubscription = MeteorObservable
      .subscribe('company-points', (<UserData>Meteor.user()).companyId)
      .subscribe();
    this.points = (<Point[]>PointCollection.find({}).zone());
    this.selectedPoints = {};
  }

  ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
  }

  select(point, selected) {
    this.selectedPoints[point.name] = {point, selected};
  }

  saveOffer(){

  }

}
