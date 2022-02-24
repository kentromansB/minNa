import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import { Value } from "react-native-reanimated";
import { Sound } from "expo-av/build/Audio";

var head = require("../../assets/learning.svg");

function Dictionary({ filteredDictionary, navigation }) {
  const [playing, setPlaying] = useState(false);
  const [datalist, setDatalist] = useState(filteredDictionary);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] =
    useState(filteredDictionary);
  const [masterDataSource, setMasterDataSource] = useState(filteredDictionary);
  const [loading, setLoading] = useState(false);

  // const startLoading = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // };
  // useEffect(() => {
  //   setDatalist(filteredDictionary);
  //   setMasterDataSource(filteredDictionary);
  //   setFilteredDataSource(filteredDictionary);
  // }, [filteredDictionary]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      firebase
        .firestore()
        .collection("dictionaryAll")
        .orderBy("kagan", "asc")
        .where("status", "==", "1")
        .get()
        .then((snapshot) => {
          let filteredDictionary = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });

          setDatalist(filteredDictionary);
          setFilteredDataSource(filteredDictionary);
          setMasterDataSource(filteredDictionary);
        });
    });

    return unsubscribe;
  }, [navigation]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = `${
          item.kagan ? item.kagan.toUpperCase() : "".toUpperCase()
        } ${item.filipino ? item.filipino.toUpperCase() : "".toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  return (
    <NavigationContainer independent={true}>
      <View style={styles.headLine}>
        <View style={styles.title}>
          <Text style={styles.textHead}>KAAG</Text>
          <Text style={styles.textSubHead}>Dictionary</Text>
          <TextInput
            style={styles.input}
            placeholder="Search for Filipino or Kagan words..."
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          ></TextInput>
        </View>
      </View>
      <FlatList
        nestedScrollEnabled
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        horizontal={false}
        data={filteredDataSource}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => navigation.navigate("Word", { data: item })}
            >
              <View style={styles.bodycontainer}>
                <Text style={styles.inKagan}>{item.kagan} </Text>
                <Text style={styles.inFilipino}>
                  {item.filipino} (in filipino)
                </Text>
                <Text style={styles.meaning}>{item.meaning}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </NavigationContainer>
  );
}

const mapStateToProps = (store) => ({
  filteredDictionary: store.userState.filteredDictionary,
});

export default connect(mapStateToProps, null)(Dictionary);

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bodycontainer: {
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  headLine: {
    flexDirection: "column",
    width: "100%",
    height: 200,
    backgroundColor: "#8E2835",
    padding: 10,
  },

  title: {
    paddingHorizontal: 20,
    paddingVertical: 50,
    alignItems: "center",
  },
  textHead: {
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  textSubHead: {
    flexDirection: "row",
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0,
    color: "white",
  },

  input: {
    height: 45,
    width: "90%",
    backgroundColor: "white",
    margin: 12,
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  input1: {
    height: 45,
    width: "50%",
    backgroundColor: "white",
    margin: 12,
    paddingLeft: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  inKagan: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  inFilipino: {
    fontSize: 11,
    color: "#8E2835",
    fontStyle: "italic",
  },
  meaning: {
    fontSize: 13,
    letterSpacing: 0.25,
    color: "black",
    textAlign: "justify",
  },
});
