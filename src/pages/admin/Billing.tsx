
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2, Plus } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { subscriptionsAPI } from "@/services/api";

// Define the schema for the subscription plan form
const planSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  billingCycle: z.enum(["monthly", "quarterly", "yearly"]),
  maxEmployees: z.coerce.number().positive({ message: "Max employees must be positive" }),
  features: z.string().transform(val => val.split(",").map(item => item.trim())),
  isActive: z.boolean().default(true),
  displayOrder: z.coerce.number().int().default(0)
});

type PlanFormValues = z.infer<typeof planSchema>;

const BillingPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Query to fetch subscription plans
  const { data: plans = [], isLoading: loadingPlans, refetch: refetchPlans } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: subscriptionsAPI.getAllPlans
  });

  // Query to fetch all subscriptions
  const { data: subscriptions = [], isLoading: loadingSubscriptions, refetch: refetchSubscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => subscriptionsAPI.getAllSubscriptions()
  });

  // Form setup
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      billingCycle: "monthly",
      maxEmployees: 0,
      features: "",
      isActive: true,
      displayOrder: 0
    }
  });

  // Set form values when editing a plan
  useEffect(() => {
    if (selectedPlan) {
      form.reset({
        name: selectedPlan.name,
        description: selectedPlan.description,
        price: selectedPlan.price,
        billingCycle: selectedPlan.billingCycle,
        maxEmployees: selectedPlan.maxEmployees,
        features: selectedPlan.features.join(", "),
        isActive: selectedPlan.isActive,
        displayOrder: selectedPlan.displayOrder
      });
    } else {
      form.reset({
        name: "",
        description: "",
        price: 0,
        billingCycle: "monthly",
        maxEmployees: 0,
        features: "",
        isActive: true,
        displayOrder: 0
      });
    }
  }, [selectedPlan, form]);

  // Handle form submission
  const onSubmit = async (values: PlanFormValues) => {
    try {
      if (isCreating) {
        await subscriptionsAPI.createPlan(values);
        toast.success("Subscription plan created successfully");
      } else {
        await subscriptionsAPI.updatePlan(selectedPlan._id, values);
        toast.success("Subscription plan updated successfully");
      }
      
      setOpenDialog(false);
      refetchPlans();
    } catch (error) {
      console.error("Subscription plan error:", error);
      toast.error("Failed to save subscription plan");
    }
  };

  // Handle plan deletion
  const handleDeletePlan = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this plan? This cannot be undone.")) {
      try {
        await subscriptionsAPI.deletePlan(id);
        toast.success("Subscription plan deleted successfully");
        refetchPlans();
      } catch (error: any) {
        console.error("Delete plan error:", error);
        toast.error(error.response?.data?.message || "Failed to delete plan");
      }
    }
  };

  // Handle opening the create/edit dialog
  const handleOpenDialog = (plan: any = null) => {
    if (plan) {
      setIsCreating(false);
      setSelectedPlan(plan);
    } else {
      setIsCreating(true);
      setSelectedPlan(null);
    }
    setOpenDialog(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Billing Management</h2>
        <p className="text-muted-foreground">
          Manage subscription plans and tenant billing information.
        </p>

        <Tabs defaultValue="plans">
          <TabsList>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Subscription Plans</h3>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" /> Add New Plan
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Billing Cycle</TableHead>
                      <TableHead>Max Employees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingPlans ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">Loading plans...</TableCell>
                      </TableRow>
                    ) : plans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">No subscription plans defined yet</TableCell>
                      </TableRow>
                    ) : (
                      plans.map((plan: any) => (
                        <TableRow key={plan._id}>
                          <TableCell>
                            <div className="font-medium">{plan.name}</div>
                            <div className="text-sm text-gray-500">{plan.features.length} features</div>
                          </TableCell>
                          <TableCell>${plan.price.toFixed(2)}</TableCell>
                          <TableCell className="capitalize">{plan.billingCycle}</TableCell>
                          <TableCell>{plan.maxEmployees}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              plan.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {plan.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(plan)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan._id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Subscriptions</CardTitle>
                <CardDescription>
                  View all tenant subscription details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingSubscriptions ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">Loading subscriptions...</TableCell>
                      </TableRow>
                    ) : subscriptions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">No active subscriptions found</TableCell>
                      </TableRow>
                    ) : (
                      subscriptions.map((sub: any) => (
                        <TableRow key={sub._id}>
                          <TableCell>
                            <div className="font-medium">{sub.tenantId?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{sub.tenantId?.domain || 'Unknown'}</div>
                          </TableCell>
                          <TableCell>{sub.name}</TableCell>
                          <TableCell>${sub.price.toFixed(2)} / {sub.billingCycle}</TableCell>
                          <TableCell>{new Date(sub.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {sub.nextBillingDate ? new Date(sub.nextBillingDate).toLocaleDateString() : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              sub.status === 'active' ? 'bg-green-100 text-green-800' : 
                              sub.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              sub.status === 'past_due' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {sub.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Subscription Plan Form Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isCreating ? 'Create New' : 'Edit'} Subscription Plan</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Basic Plan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the features and benefits of this plan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="billingCycle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing Cycle</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a billing cycle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxEmployees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Employees</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Unlimited leaves, TimeTracking, 24/7 support" {...field} />
                      </FormControl>
                      <FormDescription>Enter features separated by commas</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Active</FormLabel>
                          <FormDescription>
                            Make this plan available for subscription
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="displayOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormDescription>Lower numbers appear first</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{isCreating ? 'Create Plan' : 'Update Plan'}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
