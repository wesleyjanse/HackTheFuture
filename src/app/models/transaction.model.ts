export class Transaction {
    constructor(  
        public result: any,
        public id:string,
        public sender:string,
        public recipient:string,
        public amount: number,
        public currency: string,
        public time:String,
        public message:string,
        public senderName?: string,
        public receiverName?: string){}
    }