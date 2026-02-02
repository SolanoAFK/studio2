"use client";

import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { user } = useAuth();

  const getInitials = (name: string = "") => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfil de Usuario</h1>
        <p className="text-muted-foreground">Gestiona la información de tu cuenta.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Perfil</CardTitle>
          <CardDescription>Esta es la información asociada a tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage
                    src={`https://avatar.vercel.sh/${user.username}.png`}
                    alt={user.username}
                    />
                    <AvatarFallback>{getInitials(user.nombre)}</AvatarFallback>
                </Avatar>
                <Button>Cambiar foto</Button>
            </div>
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input id="fullName" defaultValue={user.nombre} readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue={user.username} readOnly />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" defaultValue={user.correo} readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
