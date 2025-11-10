import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

const colorsByType: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  steel: "#B8B8D0",
  dragon: "#7038F8",
  fairy: "#F0B6BC",
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
        data.results.map(async (pokemon: any) => {
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
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {pokemons.map((pokemon) => (
        <Link
          asChild
          href={{ pathname: "/Details", params: { name: pokemon.name } }}
          key={pokemon.name}
        >
          <TouchableOpacity>
            <View
              style={{
                // @ts-ignore
                backgroundColor:
                  colorsByType[pokemon.types[0].type.name] + "4D",
                padding: 20,
                borderRadius: 20,
              }}
            >
              <Text style={styles.name}>{pokemon.name}</Text>
              {/* types of pokemon */}
              <Text style={styles.types}>{pokemon.types[0].type.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: pokemon.image }}
                  style={{ width: 100, height: 100 }}
                />
                <Image
                  source={{ uri: pokemon.imageBack }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: `bold`,
    textAlign: `center`,
  },
  types: {
    fontSize: 20,
    fontWeight: `bold`,
    color: `grey`,
    textAlign: `center`,
  },
  image: {
    justifyContent: "center",
  },
});
