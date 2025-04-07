
interface Tenant {
  id: string;
  _id?: string;
  name: string;
  domain: string;
  subscriptionId: string | Subscription;
  hrManagers?: string[] | User[];
  totalEmployees: number;
  status: 'Active' | 'Suspended' | 'Pending';
  createdAt: string | Date;
  updatedAt: string | Date;
}
