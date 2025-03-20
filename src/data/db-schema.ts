import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const entity = sqliteTable(
  'entity',
  {
    id: integer('id').primaryKey(),
    title: text('title'),
    desc: text('desc'),
    phoneNumber: text('phoneNumber'),
    note: text('note'),
    createdAt: integer('createdAt').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer('updatedAt').default(sql`(CURRENT_TIMESTAMP)`),
  })

export const transaction = sqliteTable(
  'transaction',
  {
    id: integer('id').primaryKey(),
    entityId: integer('entityId'),
    amount: real('amount'),
    type: text('type'),
    note: text('note'),
    createdAt: integer('createdAt').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: integer('updatedAt').default(sql`(CURRENT_TIMESTAMP)`),
  })
