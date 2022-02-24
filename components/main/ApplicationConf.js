import React, { useState } from "react";
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
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
require("firebase/firestore");
require("firebase/firebase-storage");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as FileSystem from "expo-file-system";
import Hyperlink from "react-native-hyperlink";

function ApplicationConf({ currentUser, route, navigation }) {
  const [loading, setLoading] = useState(false);
  const { data } = route?.params ?? {};

  // const makeDownload = () => {

  // };
  const Accept = () => {
    setLoading(true);
    firebase
      .firestore()
      .doc(`users/${data?.id}`)
      .update({
        status: "1",
        type: "1",
      })
      .then((result) => {
        navigation.goBack();
        setLoading(false);
      })
      .catch((err) => console.log(err, "-=error"));
  };
  const Decline = () => {
    setLoading(true);
    firebase
      .firestore()
      .doc(`users/${data?.id}`)
      .update({
        status: "2",
        type: 0,
      })
      .then((result) => {
        navigation.goBack();
        setLoading(false);
      })
      .catch((err) => console.log(err, "-=error"));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={[styles.text, { color: "#8E2835" }]}> {data?.name} </Text>
      </View>

      <View style={(styles.bodycontainer, { marginTop: 10 })}>
        <Text style={[styles.text, { fontSize: 16 }]}>Resume</Text>
        <Text> (tap to download) </Text>
        <TouchableOpacity style={[styles.addButton, { height: 110 }]}>
          <Hyperlink linkDefault={true}>
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={35}
              color="#70707033"
            />
            <Text style={{ color: "#B1B1B1", fontSize: 12 }}>
              {" "}
              {data?.downloadURL}
            </Text>
          </Hyperlink>
        </TouchableOpacity>
        <Text style={[styles.text, { fontSize: 16 }]}>Email</Text>
        <TextInput
          style={[
            styles.addButton,
            { height: 50 },
            { paddingHorizontal: 10 },
            { color: "black" },
          ]}
          value={data?.email}
          editable={false}
        ></TextInput>
        <Text style={[styles.text, { fontSize: 16 }]}>
          Why should you be our validator?
        </Text>
        <Text>Note from the applicant.</Text>
        <TextInput
          style={[
            styles.addButton,
            { height: 180 },
            { paddingHorizontal: 10 },
            { color: "black" },
          ]}
          value={data?.note}
          multiline={true}
          editable={false}
        ></TextInput>
      </View>

      <View style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#288E4D" }]}
          onPress={() => Accept()}
        >
          <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
            Accept
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#BB0000" }]}
          onPress={() => Decline()}
        >
          <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
            Decline
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  usersAll: store.userState.usersAll,
});

export default connect(mapStateToProps, null)(ApplicationConf);
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    top: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  bodycontainer: {
    paddingVertical: 30,
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
    paddingVertical: 20,
    paddingHorizontal: 54,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
