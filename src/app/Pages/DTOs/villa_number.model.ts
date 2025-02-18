import { Villa } from "./villa.model";

export interface VillaNumbers{
  villaNo?:Number,
  villaId?:Number,
  specialDetails?:string,
  villa:Villa;
}
export interface ManageVillaNumbersDTO{
  villaNo?:Number,
  villaId:Number,
  specialDetails:string,
}
