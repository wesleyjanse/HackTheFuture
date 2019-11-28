import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
person:Person;
averageAmount:number;
transactions:Transaction[];
  constructor(public route:ActivatedRoute) { }

  ngOnInit() {
    this.person = JSON.parse(this.route.snapshot.queryParamMap.get('person'));
    let transactions=[]= this.person.account.transactions
    let tussenwaarde =0;
    let teller =0;
    transactions.forEach(transaction => {
teller++;
      tussenwaarde = tussenwaarde + transaction.amount
    });
    this.averageAmount = tussenwaarde/ teller;
  }

}
