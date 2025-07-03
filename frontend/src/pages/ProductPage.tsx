import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { fetchProductById } from '@/api/ProductsApi';
import type { Product } from '@/types/Product';
import { FiArrowLeft, FiShoppingCart, FiHeart, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem } from '@/store/cartSlice';
import SimilarProducts from '@/components/product/SimilarProducts';
import { motion } from 'framer-motion';
import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice';
import { selectCurrentUserId } from '@/store/authSlice';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useAppDispatch();
  
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isFavorite = wishlistItems.some(item => item.id === product?.id);
  const userId = useAppSelector(selectCurrentUserId);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
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

  const handleAddToCart = () => {
    if (!product) return;
    
    dispatch(addItem({
      id: `${product.id}-${selectedColor}`,
      productId: product.id,
      name: `${product.name}${selectedColor ? ` (${selectedColor})` : ''}`,
      price: product.discount
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price,
      quantity: 1,
      image: product.images[0]
    }));
  };

  const handleWishlistToggle = async () => {
    if (!product || !userId) return;
    
    try {
      if (isFavorite) {
        await dispatch(removeFromWishlist(product.id)).unwrap();
      } else {
        await dispatch(addToWishlist(product.id)).unwrap();
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name || 'Товар в TechShop',
        text: `Посмотрите этот товар: ${product?.name}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена');
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product?.images && product.images.length > 0) {
      setSelectedImage(prevIndex =>
        (prevIndex + 1) % product.images.length
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product?.images && product.images.length > 0) {
      setSelectedImage(prevIndex =>
        (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };

  const isLightColor = (hexColor: string): boolean => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  if (loading) {
    return (
      <Container className="py-8 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <Breadcrumbs />
        <div className="animate-pulse">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-[500px]"></div>
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <Breadcrumbs />
        <div className="text-center py-12">
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg max-w-xl mx-auto">
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
      <Container className="py-8 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <Breadcrumbs />
        <div className="text-center py-12">
          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-6 max-w-xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Товар не найден</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
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

  return (
    <>
      <Helmet>
        <title>{product.name} - TechShop</title>
        <meta name="description"
        content={product.description.substring(0, 160)} />
      </Helmet>
      
      <Container className="py-8 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <Breadcrumbs />
        
        <div className="mb-6">
          <Link to="/" className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
            <FiArrowLeft className="mr-2" />
            Назад к каталогу
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          <div className="relative">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex justify-center items-center mb-4 relative product-image-container">
              {product.images?.[selectedImage] ? (
                <>
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                
                  {product.images.length > 1 && (
                    <>
                      <button
                        className="image-nav-button left-2"
                        onClick={prevImage}
                      >
                        <FiChevronLeft size={24} />
                      </button>
                      <button
                        className="image-nav-button right-2"
                        onClick={nextImage}
                      >
                        <FiChevronRight size={24} />
                      </button>
                    
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5 z-10">
                        {product.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === selectedImage
                                ? 'bg-white w-4'
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                  <span>No Image</span>
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index ? 'border-indigo-500 scale-105' : 'border-transparent'
                    }`}
                  >
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  </button>
                ))}
              </div>
            )}
          </div>
        
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiShare2 size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 mr-4">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-gray-500 dark:text-gray-400">(124 отзыва)</span>
            </div>
            <div className="flex items-end mb-6">
              {product.discount ? (
                <>
                  <span className="text-4xl font-bold text-red-600 dark:text-red-500 mr-3">
                    {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                  </span>
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    {product.price.toLocaleString()} ₽
                  </span>
                  <span className="ml-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                  {product.price.toLocaleString()} ₽
                </span>
              )}
            </div>
            
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Цвет: <span className="font-normal">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`px-4 py-2 border-2 rounded-full transition-all ${
                        selectedColor === color
                          ? 'border-indigo-600 shadow-lg font-medium scale-105'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400'
                      }`}
                      style={{
                        backgroundColor: getColorHex(color),
                        color: isLightColor(getColorHex(color)) ? '#000' : '#fff',
                        boxShadow: selectedColor === color
                          ? '0 0 0 2px white, 0 0 0 4px rgb(79 70 229)'
                          : 'none',
                        animation: selectedColor === color
                          ? 'pulse 1s ease'
                          : 'none'
                      }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-4 mb-8">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white py-4 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiShoppingCart className="mr-2" size={20} />
                Добавить в корзину
              </motion.button>
              
              <motion.button
                onClick={handleWishlistToggle}
                className={`p-4 border-2 rounded-lg transition-colors ${
                  isFavorite
                    ? 'bg-red-50 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-500 shadow-inner'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHeart size={24} className={isFavorite ? 'fill-current' : ''} />
              </motion.button>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Описание</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
              {product.details && (
                <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">{product.details}</p>
              )}
            </div>
            
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Ключевые особенности</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Технические характеристики</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="mb-5 last:mb-0">
                      <h4 className="font-medium text-lg text-gray-800 dark:text-gray-200 mb-3">{spec.title}</h4>
                      <ul className="space-y-2">
                        {spec.items.map((item, i) => {
                          const colonIndex = item.indexOf(':');
                          const name = colonIndex !== -1 ? item.substring(0, colonIndex) : item;
                          const value = colonIndex !== -1 ? item.substring(colonIndex + 1) : '';
                          return (
                            <li
                              key={i}
                              className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2"
                            >
                              <span className="text-gray-600 dark:text-gray-400">
                                {name.trim()}
                              </span>
                              <span className="font-medium text-gray-800 dark:text-gray-200 text-right">
                                {value.trim()}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Похожие товары</h2>
          <SimilarProducts
            currentProductId={product.id}
            category={product.category}
          />
        </div>
      </Container>
    </>
  );
}

function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'черный': '#000000',
    'чёрный': '#000000',
    'белый': '#FFFFFF',
    'серебристый': '#C0C0C0',
    'серебро': '#C0C0C0',
    'золотой': '#FFD700',
    'золото': '#FFD700',
    'синий': '#0000FF',
    'голубой': '#00BFFF',
    'красный': '#FF0000',
    'розовый': '#FFC0CB',
    'зеленый': '#008000',
    'зелёный': '#008000',
    'фиолетовый': '#800080',
    'оранжевый': '#FFA500',
    'желтый': '#FFFF00',
    'жёлтый': '#FFFF00',
    'серый': '#808080',
    'бежевый': '#F5F5DC',
    'коричневый': '#A52A2A',
    'бирюзовый': '#40E0D0',
    'бордовый': '#800000',
    'салатовый': '#7FFF00',
    'сиреневый': '#C8A2C8',
    'хаки': '#C3B091',
    'прозрачный': 'transparent',
    'midnight': '#191970',
    'starlight': '#E5E4E2',
    'product red': '#E60026',
    'серый космос': '#4C5866'
  };

  return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}