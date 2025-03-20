import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import db from '@/data/db';
import { router } from 'expo-router';
import React from "react";
import { View } from "react-native";

export default function Page() {
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [note, setNote] = React.useState('');
  function handleSave() {
    db.addEntity({
      title: name,
      phoneNumber: phoneNumber,
      note: note,
    }).then(() => {
      console.log('saved');
      router.dismissTo('/');
    });
  }
  return (
    <View className="flex flex-1 p-4">
      <View className="flex flex-row items-center gap-4 text-center justify-between">
        <Text className="text-xl font-bold">
          Yeni Kişi Ekle
        </Text>
      </View>
      <View className='flex flex-col py-4 gap-4 text-center justify-between w-full mb-4'>
        <Input placeholder="Kişi Adı" onChangeText={setName} />
        <Input placeholder="Telefon Numarası" keyboardType='number-pad' onChangeText={setPhoneNumber} />
        <Input placeholder="Not" onChangeText={setNote} />
      </View>
      <Button variant="default" size="sm" onPress={handleSave}>
        <Text>Kaydet</Text>
      </Button>
    </View>
  );
}

