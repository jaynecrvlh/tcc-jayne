import { SafeScript } from '@angular/platform-browser';

export class Network {
  constructor(
    private id:string,
    private avatar:string,
    private name:string,
    private dateOfBirth: string,
    private genre: string,
    private bloodType:string,
    private specialNeeds:Array<string>,
    private interests:Array<string>,
    private admId:string,
    private membersId:Array<string>,
    private tasks:Array<Object>
  ) {}
  
  getId():string {
    return this.id;
  }

  setId(id:string):void {
    this.id = id;
  }

  getAvatar():string {
    return this.avatar;
  }

  setAvatar(avatar:string):void {
    this.avatar = avatar;
  }

  getName():string {
    return this.name;
  }

  setName(name:string):void {
    this.name = name;
  }

  getDateOfBirth():string {
    return this.dateOfBirth;
  }

  setDateOfBirth(dateOfBirth:string):void {
    this.dateOfBirth = dateOfBirth;
  }

  getGenre():string {
    return this.genre;
  }

  setGenre(genre:string):void {
    this.genre = genre;
  }

  getBloodType():string {
    return this.bloodType;
  }

  setBloodType(bloodType:string):void {
    this.bloodType = bloodType;
  }

  getSpecialNeeds():Array<string> {
    return this.specialNeeds;
  }

  setSpecialNeeds(specialNeeds:Array<string>):void {
    this.specialNeeds = specialNeeds;
  }

  getInterests():Array<string> {
    return this.interests;
  }

  setInterests(interests:Array<string>):void {
    this.interests = interests;
  }

  getAdmId():string {
    return this.admId;
  }

  setAdmId(admId:string):void {
    this.admId = admId;
  }

  getMembersId():Array<SafeScript> {
    return this.membersId;
  }

  setMembersId(membersId:Array<string>):void {
    this.membersId = membersId;
  }

  getTasks():Array<Object> {
    return this.tasks;
  }

  setTasks(tasks:Array<Object>):void {
    this.tasks = tasks;
  }
}