"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

type ProductFormProps = {
  product?: Product;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
};

export default function ProductForm({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  // Inicializa o formulário com valores padrão ou dados do produto
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: product || {
      id: Date.now(),
      name: "",
      description: "",
      price: 0,
      available: true,
    },
  });

  function handleFormSubmit(data: Product) {
    // Converte o preço para número
    const formattedData = {
      ...data,
      price: Number(data.price.toString().replace(",", ".")),
      available: Boolean(data.available),
    };
    onSubmit(formattedData);
  }

  // Função para permitir apenas números e vírgula
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    // Permite apenas números, vírgula, backspace e delete
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ",",
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }

    // Permite apenas uma vírgula
    if (
      event.key === "," &&
      (event.currentTarget.value.includes(",") ||
        event.currentTarget.value === "")
    ) {
      event.preventDefault();
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Nome
        </Label>
        <Input
          id="name"
          {...register("name", { required: "Nome é obrigatório" })}
          placeholder="Nome do produto"
          className="mt-1"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">
            {errors.name.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Descrição
        </Label>
        <Textarea
          id="description"
          {...register("description", { required: "Descrição é obrigatória" })}
          placeholder="Descrição do produto"
          className="mt-1"
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">
            {errors.description.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price" className="text-sm font-medium">
          Preço
        </Label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">R$</span>
          <Input
            id="price"
            {...register("price", {
              required: "Preço é obrigatório",
              pattern: {
                value: /^\d+([,.]\d{1,2})?$/,
                message: "Digite um preço válido",
              },
            })}
            placeholder="0,00"
            className="pl-8"
            onKeyDown={handleKeyPress}
            inputMode="numeric" // Mostra teclado numérico em dispositivos móveis
          />
        </div>
        {errors.price && (
          <p className="text-sm text-red-500 mt-1">
            {errors.price.message as string}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Controller
          name="available"
          control={control}
          defaultValue={product ? product.available : true}
          render={({ field }) => (
            <Switch
              id="available"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="available" className="text-sm font-medium">
          Disponível
        </Label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
