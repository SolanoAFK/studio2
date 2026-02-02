"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, PlusCircle } from "lucide-react";
import type { Company } from "../companies/columns";

const formSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  username: z.string().min(3, { message: "El username debe tener al menos 3 caracteres." }),
  correo: z.string().email({ message: "Por favor, introduce un correo válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  empresaId: z.string({ required_error: "Por favor, selecciona una empresa." }),
  estado: z.boolean().default(true),
});

type NewUserFormProps = {
  onUserCreated: () => void;
};

export function NewUserForm({ onUserCreated }: NewUserFormProps) {
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const { token } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      username: "",
      correo: "",
      password: "",
      estado: true,
    },
  });

  useEffect(() => {
    if (open && token) {
      const fetchCompanies = async () => {
        try {
          const response = await fetch("/api/empresas/activas", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error("No se pudieron cargar las empresas.");
          const data = await response.json();
          setCompanies(Array.isArray(data) ? data : []);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudieron cargar las empresas para el selector.",
          });
        }
      };
      fetchCompanies();
    }
  }, [open, token, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast({ variant: "destructive", title: "Error", description: "No estás autenticado." });
      return;
    }

    const { empresaId, ...rest } = values;
    const apiBody = {
      ...rest,
      empresa: { id: parseInt(empresaId, 10) },
    };

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el usuario.");
      }

      toast({
        title: "Éxito",
        description: "El usuario ha sido creado correctamente.",
      });

      form.reset();
      onUserCreated();
      setOpen(false);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado.";
      toast({
        variant: "destructive",
        title: "Error al crear usuario",
        description: errorMessage,
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Crear Nuevo Usuario</SheetTitle>
          <SheetDescription>
            Rellena los datos para registrar un nuevo usuario en el sistema.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-6">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="jperez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="correo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="juan.perez@empresa.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="empresaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una empresa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={String(company.id)}>
                          {company.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Estado Activo</FormLabel>
                    <FormDescription>
                      Indica si el usuario está activo o inactivo.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <SheetFooter className="pt-4">
                <SheetClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                </SheetClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Crear Usuario
                </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
