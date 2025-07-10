// src/components/CreateProductForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../validators/productSchema';
import type { ProductCreateInput } from '../api/products';
import { Button } from './Button';
import { z } from 'zod';



type FormValues = z.infer<typeof productSchema>;

interface Props {
  onCreate: (data: ProductCreateInput) => void; // Callback para crear un producto
}

// Formulario para crear un nuevo producto con validación mediante Zod
export const CreateProductForm = ({ onCreate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
  });

  // Enviar datos validados y resetear formulario
  const onSubmit = (data: FormValues) => {
    onCreate(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow rounded p-4 mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">Crear nuevo producto</h2>

      {/* Input para nombre del producto con mensaje de error */}
      <div className="mb-4">
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          {...register('name')}
          className="w-full border rounded p-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Input para precio del producto con validación y error */}
      <div className="mb-4">
        <label className="block font-medium">Precio</label>
        <input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className="w-full border rounded p-2"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <Button type="submit">Agregar producto</Button>
    </form>
  );
};
