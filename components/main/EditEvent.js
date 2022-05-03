import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  FlatList
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

const EditEvent = ({navigation, route}) => {

    const { language } = route?.params ?? {};

    const [filteredDataSource, setFilteredDataSource] = useState("");
    const [masterDataSource, setMasterDataSource] = useState("");
    const [datalist, setDatalist] = useState("");
  
    useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        firebase
          .firestore()
          .collection("languages")
          .doc(language)
          .collection('About')
          .get()
          .then((snapshot) => {
            let masterDataSource = snapshot.docs.map((doc) => {
              const data = doc.data();
              const id = doc.id;
              return { id, ...data };
            });
  
            setDatalist(masterDataSource);
            setFilteredDataSource(masterDataSource);
            setMasterDataSource(masterDataSource);
            console.log(masterDataSource);
          });
      });
  
      return unsubscribe;
    }, [navigation]);
  
  
  
    return (
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
                style={styles.buttonVocab}
                onPress={() => navigation.navigate("EditEvents", { data: item , language: language})}
              >
                <View style={styles.contextButton}>
                  <Text style={styles.inKagan}>{item.title} </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
    )
}

export default EditEvent;
const styles = StyleSheet.create({
    container: {
      alignContent: "center",
      top: 1,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    input: {
      letterSpacing: 0.25,
      height: 50,
      width: "95%",
      paddingLeft: 12,
      paddingTop: 1,
      marginTop: 10,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#707070",
    },
    text: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 0.5,
    },
    bodycontainer: {
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    addButton: {
      borderColor: "#70707033",
      borderWidth: 1.5,
      marginVertical: 10,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      flex: 1,
      borderRadius: 5,
      alignItems: "center",
      paddingVertical: 15,
      marginTop: 10,
    },
    contextButton: {
        //padding: 13,
        flexDirection: "row",
        paddingHorizontal: 35,
        alignItems: "center",
      },
      text_Context: {
        flexDirection: "column",
        marginLeft: 20,
        alignItems: "flex-start",
      },
      buttonVocab: {
        width: "100%",
        //alignSelf: "center",
        //alignItems: "flex-start",
        //marginTop: 10,
        elevation: 0.7,
        //width: 300,
        backgroundColor: "#EBEBEB",
        borderRadius: 10,
        paddingVertical: 15,
        marginVertical: 5,
      },
  });
  