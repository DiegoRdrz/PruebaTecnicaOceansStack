// src/components/CreateProductForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../validators/productSchema';
import type { ProductCreateInput } from '../api/products';
import { Button } from './Button';
import { z } from 'zod';

const formSchema = productSchema;

type FormValues = z.infer<typeof formSchema>;

interface Props {
  onCreate: (data: ProductCreateInput) => void;
}

export const CreateProductForm = ({ onCreate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

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
