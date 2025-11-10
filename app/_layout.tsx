import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="Details"
        options={{ title: "Detials", headerBackButtonDisplayMode: "minimal" }}
      />
    </Stack>
  );
}
