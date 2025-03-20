import { Button, Text } from '@/components/ui';
import db from '@/data/db';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string, }>();
  const { data: transactions } = useLiveQuery(db.getTransactionByIdPromise(id), [id]);
  const transaction = transactions?.[0];
  const [entity, setEntity] = useState<{
    id: number;
    title: string;
    phoneNumber: string;
    note: string;
    createdAt: number;
    updatedAt: number;
  }>(null);
  // const { data: entities } = useLiveQuery(db.getEntityByNumberIdPromise(transaction.entityId), [transaction]);
  // const entity = entities?.[0];

  useEffect(() => {
    if (!transaction?.entityId) {
      return;
    }
    db.getEntityByNumberIdPromise(transaction.entityId)
      .then((data) => {
        setEntity(data[0]);
      });
  }, [transaction]);

  function handleRemove() {
    db
      .removeTransaction(transaction.id).
      then(() => {
        // console.log('removed');
        router.dismissTo('/entity/' + transaction.entityId);
      });
  }
  if (!entity || !transaction) {
    return null;
  }

  return (
    <View className="flex flex-1 p-4">
      <View className="flex flex-row items-center gap-4 text-center justify-between">
        <View>
          <Text className="text-xl font-bold">
            {entity.title} için yapılan işlem
          </Text>
          <Text className="text-muted-foreground">
            {entity.phoneNumber}
          </Text>
        </View>
        <Button variant="destructive" size="sm" onPress={handleRemove}>
          <Text>Sil</Text>
        </Button>
      </View>

      <View className="py-8">
        <Text className="">
          Tutar: {transaction.amount}
        </Text>
        <Text className="">
          Tip: {transaction.type == 'D' ? 'Borç' : 'Alacak'}
        </Text>
        <Text className="">
          Not: {transaction.note}
        </Text>
        <Text className="">
          Tarih: {transaction.createdAt}
        </Text>
      </View>
      <View className="py-8">
        <Button disabled>
          <Text>Düzenle (Yakında Aktif Olacak)</Text>
        </Button>
      </View>
    </View>
  );
}