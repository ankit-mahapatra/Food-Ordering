import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

type MenuData = [
  name: string,
  description: string,
  price: number,
  cuisine: string,
  dietType: string,
  spiceLevel: string
];

const menuData: MenuData[] = [
  // PIZZA
  [
    "Margherita Pizza",
    "Classic pizza with tomato sauce, mozzarella and basil.",
    249,
    "Italian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Farmhouse Pizza",
    "Loaded pizza with onion, capsicum, tomato and mushrooms.",
    329,
    "Italian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Paneer Tikka Pizza",
    "Pizza topped with spicy paneer tikka, onion and capsicum.",
    349,
    "Italian",
    "Vegetarian",
    "Medium",
  ],
  [
    "Chicken Pepperoni Pizza",
    "Cheesy pizza topped with chicken pepperoni.",
    399,
    "Italian",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Veggie Delight Pizza",
    "Fresh vegetables, olives, corn and mozzarella.",
    299,
    "Italian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Spicy Chicken Pizza",
    "Chicken, jalapeno, onion and spicy sauce.",
    379,
    "Italian",
    "Non-Vegetarian",
    "Hot",
  ],

  // BURGERS
  [
    "Classic Veg Burger",
    "Crispy vegetable patty with lettuce, tomato and sauce.",
    149,
    "American",
    "Vegetarian",
    "Mild",
  ],
  [
    "Cheese Burger",
    "Classic burger with cheese, lettuce and special sauce.",
    179,
    "American",
    "Vegetarian",
    "Mild",
  ],
  [
    "Paneer Burger",
    "Grilled paneer patty with fresh vegetables and sauce.",
    199,
    "American",
    "Vegetarian",
    "Medium",
  ],
  [
    "Chicken Burger",
    "Crispy chicken patty with lettuce and mayonnaise.",
    219,
    "American",
    "Non-Vegetarian",
    "Mild",
  ],
  [
    "Spicy Chicken Burger",
    "Crispy chicken patty with spicy sauce and jalapenos.",
    239,
    "American",
    "Non-Vegetarian",
    "Hot",
  ],

  // BIRYANI
  [
    "Veg Biryani",
    "Fragrant basmati rice cooked with vegetables and spices.",
    229,
    "Indian",
    "Vegetarian",
    "Medium",
  ],
  [
    "Chicken Biryani",
    "Aromatic basmati rice cooked with tender chicken and spices.",
    299,
    "Indian",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Mutton Biryani",
    "Slow-cooked mutton with fragrant basmati rice.",
    399,
    "Indian",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Egg Biryani",
    "Basmati rice with boiled eggs and aromatic spices.",
    249,
    "Indian",
    "Non-Vegetarian",
    "Medium",
  ],

  // INDIAN
  [
    "Paneer Butter Masala",
    "Soft paneer cubes cooked in creamy tomato gravy.",
    249,
    "Indian",
    "Vegetarian",
    "Medium",
  ],
  [
    "Dal Tadka",
    "Yellow lentils tempered with Indian spices.",
    169,
    "Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chole",
    "Spiced chickpeas cooked in traditional Indian gravy.",
    159,
    "Indian",
    "Vegetarian",
    "Medium",
  ],
  [
    "Rajma Masala",
    "Red kidney beans cooked in a rich tomato gravy.",
    179,
    "Indian",
    "Vegetarian",
    "Medium",
  ],

  // NORTH INDIAN
  [
    "Butter Naan",
    "Soft Indian bread brushed with butter.",
    69,
    "North Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Garlic Naan",
    "Soft naan topped with garlic and coriander.",
    89,
    "North Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Tandoori Roti",
    "Traditional whole wheat bread cooked in tandoor.",
    49,
    "North Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Paneer Tikka",
    "Marinated paneer grilled with onion and capsicum.",
    249,
    "North Indian",
    "Vegetarian",
    "Medium",
  ],
  [
    "Chicken Tikka",
    "Tender chicken pieces marinated and grilled in tandoor.",
    299,
    "North Indian",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Chicken Tandoori",
    "Classic tandoori chicken marinated with Indian spices.",
    329,
    "North Indian",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Paneer Lababdar",
    "Paneer cooked in a rich creamy tomato gravy.",
    259,
    "North Indian",
    "Vegetarian",
    "Medium",
  ],

  // SOUTH INDIAN
  [
    "Masala Dosa",
    "Crispy dosa served with potato masala, sambar and chutney.",
    129,
    "South Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Plain Dosa",
    "Crispy traditional South Indian dosa.",
    99,
    "South Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Idli Sambar",
    "Soft steamed idlis served with sambar and chutney.",
    109,
    "South Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Medu Vada",
    "Crispy lentil fritters served with sambar and chutney.",
    119,
    "South Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Onion Uttapam",
    "Thick South Indian pancake topped with onion and herbs.",
    139,
    "South Indian",
    "Vegetarian",
    "Mild",
  ],

  // CHINESE
  [
    "Veg Hakka Noodles",
    "Stir-fried noodles with fresh vegetables and sauces.",
    179,
    "Chinese",
    "Vegetarian",
    "Medium",
  ],
  [
    "Chicken Hakka Noodles",
    "Stir-fried noodles with chicken and vegetables.",
    219,
    "Chinese",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Veg Fried Rice",
    "Fried rice with vegetables and Chinese sauces.",
    169,
    "Chinese",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chicken Fried Rice",
    "Fried rice with chicken, vegetables and sauces.",
    209,
    "Chinese",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Veg Manchurian",
    "Crispy vegetable balls tossed in Manchurian sauce.",
    189,
    "Chinese",
    "Vegetarian",
    "Medium",
  ],
  [
    "Chilli Paneer",
    "Crispy paneer tossed with peppers and chilli sauce.",
    229,
    "Chinese",
    "Vegetarian",
    "Hot",
  ],
  [
    "Chilli Chicken",
    "Crispy chicken tossed with chilli and peppers.",
    249,
    "Chinese",
    "Non-Vegetarian",
    "Hot",
  ],
  [
    "Veg Spring Rolls",
    "Crispy rolls filled with seasoned vegetables.",
    159,
    "Chinese",
    "Vegetarian",
    "Mild",
  ],
  [
    "Veg Momos",
    "Steamed dumplings filled with seasoned vegetables.",
    149,
    "Chinese",
    "Vegetarian",
    "Medium",
  ],

  // PASTA
  [
    "White Sauce Pasta",
    "Creamy pasta cooked with herbs and vegetables.",
    219,
    "Italian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Red Sauce Pasta",
    "Pasta tossed in rich tomato and herb sauce.",
    199,
    "Italian",
    "Vegetarian",
    "Medium",
  ],
  [
    "Arrabbiata Pasta",
    "Pasta cooked with spicy tomato sauce and herbs.",
    229,
    "Italian",
    "Vegetarian",
    "Hot",
  ],
  [
    "Chicken Pasta",
    "Creamy pasta with grilled chicken and herbs.",
    269,
    "Italian",
    "Non-Vegetarian",
    "Mild",
  ],
  [
    "Cheesy Macaroni",
    "Creamy macaroni loaded with melted cheese.",
    189,
    "Italian",
    "Vegetarian",
    "Mild",
  ],

  // SANDWICHES
  [
    "Veg Sandwich",
    "Fresh vegetable sandwich with cheese and sauce.",
    119,
    "Continental",
    "Vegetarian",
    "Mild",
  ],
  [
    "Grilled Cheese Sandwich",
    "Grilled bread filled with melted cheese.",
    149,
    "Continental",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chicken Sandwich",
    "Grilled chicken with lettuce, tomato and mayonnaise.",
    189,
    "Continental",
    "Non-Vegetarian",
    "Mild",
  ],
  [
    "Paneer Sandwich",
    "Grilled paneer with vegetables and creamy sauce.",
    169,
    "Continental",
    "Vegetarian",
    "Medium",
  ],

  // SNACKS
  [
    "French Fries",
    "Crispy golden potato fries.",
    99,
    "Fast Food",
    "Vegetarian",
    "Mild",
  ],
  [
    "Peri Peri Fries",
    "Crispy fries tossed in peri peri seasoning.",
    129,
    "Fast Food",
    "Vegetarian",
    "Hot",
  ],
  [
    "Chicken Wings",
    "Crispy chicken wings tossed in spicy sauce.",
    249,
    "Fast Food",
    "Non-Vegetarian",
    "Hot",
  ],
  [
    "Chicken Nuggets",
    "Crispy bite-sized chicken nuggets.",
    199,
    "Fast Food",
    "Non-Vegetarian",
    "Mild",
  ],
  [
    "Cheese Balls",
    "Crispy cheese-filled snack balls.",
    159,
    "Fast Food",
    "Vegetarian",
    "Mild",
  ],
  [
    "Onion Rings",
    "Crispy battered onion rings.",
    119,
    "Fast Food",
    "Vegetarian",
    "Mild",
  ],

  // BREAKFAST
  [
    "Poha",
    "Flattened rice cooked with onion, peanuts and spices.",
    89,
    "Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Upma",
    "Traditional semolina breakfast with vegetables.",
    89,
    "Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chole Bhature",
    "Spiced chickpeas served with fluffy bhature.",
    159,
    "North Indian",
    "Vegetarian",
    "Medium",
  ],
  [
    "Masala Omelette",
    "Egg omelette prepared with onion, tomato and spices.",
    129,
    "Indian",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Egg Bhurji",
    "Scrambled eggs cooked with onion, tomato and spices.",
    139,
    "Indian",
    "Non-Vegetarian",
    "Medium",
  ],

  // HEALTHY
  [
    "Green Salad",
    "Fresh cucumber, tomato, lettuce and seasonal vegetables.",
    129,
    "Healthy",
    "Vegetarian",
    "Mild",
  ],
  [
    "Protein Bowl",
    "Healthy bowl with paneer, chickpeas, vegetables and rice.",
    249,
    "Healthy",
    "Vegetarian",
    "Mild",
  ],
  [
    "Power Bowl",
    "Nutritious bowl with grains, vegetables and protein.",
    269,
    "Healthy",
    "Vegetarian",
    "Mild",
  ],
  [
    "Fruit Bowl",
    "Fresh seasonal fruits served in a healthy bowl.",
    149,
    "Healthy",
    "Vegetarian",
    "Mild",
  ],
  [
    "Quinoa Salad",
    "Quinoa mixed with fresh vegetables and light dressing.",
    229,
    "Healthy",
    "Vegetarian",
    "Mild",
  ],

  // BEVERAGES
  [
    "Cold Coffee",
    "Chilled creamy coffee served with ice.",
    129,
    "Beverages",
    "Vegetarian",
    "Mild",
  ],
  [
    "Masala Chai",
    "Indian tea prepared with milk and aromatic spices.",
    59,
    "Beverages",
    "Vegetarian",
    "Mild",
  ],
  [
    "Mango Shake",
    "Creamy shake prepared with fresh mango.",
    139,
    "Beverages",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chocolate Shake",
    "Rich and creamy chocolate milkshake.",
    149,
    "Beverages",
    "Vegetarian",
    "Mild",
  ],
  [
    "Fresh Lime Soda",
    "Refreshing lime soda with a sweet and tangy taste.",
    89,
    "Beverages",
    "Vegetarian",
    "Mild",
  ],
  [
    "Fresh Orange Juice",
    "Freshly prepared orange juice.",
    119,
    "Beverages",
    "Vegetarian",
    "Mild",
  ],
  [
    "Iced Tea",
    "Refreshing chilled tea with lemon.",
    99,
    "Beverages",
    "Vegetarian",
    "Mild",
  ],

  // DESSERTS
  [
    "Gulab Jamun",
    "Soft milk-solid dumplings soaked in sugar syrup.",
    99,
    "Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Rasmalai",
    "Soft paneer dumplings served in sweet creamy milk.",
    129,
    "Indian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chocolate Brownie",
    "Rich chocolate brownie served warm.",
    149,
    "Continental",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chocolate Lava Cake",
    "Warm chocolate cake with a molten chocolate center.",
    179,
    "Continental",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chocolate Sundae",
    "Vanilla ice cream topped with chocolate sauce.",
    159,
    "Continental",
    "Vegetarian",
    "Mild",
  ],
  [
    "Cheesecake",
    "Creamy classic cheesecake with a biscuit base.",
    189,
    "Continental",
    "Vegetarian",
    "Mild",
  ],
  [
    "Chocolate Mousse",
    "Light and creamy chocolate mousse.",
    159,
    "Continental",
    "Vegetarian",
    "Mild",
  ],

  // FAST FOOD
  [
    "Veg Wrap",
    "Soft wrap filled with vegetables, cheese and sauce.",
    149,
    "Fast Food",
    "Vegetarian",
    "Medium",
  ],
  [
    "Chicken Wrap",
    "Grilled chicken wrap with vegetables and sauce.",
    199,
    "Fast Food",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Veg Tacos",
    "Crispy tacos filled with vegetables and cheese.",
    179,
    "Mexican",
    "Vegetarian",
    "Medium",
  ],
  [
    "Chicken Tacos",
    "Crispy tacos filled with seasoned chicken and vegetables.",
    219,
    "Mexican",
    "Non-Vegetarian",
    "Medium",
  ],
  [
    "Nachos",
    "Crispy nachos topped with cheese and salsa.",
    159,
    "Mexican",
    "Vegetarian",
    "Medium",
  ],
  [
    "Garlic Bread",
    "Toasted bread with garlic butter and herbs.",
    129,
    "Italian",
    "Vegetarian",
    "Mild",
  ],
  [
    "Cheese Quesadilla",
    "Grilled tortilla filled with cheese and vegetables.",
    189,
    "Mexican",
    "Vegetarian",
    "Medium",
  ],
];

