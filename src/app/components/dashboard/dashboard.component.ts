import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';
import { BankAccount } from 'src/app/models/bankaccount.model';
import { Accounts } from 'src/app/models/accounts.model';

export interface PeriodicElement {
  sender: string;
  recipient: string;
  amount: number;
  time: Date;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: Transaction[];

  public apiPath:string;
  constructor(private _NavbarService: NavbarService, private fb: FormBuilder, private _dashBoardService: DashboardService,public route:ActivatedRoute) {
    this._NavbarService.show();
    this.dataSource.filterPredicate = this.createFilter();
  }

  accounts: Accounts[];
  transactions: Transaction[];
  filter = new FormControl('');
  displayedColumns: string[] = ['Sender', 'Recipient', 'Amount', 'Time'];
  filterValues = {
    sender: '',
    recipient: '',
    amount: '',
    time: ''
  };
  dataSource = new MatTableDataSource(this.options);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this._dashBoardService.getBankTransacitons("/caymannationalbank/").subscribe(res => {
      this.options = res.result;
      // this._dashBoardService.getBankAccounts("/caymannationalbank/").subscribe(result => {
      //   this.accounts = result;
      // })
      this.dataSource.data = this.options;
      console.log(this.options);

    })
    this.dataSource.sort = this.sort;
    this.apiPath = this.route.snapshot.queryParamMap.get('apiPath');
    this.filter.valueChanges
      .subscribe(
        name => {
          this.filterValues.amount = name.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }


  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
    }
    return filterFunction;
  }
}
