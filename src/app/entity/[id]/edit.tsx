import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import db from '@/data/db';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from "react";
import { View } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams<{ id: string, }>();
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [note, setNote] = React.useState('');

  useEffect(() => {
    if (!id) {
      router.dismissTo('/');
      return;
    }
    db.getEntityByIdPromise(id)
      .then((data) => {
        setName(data[0].title);
        setPhoneNumber(data[0].phoneNumber);
        setNote(data[0].note);
      });
  }, [id]);

  function handleSave() {
    db.updateEntity(Number(id), {
      title: name,
      phoneNumber: phoneNumber,
      note: note,
    }).then(() => {
      // console.log('updated');
      router.dismissTo('/');
    });
  }
  return (
    <View className="flex flex-1 p-4">
      <View className="flex flex-row items-center gap-4 text-center justify-between">
        <Text className="text-xl font-bold">
          Kaydı Düzenle
        </Text>
      </View>
      <View className='flex flex-col py-4 gap-4 text-center justify-between w-full mb-4'>
        <Input placeholder="Kişi Adı" onChangeText={setName} value={name} />
        <Input placeholder="Telefon Numarası" keyboardType='number-pad' onChangeText={setPhoneNumber} value={phoneNumber} />
        <Input placeholder="Not" onChangeText={setNote} value={note} />
      </View>
      <Button variant="default" size="sm" onPress={handleSave}>
        <Text>Kaydet</Text>
      </Button>
      <View className="py-8">
        <Button disabled variant='destructive'>
          <Text>Kaydı Sil (Yakında Aktif Olacak)</Text>
        </Button>
      </View>
    </View>
  );
}

