"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Welcome to your Dashboard, {user?.nombre || 'User'}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This is your protected dashboard page. You can only see this if you are logged in.</p>
          <p className="mt-4">Here's some information we have for you:</p>
          <ul className="mt-2 list-disc list-inside text-muted-foreground">
            <li><strong>Username:</strong> {user?.username}</li>
            <li><strong>Email:</strong> {user?.correo}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
