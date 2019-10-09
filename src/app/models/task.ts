export class Task {
  constructor(
    private id: string,
    private category: string,
    private name: string,
    private date: string,
    private time: string,
    private description: string,
    private responsible: {
      id:string,
      firstName:string,
      lastName:string,
      photo:string
    },
    private done: boolean,
    private comments: Array<{
      author:string,
      photo:string,
      date:string,
      hour:string,
      message:string
    }>
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

  getResponsible():{id:string, firstName:string, lastName:string, photo:string} {
    return this.responsible;
  }

  setResponsible(responsible:{id:string, firstName:string, lastName:string, photo:string}):void {
    this.responsible = responsible;
  }

  getDone():boolean {
    return this.done;
  }

  setDone(done:boolean):void {
    this.done = done;
  }

  getComments():Array<{author:string, photo:string, date:string, hour:string, message:string}> {
    return this.comments;
  }

  setComments(comments:Array<{author:string, photo:string, date:string, hour:string, message:string}>):void {
    this.comments = comments;
  }
}