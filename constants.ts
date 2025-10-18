import { Product } from './types';

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'Artisan Coffee Beans',
    description: 'A rich blend of single-origin beans, ethically sourced and locally roasted. Perfect for a morning boost.',
    price: 15000, // 150.00 ZAR in cents
    imageUrl: 'https://artisancoffeeaccess.files.wordpress.com/2015/04/shutterstock_75410191-96-1500-x-790-coffee-bottom.jpg',
  },
  {
    id: 'prod_002',
    name: 'Handcrafted Leather Wallet',
    description: 'A durable and stylish wallet made from genuine South African leather. Built to last a lifetime.',
    price: 45000, // 450.00 ZAR in cents
    imageUrl: 'https://localislekkerza.co.za/wp-content/uploads/2024/06/IMG-20240626-WA0033.jpg',
  },
  {
    id: 'prod_003',
    name: 'Wireless Bluetooth Earbuds',
    description: 'Crystal-clear sound and a comfortable fit. Enjoy up to 24 hours of playback on a single charge.',
    price: 89900, // 899.00 ZAR in cents
    imageUrl: 'https://m.media-amazon.com/images/I/51pVH9KTSUL._AC_SY679_.jpg',
  },
];
