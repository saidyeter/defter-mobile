import { Button } from "@/components/ui/button";
import { Text } from '@/components/ui/text';
import db, { getDB } from '@/data/db';
import migrations from '@/data/drizzle/migrations';
import { MoonStar } from "@/lib/icons/moonstar";
import { Sun } from "@/lib/icons/sun";
import { useColorScheme } from "@/lib/useColorScheme";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Link } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {

  const { success, error } = useMigrations(getDB(), migrations);
  useEffect(() => {
    if (success) {
      console.log('Migration successful');
      db.getEntityList()
        .then((d) => {
          if (d.length == 0) {
            db.addEntity({
              title: "Hello",
              desc: "World",
              phoneNumber: "1234567890",
              note: "This is a note"
            })
          }

        });
    } else if (error) {
      console.error('Migration failed:', error);
    }
  }, [success, error]);


  return (
    <View className="flex flex-1">
      <Header />
      <Content />
      <Footer />
    </View>
  );
}

function Content() {
  const { data } = useLiveQuery(db.getEntityListPromise());


  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <Text
              role="heading"
              className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Welcome to Project ACME
            </Text>
            <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
              Discover and collaborate on acme. Explore our services now.
            </Text>

            <View className="gap-4">
              <Link
                suppressHighlighting
                className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/"
              >
                Explore
              </Link>
              <Button variant="default" size="sm">
                <Text>Default</Text>
              </Button>
            </View>

            {data.map((item, index) => (
              <Text key={index}>{item.title}</Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function Header() {
  const { toggleColorScheme, isDarkColorScheme } = useColorScheme()
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
        <Link className="font-bold flex-1 items-center justify-center" href="/">
          ACME
        </Link>
        <View className="flex flex-row gap-4 sm:gap-6  items-center">
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            About
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Product
          </Link>
          <Pressable
            className="text-md font-medium hover:underline web:underline-offset-4"
            onPress={toggleColorScheme}
          >
            {isDarkColorScheme ?
              <Sun color={isDarkColorScheme ? "white" : "black"} size={16} /> :
              <MoonStar color={isDarkColorScheme ? "white" : "black"} size={16} />
            }
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex shrink-0 bg-gray-100 native:hidden"
      style={{ paddingBottom: bottom }}
    >
      <View className="py-6 flex-1 items-start px-4 md:px-6 ">
        <Text className={"text-center text-gray-700"}>
          © {new Date().getFullYear()} Me
        </Text>
      </View>
    </View>
  );
}
