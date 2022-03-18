import { CustomCellComponent } from './../custom-cell/custom-cell.component';
import { LoaderService } from './../../services/loader.service';
import { AlertService } from './../../services/alert.service';
import { FormHelperService } from './../../shared/form-helper.service';
import { Investment } from './../interfaces/transaction';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TransactionsService } from './../../services/transactions.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ColDef {
  headerName?: string,
  field: string
}

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.sass']
})
export class InvestmentComponent implements OnInit {
  investmentForm: FormGroup;
  investors: any[];
  paymentModes: any[];
  metadata$: Observable<any>;
  investments: Investment[];
  showError: boolean = false;
  errorText: string = '';
  investmentFormData: {[k: string]: any};
  initialFormData: any;
  isCollapsed: boolean = true;
  metadataLoaded: boolean = false;
  investmentTableConfig: any[] = [];
  columnDefs: ColDef[];
  rowData: any[] = [];
  someData: any[] = [];
  api;
  columnApi;
  frameworkComponents;
  context;

  constructor(private trs: TransactionsService,
    private fb: FormBuilder,
    private formHelper: FormHelperService,
    private alertService: AlertService,
    private loaderService: LoaderService) {

    this.context = {
        componentParent: this
    }

    this.initialFormData = {
      investor: ['', Validators.required],
      amount: ['', Validators.required],
      paymentMode: ['', Validators.required],
      investmentDate: ['', [Validators.required]],
      comment: ['']
    };

    this.columnDefs = this.formHelper.getInvestmentTableColConfig();

    this.someData = [];

    this.frameworkComponents = {
      customCellComponent: CustomCellComponent,
    };

    this.trs.getInvestments().subscribe(data => {   
      this.displayInvestmentData(data);
    });

  }

  onGridReady(params) {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();  
    this.setAutoHeight();
  } 

  ngOnInit() {
    this.initializeForm();    
  }

  fetchMetadata() {
    this.loaderService.pageLoadingCommand('show');
      this.metadata$ = combineLatest([this.trs.getInvestors(), this.trs.getPaymentModes()]).pipe(take(1));
      this.metadata$.subscribe(respose => {
        this.investors = respose[0];
        this.paymentModes = respose[1];
        this.metadataLoaded = true;
        this.loaderService.pageLoadingCommand('hide');
      });
  }
  
  initializeForm() {
    this.investmentForm = this.fb.group(this.initialFormData);
  }

  submitInvestment(): void {
    if(!this.investmentForm.valid) {
      this.showError = true;
      this.errorText = "There are some errors on the form!";
    } else {
      const formData = this.formHelper.getFormData(this.investmentForm);
      this.investmentFormData = this.formatInvestmenFormtData(formData);
      this.loaderService.pageLoadingCommand('show');
      this.trs.setInvestmen(this.investmentFormData).then(success => {
        if (success) {
          this.loaderService.pageLoadingCommand('hide');
          this.alertService.showAlert({
            type: 'success',
            message: 'New record added. Pending audit!',
            disappear: true
          })
          this.investmentForm.reset();
          this.initializeForm();
          this.isCollapsed = true;
        }
      })
    }
  }

  formatInvestmenFormtData(data: any): {[k: string]: any} {
    if (data.investor) {
      data.investor = this.investors.find(i => i.id === data.investor);
    }
    if (data.paymentMode) {
      data.paymentMode = this.paymentModes.find(p => p.id = data.paymentMode);
    }
    if (data.investmentDate) {
      data.investmentDate = new Date(data.investmentDate);
    }
    data.createdDate = new Date();
    data.id = String(data.investor.id + '_' + (new Date().getTime()));
    data.audited = false;
    return ((new Investment(data)).transform());
  }

  displayInvestmentData(data: Investment[]) {
    this.someData = [];
    for (let i = 0; i < data.length; i++) {
      this.someData.push(this.prepareRow(data[i]));
    }
    this.api.setRowData(this.someData);
  }

  prepareRow(investmentRow: Investment) {
    return investmentRow.formatTabularData(this.columnDefs);
  }

  toggleInvestmentForm() {
    this.isCollapsed = !this.isCollapsed;
    if (!this.isCollapsed && !this.metadataLoaded) {
      this.fetchMetadata();      
    }
  }

  setAutoHeight() {
    this.api.setDomLayout('autoHeight');
    // document.querySelector('#myGrid').style.height = '';
  }

  auditInvestment(data) {
    this.loaderService.pageLoadingCommand('show');
    this.trs.markAudited(data).then(success => {
      if (success) {
        this.loaderService.pageLoadingCommand('hide');
        this.alertService.showAlert({
          type: 'success',
          message: 'Investment Audited',
          disappear: true
        })
        this.investmentForm.reset();
        this.initializeForm();
        this.isCollapsed = true;
      }
    })
  }

  cancel(): void{
    this.investmentForm.reset();
    this.initializeForm();
    this.isCollapsed = true;
  }

}
