import {AddressModel} from "./address.model";
import {ETraffic} from "../enum/ETraffic";

export class BusModel {
  public timeToArrive: number;
  public destination: AddressModel;
  public start: AddressModel;
  public line: string;
  public personQty: number;
  public totalSeats: number;
  public traffic: ETraffic;
}
