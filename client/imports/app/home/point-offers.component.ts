import { Component, OnDestroy, Input, OnChanges } from "@angular/core";
import { MeteorObservable } from "meteor-rxjs";
import { Subscription } from "rxjs/Subscription";
import { OfferCollection } from "../../../../both/collections/offer.collection";
import ObjectID = Mongo.ObjectID;
import { Observable } from "rxjs";
import { Offer } from "../../../../both/models/offer";
import { Point } from "../../../../both/models/point";

@Component({
  selector: "point-offers",
  template: `
    <div> point-offers
        <div *ngIf="point">{{point.name}}</div>
        <div *ngFor="let offer of offers | async">
            {{offer.whenActive}} <br>
            {{offer.price}} <br>
            {{offer.molecule}} <br>
            <hr>
        </div>
    </div>
`
})
export class PointOffersComponent implements OnDestroy, OnChanges {

  @Input()
  point: Point;

  private offerSubscription: Subscription;
  private offers: Observable<Offer[]>;

  constructor() {}

  ngOnChanges() {
    console.log(this.point);
    if(this.point) {
      this.offerSubscription = MeteorObservable
        .subscribe("point-offers", this.point._id)
        .subscribe();
      this.offers = OfferCollection.find({}).zone();
    }
  }

  ngOnDestroy(): void {
    if (this.offerSubscription) {
      this.offerSubscription.unsubscribe();
    }
  }
}
