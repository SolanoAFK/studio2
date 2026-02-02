"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

async function getUsers(token: string): Promise<User[]> {
  const response = await fetch('/api/usuarios', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to fetch users: ${errorData}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const { token } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      getUsers(token)
        .then(setData)
        .catch(error => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error.message,
          });
        });
    }
  }, [token, toast]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios y sus roles.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
