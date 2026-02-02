import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RolesPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Roles y Permisos</h1>
        <p className="text-muted-foreground">Define los roles y asigna permisos a cada uno.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Roles y Permisos</CardTitle>
          <CardDescription>
            Próximamente: una interfaz para gestionar roles y asignarles permisos específicos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido de la página de roles y permisos en construcción...</p>
        </CardContent>
      </Card>
    </div>
  );
}
