
interface Subscription {
  id: string;
  _id?: string;
  tenantId: string | Tenant;
  plan: string;
  price: number;
  billingCycle: 'Monthly' | 'Yearly';
  startDate: string | Date;
  endDate: string | Date;
  nextBillingDate: string | Date;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  autoRenew: boolean;
  gracePeriodEnd?: string | Date;
  paymentGateway: 'Stripe' | 'PayPal' | 'Razorpay';
  transactionId?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
