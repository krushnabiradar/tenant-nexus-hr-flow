
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { tenantsAPI, subscriptionsAPI } from "@/services/api";
import RecruitmentDashboardLayout from "@/layouts/RecruitmentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const { user } = useAuth();
  const [tenantData, setTenantData] = useState<Tenant | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Fetch tenant data
  const { data: tenant, isLoading: loadingTenant } = useQuery({
    queryKey: ['tenant', user?.tenantId],
    queryFn: () => tenantsAPI.getTenantById(user?.tenantId),
    enabled: !!user?.tenantId,
    meta: {
      onSuccess: (data: Tenant) => {
        setTenantData(data);
      }
    }
  });

  // Fetch subscription data if tenant is loaded
  const { data: subscriptionData, isLoading: loadingSubscription } = useQuery({
    queryKey: ['subscription', tenantData?.id],
    queryFn: () => subscriptionsAPI.getSubscriptionByTenant(tenantData?.id as string),
    enabled: !!tenantData?.id,
    meta: {
      onSuccess: (data: Subscription) => {
        setSubscription(data);
      },
      onError: () => {
        // It's okay if there's no subscription
        console.log("No subscription found for tenant");
      }
    }
  });

  return (
    <RecruitmentDashboardLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Recruitment Settings</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Settings & Configuration</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-16 text-center">
            <div className="space-y-2">
              <Settings className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Settings Panel</h3>
              <p className="text-muted-foreground">
                Configure job templates, workflow settings, and user permissions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecruitmentDashboardLayout>
  );
};

export default SettingsPage;