const imageUrls = [
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  "https://images.unsplash.com/photo-1563376782-1b0b4f9b7c3a",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
  "https://images.unsplash.com/photo-1547592180-85f173990554",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  "https://images.unsplash.com/photo-1550547660-d9450f859349",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307",
];

const categoryNames = [
  "Pizza",
  "Burgers",
  "Biryani",
  "Indian",
  "North Indian",
  "South Indian",
  "Chinese",
  "Pasta",
  "Sandwiches",
  "Snacks",
  "Breakfast",
  "Healthy",
  "Beverages",
  "Desserts",
  "Fast Food",
];

function getCategory(name: string): string {
  if (name.includes("Pizza")) return "Pizza";
  if (name.includes("Burger")) return "Burgers";
  if (name.includes("Biryani")) return "Biryani";

  if (
    name.includes("Dosa") ||
    name.includes("Idli") ||
    name.includes("Vada") ||
    name.includes("Uttapam")
  ) {
    return "South Indian";
  }

  if (
    name.includes("Naan") ||
    name.includes("Roti") ||
    name.includes("Paratha") ||
    name.includes("Tikka") ||
    name.includes("Tandoori") ||
    name.includes("Kulcha") ||
    name.includes("Lababdar")
  ) {
    return "North Indian";
  }

  if (
    name.includes("Noodles") ||
    name.includes("Fried Rice") ||
    name.includes("Manchurian") ||
    name.includes("Chilli Paneer") ||
    name.includes("Chilli Chicken") ||
    name.includes("Spring Rolls") ||
    name.includes("Momos")
  ) {
    return "Chinese";
  }

  if (name.includes("Pasta") || name.includes("Macaroni")) {
    return "Pasta";
  }

  if (name.includes("Sandwich")) {
    return "Sandwiches";
  }

  if (
    name.includes("Fries") ||
    name.includes("Wings") ||
    name.includes("Nuggets") ||
    name.includes("Cheese Balls") ||
    name.includes("Onion Rings")
  ) {
    return "Snacks";
  }

  if (
    name.includes("Coffee") ||
    name.includes("Chai") ||
    name.includes("Shake") ||
    name.includes("Soda") ||
    name.includes("Tea") ||
    name.includes("Juice")
  ) {
    return "Beverages";
  }

  if (
    name.includes("Gulab") ||
    name.includes("Rasmalai") ||
    name.includes("Brownie") ||
    name.includes("Lava") ||
    name.includes("Sundae") ||
    name.includes("Cheesecake") ||
    name.includes("Mousse")
  ) {
    return "Desserts";
  }

  if (
    name.includes("Salad") ||
    name.includes("Protein") ||
    name.includes("Power Bowl") ||
    name.includes("Fruit Bowl") ||
    name.includes("Quinoa")
  ) {
    return "Healthy";
  }

  if (
    name.includes("Poha") ||
    name.includes("Upma") ||
    name.includes("Chole Bhature") ||
    name.includes("Omelette") ||
    name.includes("Bhurji")
  ) {
    return "Breakfast";
  }

  if (
    name.includes("Wrap") ||
    name.includes("Tacos") ||
    name.includes("Nachos") ||
    name.includes("Garlic Bread") ||
    name.includes("Quesadilla")
  ) {
    return "Fast Food";
  }

  return "Indian";
}

