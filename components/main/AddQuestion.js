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


function AddQuestion({ currentUser, route, navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bodycontainer}>
        <View style={{ marginVertical: 15 }}>
          <View>
            <Text style={[styles.text, { color: "#000000" }]}>
              Add a New Questions
            </Text>
          </View>
        </View>

        <View style={{ marginVertical: 5 }}>
          <Text style={[styles.text, { fontSize: 16 }]}>Questions:</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            marginVertical: 25,
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#bfa42a" }]}
            onPress={() => navigation.navigate("AddQuiz")}
          >
            <Text style={[styles.text, { fontSize: 16, color: "white" }]}>
              Add New Questions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


export default connect()(AddQuestion);
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
  },
});
