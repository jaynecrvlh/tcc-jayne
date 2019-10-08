export class Task {
  constructor(
    private id: string,
    private category: string,
    private name: string,
    private date: string,
    private time: string,
    private description: string,
    private responsible: Object,
    private done: boolean,
    private comments: Array<Object>
  ){}

  getId():string {
    return this.id;
  }

  setId(id:string):void {
    this.id = id;
  }

  getCategory():string {
    return this.category;
  }

  setCategory(category:string):void {
    this.category = category;
  }

  getName():string {
    return this.name;
  }

  setName(name:string):void {
    this.name = name;
  }

  getDate():string {
    return this.date;
  }

  setDate(date:string):void {
    this.date = date;
  }

  getTime():string {
    return this.time;
  }

  setTime(time:string):void {
    this.time = time;
  }

  getDescription():string {
    return this.description;
  }

  setDescription(description:string):void {
    this.description = description;
  }

  getResponsible():Object {
    return this.responsible;
  }

  setResponsible(responsible:Object):void {
    this.responsible = responsible;
  }

  getDone():boolean {
    return this.done;
  }

  setDone(done:boolean):void {
    this.done = done;
  }

  getComments():Array<Object> {
    return this.comments;
  }

  setComments(comments:Array<Object>):void {
    this.comments = comments;
  }
}