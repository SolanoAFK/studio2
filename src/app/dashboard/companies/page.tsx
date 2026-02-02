"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Company, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

async function getCompanies(token: string): Promise<Company[]> {
  const response = await fetch('/api/empresas', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to fetch companies: ${errorData}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export default function CompaniesPage() {
  const [data, setData] = useState<Company[]>([]);
  const { token } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      getCompanies(token)
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
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Empresas</h1>
          <p className="text-muted-foreground">Administra las empresas registradas en el portal.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Empresa
        </Button>
      </div>
      <DataTable 
        columns={columns} 
        data={data} 
        filterColumnId="nombre"
        filterPlaceholder="Filtrar por nombre..."
      />
    </div>
  );
}
