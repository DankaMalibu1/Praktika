// App.js

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CrosswordGrid from "./CrosswordGrid";
import Menu from "./Menu";

const App = () => {
  const crosswordData = [
    [
      {
        answer: "KINTAMASIS",
        hint: "Koks programavimo kalbos elementas naudojamas informacijos saugojimui ir gavimui?",
        startx: 4,
        starty: 1,
        orientation: "down",
        position: 1,
    },
    {
        answer: "PAVELDEJIMAS",
        hint: "Koks terminas naudojamas aprašyti procesą, kai vienas objektas paveldi savybes iš kito?",
        startx: 4,
        starty: 4,
        orientation: "across",
        position: 2,
    },
    {
        answer: "OBJEKTINIS",
        hint: "Kokia programavimo paradigma, kurioje programos yra suskirstytos į mažas savarankiškas dalis?",
        startx: 7,
        starty: 1,
        orientation: "down",
        position: 3,
    },
    {
        answer: "IF",
        hint:"Kokį žodį naudojame programavime reikšmėms palyginti?",
        startx: 1,
        starty: 2,
        orientation: "across",
        position: 4,
    },
],
[
    {
        answer: "KOMPILIAVIMAS",
        hint: "Koks terminas naudojamas apibūdinti procesą, kai programos kodas yra verčiamas į mašininį kodą?",
        startx: 1,
        starty: 4,
        orientation: "across",
        position: 1,
    },
    {
        answer: "DEBUGGING",
        hint: "Koks terminas naudojamas aprašyti klaidų rinkinį programoje?",
        startx: 3,
        starty: 2,
        orientation: "down",
        position: 2,
    },
    {
        answer: "FOR",
        hint: "Kokį žodį dažniausiai naudojame norėdami pradėti ciklą, kuris kartojasi tam tikrą skaičių kartų?",
        startx: 5,
        starty: 1,
        orientation: "down",
        position: 3,
    },
    {
        answer: "FUNKCIJA",
        hint: "Koks terminas naudojamas apibūdinti programos dalį, kuri atlieka tam tikrą veiksmą ir gali būti kartojama kitose programos vietose?",
        startx: 2,
        starty: 6,
        orientation: "across",
        position: 4,
    },
    ],
  ];

  const [showCrossword, setShowCrossword] = useState(false);

  const handleMenuClick = (menuItem) => {
    console.log(`Pasirinktas meniu punktas: ${menuItem}`);

    if (menuItem === "Naujas Kryžiažodis") {
      setShowCrossword(true);
    } else if (menuItem === "Išeiti") {
      setShowCrossword(false);
    }
  };

  return (
    <View style={styles.container}>
      {!showCrossword ? (
        <Menu onMenuClick={handleMenuClick} />
      ) : (
        <CrosswordGrid crosswordData={crosswordData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default App;