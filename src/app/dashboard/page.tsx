"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building2, Users, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const stats = [
    { title: "Proyectos", value: "12", icon: Briefcase, description: "Proyectos activos" },
    { title: "Empresas", value: "5", icon: Building2, description: "Empresas registradas" },
    { title: "Usuarios", value: "42", icon: Users, description: "Usuarios activos" },
    { title: "Roles", value: "3", icon: ShieldCheck, description: "Roles definidos" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido, {user?.nombre || 'Usuario'}!</h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de la actividad en Civil Portal.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Tu Información</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Esta es tu información de usuario actual.</p>
          <ul className="mt-2 list-disc list-inside text-muted-foreground">
            <li><strong>Username:</strong> {user?.username}</li>
            <li><strong>Correo:</strong> {user?.correo}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
