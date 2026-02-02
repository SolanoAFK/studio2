import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Empresas</h1>
        <p className="text-muted-foreground">Administra las empresas registradas en el portal.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Empresas</CardTitle>
          <CardDescription>
            Próximamente: una tabla con todas las empresas, con opciones para editar y crear nuevas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido de la página de empresas en construcción...</p>
        </CardContent>
      </Card>
    </div>
  );
}
