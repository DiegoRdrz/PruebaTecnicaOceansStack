// src/components/CreateOrderForm.tsx
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Product } from '../types/product';
import { Button } from './Button';
import { useMemo, useState } from 'react';
import { orderSchema } from '../validators/orderSchema';
import type { z } from 'zod';

type OrderFormData = z.infer<typeof orderSchema>;

interface Props {
  products: Product[];
  onCreate: (data: OrderFormData) => void;
}

export const CreateOrderForm = ({ products, onCreate }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: [{ productId: 0, quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');
  const [confirmedIndexes, setConfirmedIndexes] = useState<number[]>([]);

  const toggleConfirm = (index: number) => {
    if (confirmedIndexes.includes(index)) {
      setConfirmedIndexes(prev => prev.filter(i => i !== index));
    } else {
      const item = items[index];
      if (item.productId > 0 && item.quantity > 0) {
        setConfirmedIndexes(prev => [...prev, index]);
      }
    }
  };

  const handleRemove = (index: number) => {
    remove(index);
    setConfirmedIndexes(prev => prev.filter(i => i !== index));
  };

  const total = useMemo(() => {
    return confirmedIndexes.reduce((sum, index) => {
      const item = items[index];
      const product = products.find(p => p.id === item?.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [confirmedIndexes, items, products]);

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: OrderFormData) => {
    setSubmitting(true);
    try {
      await onCreate(data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Crear nueva orden</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Productos</label>

        {fields.map((field, index) => {
          const isConfirmed = confirmedIndexes.includes(index);

          return (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <select
                {...register(`items.${index}.productId`, { valueAsNumber: true })}
                className="flex-1 border rounded p-2"
                disabled={isConfirmed}
              >
                <option value={0}>Seleccione producto</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price.toFixed(2)}
                  </option>
                ))}
              </select>

              <input
                type="number"
                {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                min={1}
                className="w-20 border rounded p-2 no-spinner"
                disabled={isConfirmed}
              />

              <button
                type="button"
                onClick={() => toggleConfirm(index)}
                className={`text-lg px-2 ${isConfirmed ? 'text-blue-600' : 'text-green-600'}`}
                title={isConfirmed ? 'Editar producto' : 'Confirmar producto'}
              >
                {isConfirmed ? '✏️' : '✅'}
              </button>

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-600 text-lg px-2"
                title="Eliminar producto"
              >
                ❌
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => append({ productId: 0, quantity: 1 })}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Agregar producto
        </button>
      </div>

      <p className="font-semibold mb-4">Total confirmado: ${total.toFixed(2)}</p>

      <Button type="submit" disabled={submitting || confirmedIndexes.length !== items.length}>
        {submitting ? 'Creando...' : 'Crear orden'}
      </Button>

      {confirmedIndexes.length !== items.length && (
        <p className="text-sm text-red-500 mt-2">
          Debes confirmar todos los productos antes de crear la orden.
        </p>
      )}
    </form>
  );
};
