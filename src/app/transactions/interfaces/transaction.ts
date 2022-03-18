export class Investor {
    address: string;
    email: string;
    id: string;
    name: string;
    pan: string;
    phone: number;
    transform(): {[k: string]: any} {
        return new Object({
            address: this.address,
            email: this.email,
            id: this.id,
            name: this.name,
            pan: this.pan,
            phone: this.phone
        });
    }
    constructor(options: {
        address: string,
        email: string,
        id: string,
        name: string,
        pan: string,
        phone: number
    }) {
        this.address = options.address;
        this.email = options.email;
        this.id = options.id;
        this.name = options.name;
        this.pan = options.pan;
        this.phone = options.phone;
    }
}

export class PaymentMode {
    id: string;
    label: string;
    transform(): {[k: string]: any} {
        return new Object({
            id: this.id,
            label: this.label
        });
    }
    constructor(options: {
        id: string,
        label: string
    }) {
        this.id = options.id;
        this.label = options.label;
    }
}

export class Investment {
    id: string;
    amount: number;
    comment: string;
    createdDate: Date;
    investmentDate: any;
    investor: Investor;
    paymentMode: PaymentMode;
    audited?: boolean;
    transform(): {[k: string]: any} {
        return new Object({
            id: this.id,
            amount: this.amount,
            comment: this.comment,
            createdDate: this.createdDate,
            investmentDate: this.investmentDate,
            investor: this.investor.transform(),
            paymentMode: this.paymentMode.transform(),
            audited: this.audited
        });
    }
    constructor(options: {
        id: string;
        amount?: number;
        comment?: string;
        createdDate?: Date;
        investmentDate?: Date;
        investor?: Investor;
        paymentMode?: PaymentMode;
        audited?: boolean;
    }) {
        this.id = options.id;
        this.amount = options.amount;
        this.comment = options.comment;
        this.createdDate = options.createdDate;
        this.investmentDate = options.investmentDate;
        this.investor = options.investor;
        this.paymentMode = options.paymentMode;
        this.audited = options.audited || false;
    }

    auditTransaction(audit: boolean): void {
        this.audited = audit;
    }

    formatTabularData(def) {
        let rowData = {};
        def.forEach(item => {
            switch(item.field) {
                case 'id':
                    rowData['id'] = this.id;
                    break;
                case 'investor':
                    rowData['investor'] = this.investor.name;
                    break;
                case 'paymentMode':
                    rowData['paymentMode'] = this.paymentMode.label;
                    break;
                case 'investmentDate':
                    rowData['investmentDate'] = this.formatDate(this.investmentDate.toDate());
                    break;
                default:
                    rowData[item.field] = this[item.field];                
            }
            
        })
        return rowData;
    }

    private formatDate(date: Date) {
        return date.getDate() 
        + '/' + (date.getMonth() 
        + 1) + '/' 
        + date.getFullYear();
    }

}
