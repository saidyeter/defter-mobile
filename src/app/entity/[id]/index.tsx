import { Button, Text } from '@/components/ui';

import db from '@/data/db';
import { User } from "@/lib/icons";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string, }>();
  const { data: transactions } = useLiveQuery(db.getEntityTransactionsPromise(id), [id]);
  const { data: entities } = useLiveQuery(db.getEntityByIdPromise(id), [id]);
  const entity = entities?.[0];

  if (!entity) {
    return null;
  }

  return (
    <View className="flex flex-1 p-4">
      <View className="flex flex-row items-center gap-4 text-center justify-between">
        <View>
          <Text className="text-xl font-bold">
            {entity.title}
          </Text>
          <Text className="text-muted-foreground">
            {entity.phoneNumber}
          </Text>
        </View>
        <Button variant="default" size="sm" onPress={() => router.push(`entity/${id}/edit`)}>
          <Text>Dűzenle</Text>
        </Button>
      </View>
      <View className="py-8">
        <Button onPress={() => router.push(`transaction/${id}/new`)}>
          <Text>Yeni İşlem Ekle</Text>
        </Button>
      </View>
      {!!transactions && (
        <ScrollView>
          {transactions.map((c) => (
            <Item key={c.id} item={c} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}


function Item({ item }: {
  item: {
    id: number;
    entityId: number;
    amount: number;
    type: string;
    note: string;
    createdAt: number;
    updatedAt: number;
  }
}) {
  return (
    <Link
      href={`/transaction/${item.id}`}
      className='w-full mb-2'
    >
      <View className=" flex flex-row items-center gap-4 space-x-4 rounded-md border border-muted p-4 w-full">
        <User className="text-primary" />
        <View className="flex-1 space-y-1">
          <Text className="text-sm font-medium leading-none">
            {item.createdAt}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {item.note}
          </Text>
        </View>
        <View className="space-y-1">
          <Text className={`text-sm ${item.type === 'C' ? 'text-primary' : 'text-destructive'}`}>
            {item.amount}
          </Text>
        </View>
      </View>
    </Link>
  )
}