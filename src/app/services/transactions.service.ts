import { Investor, PaymentMode, Investment } from './../transactions/interfaces/transaction';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {  
  investmentRef: AngularFirestoreCollection<{[k: string]: any}>;
  investorRef: AngularFirestoreCollection<Investor>;
  paymentModeRef: AngularFirestoreCollection<PaymentMode>;

  constructor(private angularFirestore: AngularFirestore) {
    this.investmentRef = this.angularFirestore.collection<Investment>('investments');
    this.investorRef = this.angularFirestore.collection<Investor>('investors');
    this.paymentModeRef = this.angularFirestore.collection<PaymentMode>('payment_modes');
  }

  getInvestors(): Observable<Investor[]> {
    return this.investorRef.valueChanges().pipe(map(response => {
      return this.formatInvestorsResponse(response);
    }));
  }

  getPaymentModes(): Observable<any> {
    return this.paymentModeRef.valueChanges().pipe(map(response => {
      return this.formatPaymentModeResponse(response);
    }));
  }

  getInvestments(): Observable<Investment[]> {
    return this.investmentRef.valueChanges().pipe(map(response => {
      return this.formatInvestmentResponse(response);
    }));
  }

  async setInvestmen(investment: {[k: string]: any}): Promise<Boolean> {  
    try {
      return await this.investmentRef.doc(investment.id).set(investment).then(res => {
        return true;
      })
    } catch (e) {
      return e;
    }    
  }

  formatInvestorsResponse(data: any): Investor[] {
    const formattedData = data.map((item: Investor) => new Investor(item));
    return formattedData;
  }

  formatPaymentModeResponse(data: any): PaymentMode[] {
    const formattedData = data.map((item: PaymentMode) => new PaymentMode(item));
    return formattedData;
  }

  formatInvestmentResponse(data: any): Investment[] {
    let investmentData = [];
    for (let i = 0; i < data.length; i++){
      const tempI = data[i];
      tempI.investor = new Investor(tempI.investor);
      tempI.paymentMode = new PaymentMode(tempI.paymentMode);
      investmentData.push(new Investment(tempI));
    }    
    return investmentData;
  }

  async markAudited(data: {[k: string]: any}): Promise<Boolean> {
    try {
      return await this.investmentRef.doc(data.id).update({audited: true}).then(res => {
        return true;
      });
    } catch(e) {
      return false;
    }
    
  }
}
