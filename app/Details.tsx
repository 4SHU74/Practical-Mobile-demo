import { Stack } from "expo-router";
import React from "react";
import { ScrollView, Text } from "react-native";

export default function Details() {
  const params = useLocalSearchParams();

  console.log(params.name);

  useEffect(() => {}, []);

  async function fetchPokemonByName(name: string) {
    // try{}
    // catch()
    // fetch()
  }

  return (
    <>
      <Stack.Screen options={{ title: params.name as string }} />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
        }}
      >
        <Text>{params.name}</Text>
      </ScrollView>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
// });
