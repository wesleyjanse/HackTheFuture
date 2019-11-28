import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';
import { BankAccount } from 'src/app/models/bankaccount.model';
import { Account } from 'src/app/models/account.model';
import { Person } from 'src/app/models/person.model';
import { send } from 'q';

export interface PeriodicElement {
  Sender: string;
  Recipient: string;
  Amount: number;
  Time: Date;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: Transaction[];
  optionsAccounts: Person[];
  public apiPath: string;
  dataSourceAccounts = new MatTableDataSource(this.optionsAccounts);
  dataSource = new MatTableDataSource(this.options);
  accounts: Account[];
  transactions: Transaction[];
  filterRecipient = new FormControl('');
  filterSender = new FormControl('');
  filterAmount = new FormControl('');
  filterDate = new FormControl('');

  filterName = new FormControl('');
  filterIban = new FormControl('');

  displayedColumns: string[] = ['Sender', 'Recipient', 'Amount', 'Time'];
  displayedColumnsUsers: string[] = ['IBAN', 'Name', 'Balance'];
  filterValues = {
    sender: '',
    recipient: '',
    amount: 0,
    time: '',
    name: ''
  };
  filterValuesAccount = {
    firstName: '',
    iban: ''
  };

  filterValuesAccountBelize = {
    name: '',
    account: ''
  };

  filterValuesAccountSwiss = {
    name: '',
    account: ''
  };
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _NavbarService: NavbarService, private fb: FormBuilder, private _dashBoardService: DashboardService,public route:ActivatedRoute,public router:Router) {
    this._NavbarService.show();
    this.apiPath = this.route.snapshot.queryParamMap.get('apiPath');

    this.dataSource.filterPredicate = this.createFilter();

    if (this.apiPath === "/belizebank/") {
      this.dataSourceAccounts.filterPredicate = this.createFilterAccountBelize();
    }
    if (this.apiPath === "/swissnationalbank/") {
      this.dataSourceAccounts.filterPredicate = this.createFilterAccountSwiss();
    }
    else {
      this.dataSourceAccounts.filterPredicate = this.createFilterAccount();
    }

    this._dashBoardService.getBankTransacitons(this.apiPath).subscribe(res => {
      this.options = res;
      this.dataSource.data = this.options.result;
      
      console.log(this.options);
    })

    this._dashBoardService.getBankAccounts(this.apiPath).subscribe(res => {
      this.optionsAccounts = res;
      this.dataSourceAccounts.data = this.optionsAccounts.result;
      console.log(this.optionsAccounts);
    })
  }

  @ViewChild('transactionsPaginator', { read: MatPaginator, static: true }) transactionsPaginator: MatPaginator;
  @ViewChild('accountPaginator', { read: MatPaginator, static: true }) accountPaginator: MatPaginator;
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.filterRecipient.valueChanges
      .subscribe(
        recipient => {
          this.filterValues.recipient = recipient.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.dataSourceAccounts.sort = this.sort;
    this.filterSender.valueChanges
      .subscribe(
        sender => {
          this.filterValues.sender = sender.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.filterAmount.valueChanges
      .subscribe(
        amount => {
          this.filterValues.amount = Number(amount);
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.filterDate.valueChanges
      .subscribe(
        sender => {
          let value = this.formatDate(sender).toString();
          console.log(value)
          this.filterValues.time = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    if (this.apiPath === "/belizebank/") {
      this.filterName.valueChanges.subscribe(name => {
        this.filterValuesAccountBelize.name = name.toLowerCase();
        this.dataSourceAccounts.filter = JSON.stringify(this.filterValuesAccountBelize);
      });

      this.filterIban.valueChanges.subscribe(iban => {
        console.log(iban)
        this.filterValuesAccountBelize.card = iban.toLowerCase();
        this.dataSourceAccounts.filter = JSON.stringify(this.filterValuesAccountBelize);
      })
    } else if (this.apiPath === "/swissnationalbank/") {
      this.filterName.valueChanges.subscribe(name => {
        this.filterValuesAccountSwiss.name = name.toLowerCase();
        this.dataSourceAccounts.filter = JSON.stringify(this.filterValuesAccountSwiss);
      });

      this.filterIban.valueChanges.subscribe(iban => {
        console.log(iban)
        this.filterValuesAccountSwiss.account = iban.toLowerCase();
        this.dataSourceAccounts.filter = JSON.stringify(this.filterValuesAccountSwiss);
      })
    }
    else {
      this.filterName.valueChanges.subscribe(name => {
        this.filterValuesAccount.firstName = name.toLowerCase();
        this.dataSourceAccounts.filter = JSON.stringify(this.filterValuesAccount);
      });

      this.filterIban.valueChanges.subscribe(iban => {
        console.log(iban)
        this.filterValuesAccount.iban = iban.toLowerCase();
        this.dataSourceAccounts.filter = JSON.stringify(this.filterValuesAccount);
      })
    }
  }

  formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1], day = datePart[2];

    return day + '/' + month + '/' + 20 + year;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.transactionsPaginator;
    this.dataSource.sort = this.sort;
    this.dataSourceAccounts.paginator = this.accountPaginator;
    this.dataSourceAccounts.sort = this.sort;
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.recipient.toLowerCase().indexOf(searchTerms.recipient) !== -1
        && data.sender.toString().toLowerCase().indexOf(searchTerms.sender) !== -1
        && data.amount.toString().toLowerCase().indexOf(searchTerms.amount) !== -1
        && data.time.toString().toLowerCase().indexOf(searchTerms.time) !== -1
    }
    return filterFunction;
  }
  createFilterAccount(): (data: any, filter: string) => boolean {
    let filterFunctionAccount = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.firstName.toLowerCase().indexOf(searchTerms.firstName) !== -1
        && data.account.iban.toString().toLowerCase().indexOf(searchTerms.iban) !== -1
    }
    return filterFunctionAccount;
  }

  createFilterAccountBelize(): (data: any, filter: string) => boolean {
    let filterFunctionAccount = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.account.card.toString().toLowerCase().indexOf(searchTerms.account) !== -1
    }
    return filterFunctionAccount;
  }

  createFilterAccountSwiss(): (data: any, filter: string) => boolean {
    let filterFunctionAccount = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.card.account.toString().toLowerCase().indexOf(searchTerms.account) !== -1
    }
    return filterFunctionAccount;
  }
  moreInfo(person:Person){
    
    console.log(person)
    this.router.navigate([
      "/details"
     ],{queryParams: {person:JSON.stringify(person)}})
  }
}
