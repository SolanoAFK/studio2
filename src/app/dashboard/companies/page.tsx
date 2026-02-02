"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Company, columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { NewCompanyForm } from "./new-company-form";

async function getCompanies(token: string): Promise<Company[]> {
  const response = await fetch('/api/empresas', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    const errorData = await response.text();
    try {
      const errorJson = JSON.parse(errorData);
      throw new Error(errorJson.message || `Failed to fetch companies: ${errorData}`);
    } catch {
      throw new Error(`Failed to fetch companies: ${errorData}`);
    }
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export default function CompaniesPage() {
  const [data, setData] = useState<Company[]>([]);
  const { token } = useAuth();
  const { toast } = useToast();

  const fetchCompanies = useCallback(() => {
    if (token) {
      getCompanies(token)
        .then(setData)
        .catch(error => {
          toast({
            variant: "destructive",
            title: "Error al cargar empresas",
            description: error.message,
          });
          setData([]); // Clear data on error
        });
    }
  }, [token, toast]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Empresas</h1>
          <p className="text-muted-foreground">Administra las empresas registradas en el portal.</p>
        </div>
        <NewCompanyForm onCompanyCreated={fetchCompanies} />
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
