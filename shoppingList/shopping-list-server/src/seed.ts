import { db, client } from "./config/db";
import { categories } from "./schemas/shoppingList";

async function seed() {
    console.log('Seeding...');
  
    await db.insert(categories).values([
        {name: "מוצרי ניקיון"},
        {name: "גבינות"},
        {name: "ירקות ופירות"},
        {name: "בשר ודגים"},
        {name: "מאפים"}
    ]);

    await client.end();
    console.log('Seeded!');
}

seed();
