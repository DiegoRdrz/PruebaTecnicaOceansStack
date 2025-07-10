import { useContext, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { CreateProductForm } from '../components/CreateProductForm';
import { AuthContext } from '../context/AuthContext';

const ProductsPage = () => {
  const {
    products,
    loading,
    error,
    deleteProduct,
    fetchProducts,
    createProduct,
  } = useProducts();

  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data: Parameters<typeof createProduct>[0]) => {
    await createProduct(data);
    setShowForm(false); // cerrar el formulario después de crear
  };

  return (
    <div className="p-6 max-w-5xl mx-auto mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <div>
          <Button onClick={() => setShowForm(!showForm)} className="mr-2">
            {showForm ? 'Cancelar' : 'Nuevo producto'}
          </Button>
          <Button onClick={fetchProducts}>Refrescar</Button>
        </div>
      </div>

      {user?.role === 'ADMIN' && showForm && (
        <CreateProductForm onCreate={handleCreate} />
      )}

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {products.length === 0 && !loading ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => deleteProduct(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
