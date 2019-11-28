import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';
import { isUndefined } from 'util';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
person:Person;
averageAmount:number;
transactions:Transaction[];
totalReceived:number;
totalSend:number;
iban:string;
cardAccount:string;
soortTransaction;
  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
    this.person = JSON.parse(this.route.snapshot.queryParamMap.get('person'));
    console.log(this.person)
    let transactions=[]
    let tussenwaarde =0;
    let tussenOntvangen=0;
    let tussenVerzonden=0;
    let teller =0;
    if(this.person.account!= undefined){
      this.soortTransaction=this.person.account.transactions;
     transactions= this.person.account.transactions;
     this.iban = this.person.account.iban;
     transactions.forEach(transaction => {
      teller++;
            tussenwaarde = tussenwaarde + transaction.amount
           
            if(transaction.sender == this.person.account.iban){
              tussenVerzonden = tussenVerzonden + transaction.amount;
            }else{
              tussenOntvangen = tussenOntvangen + transaction.amount;
            }
          });
    }else if(this.person.card!= undefined){
      this.soortTransaction = this.person.card.transactions;
      transactions= this.person.card.transactions;
      this.cardAccount = this.person.card.account;
      transactions.forEach(transaction => {
        teller++;
              tussenwaarde = tussenwaarde + transaction.amount
              if(transaction.sender == this.person.card.account){
                tussenVerzonden = tussenVerzonden + transaction.amount;
              }else{
                tussenOntvangen = tussenOntvangen + transaction.amount;
              }
            });
    }
    
    

    this.averageAmount = tussenwaarde/ teller;
    this.totalReceived = tussenOntvangen;
    this.totalSend=tussenVerzonden;
  }

}
