import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";



var logo = require("../../assets/info1.png");

export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={{ width: 280, height: 180 }} />
      </View>
      <View style={styles.header}>
        <Text style={styles.textHead}>Learn Kagan Language</Text>
        {/* </View>
      <View style={styles.subHeader}> */}
        <Text style={styles.textSubHead}>
          Kagan has a native language called Kinagan, which is related to the
          Mandayan Language and Maguindanaon, Tausug, Visayan, and Tagalog
          dialects and was influenced by the Arabic Language. Let us preserve
          native language and be part of team to by contributing what you know.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#8E2835" }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { borderWidth: 2, borderColor: "#8E2835" }]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={[styles.text, { color: "#8E2835" }]}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    margin: 5,
    width: "80%",
  },

  text: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  image: {
    alignSelf: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
  },
  logoContainer: {
    position: "relative",
    alignSelf: "center",
    top: -30,
  },
  header: {
    alignSelf: "center",
    //bottom: -45,
    //top:50,
  },

  textHead: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    alignSelf: "center",
    margin: 10,
  },
  subHeader: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    bottom: -60,
    paddingLeft: 20,
    paddingRight: 20,
  },

  textSubHead: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
    margin: 15,
    bottom: 10,
  },
});
