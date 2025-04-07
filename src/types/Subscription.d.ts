
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
  status: 'active' | 'cancelled' | 'pending' | 'past_due';
  features: string[];
  name?: string;
  maxEmployees?: number;
  planId?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
