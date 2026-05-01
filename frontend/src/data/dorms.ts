import sapphire from '../../assets/sapphire.jpg';
import sapphire2 from '../../assets/sapphire1.jpg';

export const dormData = [
  {
    id: 1,
    name: 'One Sapphire Place',
    rating: '4.1',
    price: {
      min: 7500,
      max: 8000,
    },
    location: 'Sapphire St., Los Baños',
    image: sapphire,
    room_types: [
      { pax: '1 pax', price: 12000 },
      { pax: '4 pax', price: 3500 },
    ],
  },
  {
    id: 2,
    name: 'Emerald Heights',
    rating: '3.7',
    price: {
      min: 4000,
      max: 8000,
    },
    location: 'Umali Subdivision, Los Baños',
    image: sapphire2,
    room_types: [
      { pax: '1 pax', price: 15000 },
      { pax: '4 pax', price: 4000 },
      { pax: '4 pax', price: 3500 },
    ],
  },
];
