import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function Details() {
  return <ScrollView contentContainerStyle={styles.container}></ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
