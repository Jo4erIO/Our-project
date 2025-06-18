import type { Product } from '../types/Product';

// Моковые данные для товаров (с расширенной структурой)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Смартфон Samsung Galaxy S23 Ultra',
    price: 89990,
    description: 'Флагманский смартфон с лучшей камерой на рынке',
    images: [
      '/images/products/s23-ultra-1.jpg',
      '/images/products/s23-ultra-2.jpg',
      '/images/products/s23-ultra-3.jpg'
    ],
    category: 'phones',
    rating: 4.8,
    discount: 10,
    stock: 15,
    features: ['256 ГБ памяти', '8K видео', 'S Pen'],
    colors: ['Черный', 'Зеленый', 'Бежевый'],
    details: 'Смартфон Samsung Galaxy S23 Ultra - это воплощение инноваций и мощи. С камерой 200 МП вы сможете делать потрясающие снимки в любых условиях. Мощный процессор Snapdragon 8 Gen 2 обеспечивает невероятную производительность.',
    specifications: [
      {
        title: 'Основные характеристики',
        items: [
          'Диагональ экрана: 6.8 дюйма',
          'Разрешение экрана: 3088 x 1440',
          'Процессор: Snapdragon 8 Gen 2',
          'Оперативная память: 8 ГБ'
        ]
      },
      {
        title: 'Камера',
        items: [
          'Основная камера: 200 МП (широкоугольная) + 12 МП (ультраширокоугольная) + 10 МП (телефото)',
          'Фронтальная камера: 12 МП',
          'Видео: 8K@24fps, 4K@60fps'
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Ноутбук Apple MacBook Pro 16"',
    price: 199990,
    description: 'Мощный ноутбук для профессионалов',
    images: [
      '/images/products/macbook-pro-1.jpg',
      '/images/products/macbook-pro-2.jpg',
      '/images/products/macbook-pro-3.jpg'
    ],
    category: 'laptops',
    rating: 4.9,
    stock: 8,
    features: ['M2 Pro', '32 ГБ ОЗУ', '1 ТБ SSD'],
    colors: ['Серебристый', 'Серый космос'],
    details: 'MacBook Pro 16 дюймов с чипом M2 Pro задает новые стандарты производительности и эффективности. Идеальный выбор для профессионалов в области дизайна, программирования и видеомонтажа.',
    specifications: [
      {
        title: 'Процессор',
        items: [
          'Чип Apple M2 Pro',
          '12-ядерный CPU',
          '19-ядерный GPU',
          '16-ядерный Neural Engine'
        ]
      },
      {
        title: 'Дисплей',
        items: [
          'Диагональ: 16,2 дюйма',
          'Технология: Liquid Retina XDR',
          'Разрешение: 3456 x 2234 пикселей',
          'Частота обновления: 120 Гц'
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Наушники Sony WH-1000XM5',
    price: 29990,
    description: 'Беспроводные наушники с шумоподавлением',
    images: [
      '/images/products/sony-xm5-1.jpg',
      '/images/products/sony-xm5-2.jpg',
      '/images/products/sony-xm5-3.jpg'
    ],
    category: 'headphones',
    rating: 4.7,
    discount: 15,
    stock: 22,
    features: ['Активное шумоподавление', '30 часов работы', 'Сенсорное управление'],
    colors: ['Черный', 'Серебристый', 'Синий'],
    details: 'Флагманские беспроводные наушники Sony WH-1000XM5 с революционной системой шумоподавления. Новые процессоры V1 и QN1 обеспечивают непревзойденное качество звука и максимальную изоляцию от внешних шумов.',
    specifications: [
      {
        title: 'Звук',
        items: [
          'Диапазон частот: 4 Гц - 40 кГц',
          'Кодеки: LDAC, AAC, SBC',
          'Динамики: 30 мм, неодимовые'
        ]
      },
      {
        title: 'Питание',
        items: [
          'Время работы: до 30 часов (с ANC)',
          'Быстрая зарядка: 3 мин = 3 часа работы',
          'Время зарядки: 3,5 часа'
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Умные часы Apple Watch Series 9',
    price: 39990,
    description: 'Следите за здоровьем и получайте уведомления',
    images: [
      '/images/products/watch-9-1.jpg',
      '/images/products/watch-9-2.jpg',
      '/images/products/watch-9-3.jpg'
    ],
    category: 'wearables',
    rating: 4.6,
    stock: 30,
    features: ['Кислород в крови', 'ЭКГ', 'Водонепроницаемость'],
    colors: ['Midnight', 'Starlight', 'Product Red'],
    details: 'Apple Watch Series 9 - самые совершенные умные часы Apple. С новым процессором S9, ярким дисплеем и расширенными функциями для здоровья. Идеальный спутник для спорта и повседневной жизни.',
    specifications: [
      {
        title: 'Дисплей',
        items: [
          'Диагональ: 45 мм',
          'Технология: LTPO OLED',
          'Яркость: до 2000 нит'
        ]
      },
      {
        title: 'Датчики',
        items: [
          'Оптический пульсометр',
          'Электрический датчик сердца',
          'Датчик SpO2',
          'Акселерометр',
          'Гироскоп'
        ]
      }
    ]
  }
];

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mockProducts);
      } catch (error) {
        reject(new Error(`Ошибка загрузки данных: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    }, 800);
  });
};

export const fetchProductById = (id: string): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const product = mockProducts.find(p => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Товар не найден'));
        }
      } catch (error) {
        reject(new Error(`Ошибка загрузки товара: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    }, 500);
  });
};