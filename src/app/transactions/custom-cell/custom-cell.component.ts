import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Component } from '@angular/core';

@Component({
  selector: 'total-value-component',
  templateUrl: './custom-cell.component.html',
})

export class CustomCellComponent implements AgRendererComponent {
  params: ICellRendererParams;
  componentParent: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.componentParent = this.params.context.componentParent;
  }

  refresh(params: ICellRendererParams) {
    // set value into cell again
    // this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  auditClicked() {
    this.componentParent.auditInvestment(this.params.data);
  }
} 