// Menu.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Menu = ({ onMenuClick }) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => onMenuClick("Naujas Kryžiažodis")}>
        <Text style={styles.menuItem}>Pradėti</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onMenuClick("Išeiti")}>
        <Text style={styles.menuItem}>Išeiti</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 10,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginVertical: 5,
  },
});

export default Menu;
