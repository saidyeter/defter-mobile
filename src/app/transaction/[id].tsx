import { Button } from "@/components/ui/button";
import { Text } from '@/components/ui/text';
import { View } from "react-native";

export default function Page() {
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
    </View>
  );
}