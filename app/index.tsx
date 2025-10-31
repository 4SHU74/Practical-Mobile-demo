import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
  // url: "https://pokeapi.co/api/v2/type/18";
}

const colorsByType = {
  grass: `green`,
  fire: `orange`,
};

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  console.log(JSON.stringify(pokemons[0], null, 2));

  useEffect(() => {
    fetchpokemons();
  }, []);

  async function fetchpokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=10"
      );

      const data = await response.json();

      // Fetch detailed info for each pokemon in parallel
      const detailedPokemons = await Promise.all(
        data.result.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            // main sprite
            imageBack: details.sprites.back_default,
            // back of the main image
            types: details.types,
          };
        })
      );

      setPokemons(detailedPokemons);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView>
      <Text>Welcome</Text>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text style={styles.name}>{pokemon.name}</Text>
          {/* types of pokemon */}
          <Text style={styles.types}>{pokemon.types[0].type.name}</Text>
          {/* <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 100, height: 100 }}
            />
            <Image
              source={{ uri: pokemon.imageBack }}
              style={{ width: 100, height: 100 }}
            />
          </View> */}
        </View>
      ))}
      ;
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: `bold`,
  },
  types: {
    fontSize: 20,
    fontWeight: `bold`,
    color: `grey`,
  },
});
