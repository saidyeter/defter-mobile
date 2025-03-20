import { Button, Input, Label, RadioGroup, RadioGroupItem, Text } from '@/components/ui';
import db from '@/data/db';
import { router, useLocalSearchParams } from 'expo-router';
import React from "react";
import { View } from "react-native";

export default function Page() {
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const { entityId } = useLocalSearchParams<{ entityId: string, }>();

  const [note, setNote] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [type, setType] = React.useState('D');

  React.useEffect(() => {
    if (!entityId) {
      router.dismissTo('/');
      return;
    }

    db.getEntityByIdPromise(entityId)
      .then((data) => {
        if (!data) {
          router.dismissTo('/');
          return;
        }
        setName(data[0].title);
        setPhoneNumber(data[0].phoneNumber);
      });
  }, [entityId]);

  function handleSave() {
    if (!amount || isNaN(Number(amount.replace(',', '.')))) {
      console.log('amount is not a number');
      return
    }
    db.addTransaction({
      entityId: Number(entityId),
      amount: Number(amount.replace(',', '.')),
      type: type,
      note: note,
    }).then(() => {
      // console.log('saved');
      router.dismissTo('/entity/' + entityId);
    });
  }
  function onLabelPress(label: string) {
    setType(label);
  }
  return (
    <View className="flex flex-1 p-4">
      <View className="flex flex-row items-center gap-4 text-center justify-between">
        <View>
          <Text className="text-xl font-bold">
            {name} için Yeni İşlem
          </Text>
          <Text className="text-muted-foreground">
            {phoneNumber}
          </Text>
        </View>
      </View>
      <View className='flex flex-col py-4 gap-4 text-center justify-between w-full mb-4'>
        <Input placeholder="Tutar" onChangeText={setAmount} keyboardType='numeric' />
        <Input placeholder="Not" onChangeText={setNote} />
        <RadioGroup value={type} onValueChange={setType} className='gap-3'>
          <RadioGroupItemWithLabel value='D' desc='Borç verme' onLabelPress={onLabelPress} />
          <RadioGroupItemWithLabel value='C' desc='Ōdeme alma' onLabelPress={onLabelPress} />
        </RadioGroup>
      </View>
      <Button variant="default" size="sm" onPress={handleSave}>
        <Text>Kaydet</Text>
      </Button>
    </View>
  );
}


function RadioGroupItemWithLabel({
  value,
  desc,
  onLabelPress,
}: {
  value: string;
  desc: string;
  onLabelPress: (val: string) => void;
}) {
  return (
    <View className={'flex-row gap-2 items-center'}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={() => onLabelPress(value)}>
        {desc}
      </Label>
    </View>
  );
}