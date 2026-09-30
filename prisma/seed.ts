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
spiceLevel: string,
];

const menuData: MenuData[] = [
// KEEP YOUR EXISTING menuData ARRAY HERE
// Pizza, Burgers, Biryani, Indian, etc.
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
