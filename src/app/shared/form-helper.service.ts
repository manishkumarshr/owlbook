import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {
  formData: {[k: string]: any} = {};
  constructor() { }

  getFormData(group: FormGroup) {
    Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        if (abstractControl instanceof FormGroup) {
          this.getFormData(abstractControl);
        } else {
            this.formData[key] = abstractControl.value;
        }
    })
    return this.formData;
  }

  getInvestmentTableColConfig() {
    return  [
      { field: 'id', hide: true },
      { headerName: 'Investor', field: 'investor', minWidth: 110, resizable: true},
      { headerName: 'INR', field: 'amount', resizable: true},
      { headerName: 'Date', field: 'investmentDate', resizable: true},
      { headerName: 'Status', field: 'audited', cellRenderer: "customCellComponent", resizable: true}
    ];
  }
}
