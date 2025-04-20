// data.js
export const products = [
  {
    id: 1,
    name: "Egg Chicken Red",
    capacity: "4pcs",
    brand:"Coccola",
    price: 1.99,
    unit: "Piece",
    category: "Eggs",
    subCategory: "Eggs",
    image: require('./assets/eggred.png'),
  },
  {
    id: 2,
    name: "Egg Chicken White",
    capacity: "180g",
    brand:"Coccola",
    price: 1.50,
    unit: "Piece",
    category: "Eggs",
    subCategory: "Eggs",
    image: require('./assets/eggwhite.png'),
  },
  {
    id: 3,
    name: "Egg Pasta",
    capacity: "30gm",
    brand:"Coccola",
    price: 15.99,
    unit: "Piece",
    category: "Eggs",
    subCategory: "Eggs",
    image: require('./assets/eggpasta.png'),
  },
  {
    id: 4,
    name: "Egg Noodles",
    capacity: "2L",
    brand:"Coccola",
    price: 15.99,
    unit: "Piece",
    category: "Eggs",
    subCategory: "Eggs",
    image: require('./assets/eggnoodle.png'),
  },
  {
    id: 5,
    name: "Mayameda Egglets",
    capacity: "325ml",
    brand:"Coccola",
    price: 12.99,
    unit: "Price",
    category: "Eggs",
    subCategory: "Egg Products",
    image: require('./assets/mayo.png'),
  },
  {
    id: 6,
    name: "Egg Noodles ",
    capacity: "330ml",
    brand:"Coccola",
    price: 24.99,
    unit: "Price",
    category: "Eggs",
    subCategory: "Egg Products",
    image: require('./assets/eggno.png'),
  }
];

export const filters = {
  categories: ["Eggs", "Noodles & Pasta", "Chips & Crisps", "Fast Food"],
  brands: ["Individual Collection", "Coccola", "Ifad", "Kazi Farmas"]
};