import "dotenv/config";
import { PrismaClient } from "@prisma/client";
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
  spiceLevel: string,
];

const menuData: MenuData[] = [
  // ==================== PIZZA ====================
  ["Margherita Pizza", "Classic tomato, mozzarella and basil pizza", 249, "Italian", "VEG", "MILD"],
  ["Farmhouse Pizza", "Onion, capsicum, tomato and mushroom", 329, "Italian", "VEG", "MILD"],
  ["Paneer Tikka Pizza", "Indian paneer tikka with mozzarella", 349, "Indian", "VEG", "MEDIUM"],
  ["Corn Cheese Pizza", "Sweet corn and extra cheese", 299, "Italian", "VEG", "MILD"],
  ["Peri Peri Chicken Pizza", "Chicken, peppers and peri peri sauce", 399, "Italian", "NON_VEG", "SPICY"],
  ["Chicken BBQ Pizza", "BBQ chicken, onion and mozzarella", 429, "Italian", "NON_VEG", "MEDIUM"],
  ["Mexican Veg Pizza", "Jalapeno, onion, capsicum and Mexican herbs", 349, "Mexican", "VEG", "SPICY"],
  ["Double Cheese Pizza", "Extra mozzarella cheese with tomato sauce", 319, "Italian", "VEG", "MILD"],
  ["Mushroom Truffle Pizza", "Mushroom, herbs and creamy truffle sauce", 449, "Italian", "VEG", "MILD"],
  ["Chicken Pepperoni Pizza", "Chicken pepperoni with mozzarella", 459, "Italian", "NON_VEG", "MEDIUM"],

  // ==================== BURGERS ====================
  ["Classic Veg Burger", "Crispy veg patty with fresh vegetables", 149, "American", "VEG", "MILD"],
  ["Cheese Veg Burger", "Veg patty with cheddar cheese", 179, "American", "VEG", "MILD"],
  ["Paneer Burger", "Grilled paneer with spicy sauce", 199, "Indian", "VEG", "MEDIUM"],
  ["Crispy Chicken Burger", "Crispy chicken fillet with lettuce", 229, "American", "NON_VEG", "MILD"],
  ["Chicken Cheese Burger", "Chicken patty with cheese and sauces", 259, "American", "NON_VEG", "MEDIUM"],
  ["Peri Peri Chicken Burger", "Spicy chicken patty with peri peri sauce", 279, "American", "NON_VEG", "SPICY"],
  ["Double Chicken Burger", "Two chicken patties with cheese", 329, "American", "NON_VEG", "MEDIUM"],
  ["Mushroom Swiss Burger", "Grilled mushroom and Swiss cheese burger", 229, "American", "VEG", "MILD"],

  // ==================== BIRYANI ====================
  ["Veg Biryani", "Aromatic basmati rice with vegetables and spices", 199, "Indian", "VEG", "MEDIUM"],
  ["Paneer Biryani", "Paneer cooked with fragrant basmati rice", 249, "Indian", "VEG", "MEDIUM"],
  ["Chicken Biryani", "Classic chicken dum biryani", 299, "Indian", "NON_VEG", "MEDIUM"],
  ["Chicken Hyderabadi Biryani", "Hyderabadi style spicy chicken biryani", 329, "Hyderabadi", "NON_VEG", "SPICY"],
  ["Mutton Biryani", "Slow cooked mutton with aromatic rice", 399, "Indian", "NON_VEG", "MEDIUM"],
  ["Egg Biryani", "Basmati rice with boiled eggs and spices", 229, "Indian", "NON_VEG", "MEDIUM"],
  ["Mushroom Biryani", "Fragrant rice cooked with mushrooms and herbs", 219, "Indian", "VEG", "MEDIUM"],
  ["Special Chicken Biryani", "Chicken biryani with egg and extra chicken", 369, "Indian", "NON_VEG", "SPICY"],

  // ==================== INDIAN ====================
  ["Paneer Butter Masala", "Paneer in creamy tomato gravy", 249, "Indian", "VEG", "MILD"],
  ["Kadai Paneer", "Paneer with capsicum in kadai masala", 239, "Indian", "VEG", "SPICY"],
  ["Palak Paneer", "Paneer cooked in creamy spinach gravy", 229, "Indian", "VEG", "MILD"],
  ["Dal Makhani", "Slow cooked black lentils with butter", 189, "Indian", "VEG", "MILD"],
  ["Chole Masala", "Chickpeas cooked in Indian spices", 169, "Indian", "VEG", "MEDIUM"],
  ["Butter Chicken", "Tender chicken in creamy tomato gravy", 299, "Indian", "NON_VEG", "MILD"],
  ["Chicken Curry", "Traditional Indian chicken curry", 279, "Indian", "NON_VEG", "MEDIUM"],
  ["Matar Paneer", "Paneer and peas in tomato gravy", 219, "Indian", "VEG", "MEDIUM"],
  ["Mix Veg Curry", "Seasonal vegetables in Indian gravy", 199, "Indian", "VEG", "MEDIUM"],
  ["Rajma Masala", "Red kidney beans cooked with Indian spices", 179, "Indian", "VEG", "MEDIUM"],

  // ==================== NORTH INDIAN ====================
  ["Butter Naan", "Soft naan with butter", 59, "North Indian", "VEG", "MILD"],
  ["Garlic Naan", "Tandoori naan topped with garlic", 79, "North Indian", "VEG", "MILD"],
  ["Tandoori Roti", "Whole wheat tandoori roti", 39, "North Indian", "VEG", "MILD"],
  ["Paneer Tikka", "Chargrilled paneer with peppers", 229, "North Indian", "VEG", "MEDIUM"],
  ["Chicken Tikka", "Chargrilled chicken tikka", 279, "North Indian", "NON_VEG", "MEDIUM"],
  ["Tandoori Chicken", "Classic roasted tandoori chicken", 329, "North Indian", "NON_VEG", "SPICY"],
  ["Amritsari Kulcha", "Stuffed Punjabi kulcha with butter", 139, "North Indian", "VEG", "MEDIUM"],
  ["Paneer Lababdar", "Paneer in rich creamy tomato gravy", 259, "North Indian", "VEG", "MILD"],

  // ==================== SOUTH INDIAN ====================
  ["Masala Dosa", "Crispy dosa with potato masala", 129, "South Indian", "VEG", "MILD"],
  ["Plain Dosa", "Crispy traditional dosa", 99, "South Indian", "VEG", "MILD"],
  ["Cheese Dosa", "Dosa filled with melted cheese", 159, "South Indian", "VEG", "MILD"],
  ["Idli Sambar", "Soft idlis served with sambar", 99, "South Indian", "VEG", "MILD"],
  ["Medu Vada", "Crispy South Indian lentil fritters", 109, "South Indian", "VEG", "MILD"],
  ["Uttapam", "Thick rice pancake with vegetables", 139, "South Indian", "VEG", "MILD"],
  ["Mysore Masala Dosa", "Spicy Mysore dosa with potato filling", 149, "South Indian", "VEG", "SPICY"],
  ["Idli Fry", "Crispy fried idli tossed with spices", 119, "South Indian", "VEG", "MEDIUM"],

  // ==================== CHINESE ====================
  ["Veg Hakka Noodles", "Stir fried noodles with vegetables", 179, "Chinese", "VEG", "MEDIUM"],
  ["Chicken Hakka Noodles", "Stir fried noodles with chicken", 229, "Chinese", "NON_VEG", "MEDIUM"],
  ["Veg Fried Rice", "Chinese style vegetable fried rice", 169, "Chinese", "VEG", "MILD"],
  ["Chicken Fried Rice", "Fried rice with chicken and vegetables", 219, "Chinese", "NON_VEG", "MEDIUM"],
  ["Veg Manchurian", "Crispy vegetable balls in Manchurian sauce", 189, "Chinese", "VEG", "SPICY"],
  ["Chicken Manchurian", "Chicken pieces in spicy Manchurian sauce", 239, "Chinese", "NON_VEG", "SPICY"],
  ["Chilli Paneer", "Paneer tossed with chilli and peppers", 219, "Chinese", "VEG", "SPICY"],
  ["Chilli Chicken", "Chicken tossed with peppers and chilli sauce", 259, "Chinese", "NON_VEG", "SPICY"],
  ["Schezwan Fried Rice", "Spicy fried rice with Schezwan sauce", 199, "Chinese", "VEG", "SPICY"],
  ["Chicken Momos", "Steamed dumplings filled with chicken", 199, "Chinese", "NON_VEG", "MEDIUM"],

  // ==================== PASTA ====================
  ["Penne Arrabbiata", "Penne pasta with spicy tomato sauce", 219, "Italian", "VEG", "SPICY"],
  ["White Sauce Pasta", "Creamy pasta with herbs and vegetables", 239, "Italian", "VEG", "MILD"],
  ["Pink Sauce Pasta", "Creamy tomato pasta", 249, "Italian", "VEG", "MILD"],
  ["Chicken Alfredo Pasta", "Creamy pasta with grilled chicken", 299, "Italian", "NON_VEG", "MILD"],
  ["Chicken Pesto Pasta", "Pesto pasta with grilled chicken", 319, "Italian", "NON_VEG", "MILD"],
  ["Cheesy Macaroni", "Creamy macaroni with cheese", 219, "Italian", "VEG", "MILD"],
  ["Arrabbiata Chicken Pasta", "Spicy tomato pasta with chicken", 299, "Italian", "NON_VEG", "SPICY"],

  // ==================== SANDWICHES ====================
  ["Veg Grilled Sandwich", "Grilled sandwich with vegetables and cheese", 139, "Continental", "VEG", "MILD"],
  ["Cheese Corn Sandwich", "Cheese and sweet corn grilled sandwich", 159, "Continental", "VEG", "MILD"],
  ["Paneer Sandwich", "Spiced paneer grilled sandwich", 179, "Indian", "VEG", "MEDIUM"],
  ["Chicken Club Sandwich", "Triple layer chicken club sandwich", 249, "Continental", "NON_VEG", "MILD"],
  ["Chicken Cheese Sandwich", "Chicken and cheese grilled sandwich", 229, "Continental", "NON_VEG", "MILD"],
  ["Tandoori Paneer Sandwich", "Paneer with tandoori spices and cheese", 199, "Indian", "VEG", "MEDIUM"],

  // ==================== SNACKS ====================
  ["French Fries", "Crispy golden potato fries", 109, "Fast Food", "VEG", "MILD"],
  ["Peri Peri Fries", "Fries tossed in peri peri seasoning", 139, "Fast Food", "VEG", "SPICY"],
  ["Cheese Fries", "French fries topped with cheese", 159, "Fast Food", "VEG", "MILD"],
  ["Veg Spring Rolls", "Crispy rolls filled with vegetables", 159, "Chinese", "VEG", "MILD"],
  ["Chicken Wings", "Crispy chicken wings with house sauce", 249, "American", "NON_VEG", "SPICY"],
  ["Chicken Nuggets", "Crispy chicken nuggets", 199, "Fast Food", "NON_VEG", "MILD"],
  ["Cheese Balls", "Crispy cheese-filled snack", 179, "Fast Food", "VEG", "MILD"],
  ["Onion Rings", "Crispy golden onion rings", 129, "Fast Food", "VEG", "MILD"],

  // ==================== BREAKFAST ====================
  ["Aloo Paratha", "Stuffed Indian flatbread with potato", 109, "North Indian", "VEG", "MILD"],
  ["Paneer Paratha", "Stuffed flatbread with paneer", 139, "North Indian", "VEG", "MEDIUM"],
  ["Poha", "Flattened rice with onion and peanuts", 89, "Indian", "VEG", "MILD"],
  ["Upma", "South Indian semolina breakfast", 89, "South Indian", "VEG", "MILD"],
  ["Chole Bhature", "Spicy chickpeas with fluffy bhatura", 169, "North Indian", "VEG", "SPICY"],
  ["Masala Omelette", "Egg omelette with onion, chilli and herbs", 129, "Indian", "NON_VEG", "MEDIUM"],
  ["Egg Bhurji", "Scrambled eggs with onion and spices", 139, "Indian", "NON_VEG", "MEDIUM"],

  // ==================== HEALTHY ====================
  ["Greek Salad", "Fresh vegetables with creamy dressing", 199, "Healthy", "VEG", "MILD"],
  ["Protein Bowl", "Chicken, vegetables, rice and protein-rich toppings", 299, "Healthy", "NON_VEG", "MILD"],
  ["Grilled Chicken Salad", "Grilled chicken with fresh greens", 279, "Healthy", "NON_VEG", "MILD"],
  ["Paneer Power Bowl", "Paneer, vegetables and nutritious grains", 249, "Healthy", "VEG", "MILD"],
  ["Fruit Bowl", "Seasonal fresh fruits", 159, "Healthy", "VEG", "MILD"],
  ["Chicken Quinoa Bowl", "Quinoa, grilled chicken and vegetables", 329, "Healthy", "NON_VEG", "MILD"],

  // ==================== BEVERAGES ====================
  ["Masala Chai", "Indian spiced tea", 59, "Beverages", "VEG", "MILD"],
  ["Cold Coffee", "Chilled creamy coffee", 129, "Beverages", "VEG", "MILD"],
  ["Chocolate Shake", "Rich chocolate milkshake", 159, "Beverages", "VEG", "MILD"],
  ["Mango Shake", "Fresh mango milkshake", 149, "Beverages", "VEG", "MILD"],
  ["Fresh Lime Soda", "Refreshing lime soda", 89, "Beverages", "VEG", "MILD"],
  ["Iced Tea", "Chilled lemon iced tea", 99, "Beverages", "VEG", "MILD"],
  ["Oreo Shake", "Creamy Oreo milkshake", 179, "Beverages", "VEG", "MILD"],
  ["Fresh Orange Juice", "Freshly squeezed orange juice", 119, "Beverages", "VEG", "MILD"],

  // ==================== DESSERTS ====================
  ["Gulab Jamun", "Soft warm gulab jamun", 89, "Indian", "VEG", "MILD"],
  ["Rasmalai", "Soft cheese dumplings in sweet milk", 119, "Indian", "VEG", "MILD"],
  ["Chocolate Brownie", "Warm chocolate brownie", 149, "Dessert", "VEG", "MILD"],
  ["Chocolate Lava Cake", "Warm cake with molten chocolate center", 179, "Dessert", "VEG", "MILD"],
  ["Ice Cream Sundae", "Ice cream with chocolate sauce and toppings", 169, "Dessert", "VEG", "MILD"],
  ["New York Cheesecake", "Creamy classic cheesecake", 199, "Dessert", "VEG", "MILD"],
  ["Chocolate Mousse", "Light and creamy chocolate mousse", 159, "Dessert", "VEG", "MILD"],

  // ==================== FAST FOOD ====================
  ["Loaded Nachos", "Nachos with cheese, salsa and jalapenos", 199, "Mexican", "VEG", "SPICY"],
  ["Cheese Garlic Bread", "Toasted garlic bread with mozzarella", 159, "Italian", "VEG", "MILD"],
  ["Chicken Wrap", "Grilled chicken wrapped with vegetables", 219, "Fast Food", "NON_VEG", "MEDIUM"],
  ["Paneer Wrap", "Spiced paneer with fresh vegetables", 189, "Fast Food", "VEG", "MEDIUM"],
  ["Veg Tacos", "Crispy tacos with vegetables and salsa", 179, "Mexican", "VEG", "SPICY"],
  ["Chicken Tacos", "Chicken tacos with salsa and cheese", 229, "Mexican", "NON_VEG", "SPICY"],
  ["Veg Quesadilla", "Grilled tortilla filled with cheese and vegetables", 199, "Mexican", "VEG", "MILD"],
  ["Chicken Quesadilla", "Grilled tortilla with chicken and cheese", 249, "Mexican", "NON_VEG", "MEDIUM"],
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
      throw new Error(`Category not found for ${name}: ${categoryName}`);
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