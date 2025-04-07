
interface Tenant {
  id: string;
  _id?: string;
  name: string;
  domain: string;
  subscriptionId: string;
  hrManagers?: string[];
  totalEmployees: number;
  status: 'Active' | 'Suspended' | 'Pending';
  createdAt: string | Date;
  updatedAt: string | Date;
}
