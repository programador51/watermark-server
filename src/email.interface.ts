export interface Email {}

export interface PurchaseConfirmation {
  title: string;
  password: string;
  customerName: string;
  customerEmail: string;
  amount: number | string;
  currency: string;
}

export interface EmailPassword {
  idPayment: string;
  linkShop: string;
}
