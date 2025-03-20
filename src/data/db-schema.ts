import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const entity = sqliteTable(
  'entity',
  {
    id: integer('id').primaryKey(),
    title: text('title'),
    desc: text('desc'),
    phoneNumber: text('phoneNumber'),
    note: text('note'),
    createdAt: integer('createdAt'),
  },
  (tbl) => ({
    titleIndex: uniqueIndex('titleIndex').on(tbl.title),
  }))
