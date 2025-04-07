
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CompanyDashboardLayout from "@/layouts/CompanyDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { subscriptionsAPI } from "@/services/api";

const SettingsPage = () => {
  const { user, tenant } = useAuth();
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);

  // Fetch subscription plans
  const { data: plans = [], isLoading: loadingPlans } = useQuery({
    queryKey: ['subscription-plans'],
    queryFn: subscriptionsAPI.getAllPlans
  });

  // Fetch current subscription if tenant exists
  const { data: subscription, isLoading: loadingSubscription, refetch: refetchSubscription } = useQuery({
    queryKey: ['current-subscription', tenant?._id],
    queryFn: () => subscriptionsAPI.getSubscriptionByTenant(tenant?._id || ''),
    enabled: !!tenant?._id,
    onSuccess: (data) => {
      setCurrentSubscription(data);
    },
    onError: () => {
      // Subscription might not exist yet, which is fine
      setCurrentSubscription(null);
    }
  });

  // Handle subscription purchase
  const handleSubscribe = async (planId: string) => {
    try {
      if (!tenant?._id) {
        toast.error("Tenant information not available");
        return;
      }

      await subscriptionsAPI.subscribeTenant({
        tenantId: tenant._id,
        planId,
        paymentMethod: "credit_card" // This would be replaced with actual payment integration
      });

      toast.success("Subscription updated successfully");
      refetchSubscription();
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to update subscription");
    }
  };

  // Handle subscription cancellation
  const handleCancelSubscription = async () => {
    if (!currentSubscription?._id) return;
    
    if (window.confirm("Are you sure you want to cancel your subscription? Your service will continue until the end of the current billing period.")) {
      try {
        await subscriptionsAPI.cancelSubscription(currentSubscription._id);
        toast.success("Subscription cancelled successfully");
        refetchSubscription();
      } catch (error) {
        console.error("Cancel subscription error:", error);
        toast.error("Failed to cancel subscription");
      }
    }
  };

  return (
    <CompanyDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Company Settings</h2>
        <p className="text-muted-foreground">
          Manage your company settings, subscription and preferences.
        </p>

        <Tabs defaultValue="subscription" className="space-y-4">
          <TabsList>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="company">Company Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSubscription ? (
                  <div className="text-center py-4">Loading subscription info...</div>
                ) : currentSubscription ? (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="text-lg font-medium">{currentSubscription.name}</h3>
                      <p className="text-muted-foreground">${currentSubscription.price} / {currentSubscription.billingCycle}</p>
                      <div className="mt-2 text-sm">
                        <p><strong>Status:</strong> <span className="capitalize">{currentSubscription.status}</span></p>
                        <p><strong>Start Date:</strong> {new Date(currentSubscription.startDate).toLocaleDateString()}</p>
                        {currentSubscription.nextBillingDate && (
                          <p><strong>Next Billing:</strong> {new Date(currentSubscription.nextBillingDate).toLocaleDateString()}</p>
                        )}
                        <p><strong>Max Employees:</strong> {currentSubscription.maxEmployees}</p>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {currentSubscription.features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {currentSubscription.status === 'active' && (
                        <Button 
                          variant="destructive" 
                          className="mt-4"
                          onClick={handleCancelSubscription}
                        >
                          Cancel Subscription
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p>No active subscription found.</p>
                    <p className="text-muted-foreground">Choose a subscription plan below to get started.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <h3 className="text-lg font-medium mt-6">Available Plans</h3>
            
            {loadingPlans ? (
              <div className="text-center py-4">Loading plans...</div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {plans
                  .filter((plan: any) => plan.isActive)
                  .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
                  .map((plan: any) => (
                    <Card key={plan._id} className={
                      currentSubscription?.planId === plan._id 
                        ? "border-2 border-primary" 
                        : ""
                    }>
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>
                          ${plan.price} / {plan.billingCycle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>{plan.description}</p>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Features:</p>
                          <ul className="space-y-1">
                            {plan.features.map((feature: string, index: number) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="text-sm">
                          <strong>Max Employees:</strong> {plan.maxEmployees}
                        </p>
                        
                        {currentSubscription?.planId === plan._id ? (
                          <Button disabled className="w-full">
                            Current Plan
                          </Button>
                        ) : (
                          <Button 
                            variant="default" 
                            className="w-full"
                            onClick={() => handleSubscribe(plan._id)}
                          >
                            {currentSubscription ? 'Switch to this Plan' : 'Subscribe'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>
                  Manage your company information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>This section will contain company profile settings</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>
                  Customize your HR system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>This section will contain system preferences</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CompanyDashboardLayout>
  );
};

export default SettingsPage;
