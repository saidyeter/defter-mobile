

import { eq } from 'drizzle-orm';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { entity } from "./db-schema";
let db: ReturnType<typeof drizzle>;


export function getDB() {
  if (!db) {
    const expo = openDatabaseSync("app.db");
    db = drizzle(expo);
  }

  return db;
}

getDB();

export default {

  /* ###  entity table  ###   */
  async getEntityList() {
    return await db.select().from(entity);
  },
  getEntityListPromise() {
    return db.select().from(entity);
  },
  async getEntityById(id: number) {
    return await db.select().from(entity).where(eq(entity.id, id));
  },
  async addEntity(item: { title: string, desc: string, phoneNumber: string, note: string }) {
    return await db.insert(entity).values({
      ...item,
      createdAt: new Date().getTime()
    });
  },

}
