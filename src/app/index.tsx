import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from '@/components/ui/text';
import db, { getDB } from '@/data/db';
import migrations from '@/data/drizzle/migrations';
import { User } from "@/lib/icons/user";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Page() {
  const [searchKey, setSearchKey] = useState('');
  const { error } = useMigrations(getDB(), migrations);
  useEffect(() => {
    if (error) { console.error('Migration failed:', error); }
  }, [error]);
  const { data } = useLiveQuery(db.getEntityListPromise(searchKey), [searchKey]);

  return (
    <View className="flex flex-1 p-4">
      <View className="flex flex-row items-center gap-4 text-center justify-between">
        <Text className="text-xl font-bold">
          Kişiler
        </Text>
        <Button variant="default" size="sm" >
          <Text>Yeni Ekle</Text>
        </Button>
      </View>
      <View className="my-4">
        <Input value={searchKey} onChangeText={setSearchKey} placeholder="Kişi Ara" />
      </View>
      <ScrollView>
        {data.map((c) => (
          <Item key={c.id} item={c} />
        ))}
      </ScrollView>
    </View>
  );
}


function Item({ item }: {
  item: {
    id: number;
    title: string;
    desc: string;
    phoneNumber: string;
    note: string;
    createdAt: number;
    updatedAt: number;
  }
}) {
  return (
    <View
      key={item.id}
      className="mb-2 flex flex-row items-center space-x-4 rounded-md border p-4 w-full"
    >
      <User className="text-primary" />
      <View className="flex-1 space-y-1">
        <Text className="text-sm font-medium leading-none">
          {item.title}
        </Text>
        <Text className="text-sm text-muted-foreground">
          {item.phoneNumber}
        </Text>
      </View>
      <Link
        href={`/entity/${item.id}`}
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        <View className="flex flex-1 items-center justify-center ">
          <Text className="mt-1">
            Detay
          </Text>
        </View>
      </Link>
    </View>
  )
}