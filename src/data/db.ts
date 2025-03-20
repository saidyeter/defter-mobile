

import { eq, like } from 'drizzle-orm';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { entity, transaction } from "./db-schema";
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
  getEntityListPromise(searchKey?: string | undefined | null) {
    if (searchKey) {
      return db.select().from(entity).where(like(entity.title, `%${searchKey}%`));
    }
    return db.select().from(entity);
  },
  async getEntityById(id: number) {
    return await db.select().from(entity).where(eq(entity.id, id));
  },
  getEntityByIdPromise(id: string | undefined | null) {
    if (!id && isNaN(Number(id))) {
      return undefined
    }
    return db.select().from(entity).where(eq(entity.id, Number(id)));
  },
  getEntityByNumberIdPromise(id: number) {
    if (!id && isNaN(id)) {
      return undefined
    }
    return db.select().from(entity).where(eq(entity.id, Number(id)));
  },
  async addEntity(item: { title: string, phoneNumber: string, note: string }) {
    return await db.insert(entity).values({
      ...item,
      createdAt: new Date().getTime()
    });
  },
  async updateEntity(id: number, item: { title: string, phoneNumber: string, note: string }) {

    return await db.update(entity)
      .set({
        ...item,
        updatedAt: new Date().getTime()
      })
      .where(eq(entity.id, id));
  },
  /* ###  transaction table  ###   */
  getEntityTransactionsPromise(entityId: string | undefined | null) {
    if (!entityId && isNaN(Number(entityId))) {
      return undefined
    }
    return db.select().from(transaction).where(eq(transaction.entityId, Number(entityId)));
  },
  async addTransaction(item: { amount: number, type: string, note: string, entityId: number }) {
    return await db.insert(transaction).values(item);
  },
  getTransactionByIdPromise(id: string | undefined | null) {
    if (!id && isNaN(Number(id))) {
      return undefined
    }
    return db.select().from(transaction).where(eq(transaction.id, Number(id)));
  },
  async removeTransaction(id: number) {
    return await db.delete(transaction).where(eq(transaction.id, id));
  },
}
