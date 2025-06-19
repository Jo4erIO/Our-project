import ProductCard from './ProductCard';
import type { Product } from '../../types/Product';

interface Props {
  products: Product[];
  title: string;
}

export default function ProductGrid({ products, title }: Props) {
  return (
    <section className="w-full mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Показать все
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}