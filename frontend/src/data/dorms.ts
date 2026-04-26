// sample data
import sapphirePic from '../../assets/sapphire.jpg';
import sapphirePic1 from '../../assets/sapphire2.jpg';

export const dormData = [
  {
    id: 1,
    name: 'Two Sapphire Place',
    rating: '4.1',
    price: {
      min: 7500,
      max: 8000,
    },
    location: 'Sapphire St., Los Baños',
    image: sapphirePic,
    room_types: [
      { pax: '1 pax', price: 12000 },
      { pax: '4 pax', price: 3500 },
    ],
  },
  {
    id: 2,
    name: 'One Sapphire Place',
    rating: '3.7',
    price: {
      min: 4000,
      max: 8000,
    },
    location: 'Umali Subdivision, Los Baños',
    image: sapphirePic1,
    room_types: [
      { pax: '1 pax', price: 15000 },
      { pax: '4 pax', price: 4000 },
      { pax: '4 pax', price: 3500 },
    ],
  },
];
