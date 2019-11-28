import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DashboardService } from 'src/app/services/dashboard.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: any[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  constructor(private _NavbarService: NavbarService, private fb: FormBuilder, private _dashBoardService: DashboardService) {
    this._NavbarService.show();
    this.dataSource.data = this.options;
    this.dataSource.filterPredicate = this.createFilter();

    this._dashBoardService.getBankAccounts("caymannationalbank").subscribe(res => {
      console.log(res);
    })
   }

  filter = new FormControl('');
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  filterValues = {
    position: '',
    name: '',
    weight: '',
    symbol: ''
  };
  dataSource = new MatTableDataSource(this.options);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.filter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }


  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
    }
    return filterFunction;
  }
}
