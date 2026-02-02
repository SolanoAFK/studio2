import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Proyectos</h1>
        <p className="text-muted-foreground">Crea, visualiza y administra todos los proyectos.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Proyectos</CardTitle>
          <CardDescription>
            Próximamente: una tabla con todos los proyectos, con opciones para filtrar, editar y crear nuevos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Contenido de la página de proyectos en construcción...</p>
        </CardContent>
      </Card>
    </div>
  );
}
