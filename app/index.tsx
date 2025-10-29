import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchpokemons();
  }, []);

  async function fetchpokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=5"
      );
      const data = await response.json();
      setPokemons(data.results);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 40,
    // fontWeight: "bold",
    color: "#15c02cff",
    marginBottom: 20,
  },
});
