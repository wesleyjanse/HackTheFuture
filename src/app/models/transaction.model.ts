export class Transaction {
    constructor(  
        public id:string,
        public sender:string,
        public recipient:string,
        public amount: number,
        public currency: string,
        public time:Date,
        public message:string){}
    }