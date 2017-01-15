import ObjectID = Mongo.ObjectID;
import { Molecule } from "./molecule";

export interface Offer {
  _id?: ObjectID;
  pointIds: ObjectID[];
  name: string;
  whenActive: string;
  price: number;
  molecule: Molecule;
}

export namespace Offer {
  export function init() {
    return {
      pointIds: undefined,
      name: undefined,
      whenActive: undefined,
      price: undefined,
      molecule: undefined
    };
  }
}