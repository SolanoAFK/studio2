import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">Administra los usuarios y sus roles.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>
            Próximamente: una tabla con todos los usuarios, con opciones para asignar roles, editar y crear nuevos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido de la página de usuarios en construcción...</p>
        </CardContent>
      </Card>
    </div>
  );
}
