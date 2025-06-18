import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '../components/ui/Container';
import { fetchProductById } from '../api/ProductsApi';
import type { Product } from '../types/Product';
import { FiArrowLeft, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import SimilarProducts from '../components/product/SimilarProducts';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (err) {
        setError('Не удалось загрузить товар. Попробуйте позже.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
        <div className="animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-100 rounded-xl h-96"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
        <div className="text-center py-12">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-xl mx-auto">
            <h3 className="font-bold text-lg mb-2">Ошибка!</h3>
            <p>{error}</p>
            <Link 
              to="/" 
              className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              На главную
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
        <div className="text-center py-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Товар не найден</h3>
            <p className="text-gray-600 mb-6">
              К сожалению, запрошенный товар отсутствует в нашем каталоге.
            </p>
            <Link 
              to="/" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-flex items-center hover:bg-indigo-700 transition-colors"
            >
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItem({
      id: `${product.id}-${selectedColor}`,
      name: `${product.name} (${selectedColor})`,
      price: product.price,
      quantity: 1
    }));
  };

  return (
    <Container className="py-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen">
      <div className="mb-6">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
          <FiArrowLeft className="mr-2" />
          Назад к каталогу
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Галерея изображений */}
        <div>
          <div className="bg-gray-100 rounded-xl p-4 mb-4 flex justify-center items-center h-[500px]">
            {product.images && product.images.length > 0 ? (
              <div 
                className="bg-cover bg-center w-full h-full rounded-lg transition-all duration-300"
                style={{ backgroundImage: `url(${product.images[selectedImage]})` }}
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 border-2 rounded-lg overflow-hidden w-24 h-24 transition-all ${
                    selectedImage === index 
                      ? 'border-indigo-500 scale-105' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <div 
                    className="bg-cover bg-center w-full h-full" 
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Информация о товаре */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-4">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </div>
            <span className="text-gray-500">(124 отзыва)</span>
          </div>

          <div className="flex items-end mb-6">
            {product.discount ? (
              <>
                <span className="text-4xl font-bold text-red-600 mr-3">
                  {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {product.price.toLocaleString()} ₽
                </span>
                <span className="ml-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              </>
            ) : (
              <span className="text-4xl font-bold text-gray-800">
                {product.price.toLocaleString()} ₽
              </span>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Цвет</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`px-4 py-2 border-2 rounded-full transition-all ${
                      selectedColor === color 
                        ? 'bg-indigo-100 border-indigo-500 font-medium' 
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-4 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              <FiShoppingCart className="mr-2" size={20} />
              Добавить в корзину
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-4 border-2 rounded-lg transition-colors ${
                isFavorite 
                  ? 'bg-red-50 border-red-300 text-red-500' 
                  : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              <FiHeart size={24} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Описание</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            {product.details && (
              <p className="text-gray-700 mt-4 leading-relaxed">{product.details}</p>
            )}
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Ключевые особенности</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Технические характеристики</h3>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="mb-5 last:mb-0">
                    <h4 className="font-medium text-lg text-gray-800 mb-3">{spec.title}</h4>
                    <ul className="space-y-2">
                      {spec.items.map((item, i) => (
                        <li key={i} className="flex justify-between border-b border-gray-100 pb-2">
                          <span className="text-gray-600">{item.split(':')[0]}:</span>
                          <span className="font-medium">{item.split(':').slice(1).join(':').trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Похожие товары */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
        <SimilarProducts currentProductId={product.id} category={product.category} />
      </div>
    </Container>
  );
}