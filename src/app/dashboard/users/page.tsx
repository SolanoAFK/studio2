"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { User, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { NewUserForm } from "./new-user-form";

async function getUsers(token: string): Promise<User[]> {
  const response = await fetch('/api/usuarios', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const errorData = await response.text();
    try {
      const errorJson = JSON.parse(errorData);
      throw new Error(errorJson.message || `Failed to fetch users: ${errorData}`);
    } catch {
      throw new Error(`Failed to fetch users: ${errorData}`);
    }
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const { token } = useAuth();
  const { toast } = useToast();

  const fetchUsers = useCallback(() => {
    if (token) {
      getUsers(token)
        .then(setData)
        .catch(error => {
          toast({
            variant: "destructive",
            title: "Error al cargar usuarios",
            description: error.message,
          });
          setData([]); // Clear data on error
        });
    }
  }, [token, toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground">
            Administra los usuarios y sus roles.
          </p>
        </div>
        <NewUserForm onUserCreated={fetchUsers} />
      </div>
      <DataTable 
        columns={columns} 
        data={data}
        filterColumnId="correo"
        filterPlaceholder="Filtrar por correo..."
      />
    </div>
  );
}