async function main() {
  console.log("🌱 Starting database seed...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Existing data cleared");

  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Ember & Crust",
      slug: "ember-and-crust",
      description:
        "A modern multi-cuisine restaurant serving pizzas, burgers, Indian classics, biryanis, Asian favourites and refreshing beverages.",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
      address: "Bhubaneswar, Odisha, India",
      latitude: 20.2961,
      longitude: 85.8245,
      rating: 4.6,
      deliveryTime: 30,
      deliveryFee: 39,
      isOpen: true,
    },
  });

  const categoryMap = new Map<string, string>();

  for (let i = 0; i < categoryNames.length; i++) {
    const category = await prisma.category.create({
      data: {
        name: categoryNames[i],
        slug: categoryNames[i].toLowerCase().replaceAll(" ", "-"),
        sortOrder: i + 1,
      },
    });

    categoryMap.set(category.name, category.id);
  }

  for (let i = 0; i < menuData.length; i++) {
    const [
      name,
      description,
      price,
      cuisine,
      dietType,
      spiceLevel,
    ] = menuData[i];

    const categoryName = getCategory(name);
    const categoryId = categoryMap.get(categoryName);

    if (!categoryId) {
      throw new Error(
        `Category not found for ${name}: ${categoryName}`
      );
    }

    await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        image: imageUrls[i % imageUrls.length],
        available: true,
        cuisine,
        dietType,
        spiceLevel,
        rating: Number((4 + Math.random()).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 900) + 50,
        popularity: Math.floor(Math.random() * 1000),
        restaurantId: restaurant.id,
        categoryId,
      },
    });
  }

  console.log(`🍽️ Restaurant created: ${restaurant.name}`);
  console.log(`📂 ${categoryNames.length} categories created`);
  console.log(`🍔 ${menuData.length} menu items created`);
  console.log("✅ Database seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

