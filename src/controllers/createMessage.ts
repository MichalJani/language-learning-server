export class Messenger {
port:number;

  constructor(port:number){
    this.port=port
  }

  messagePrint(){
    return `Server is running on port ${this.port}`
  }
}
