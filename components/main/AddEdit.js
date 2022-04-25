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
    FlatList,
    KeyboardAvoidingView,
    ToastAndroid,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import firebase from "firebase";
  require("firebase/firestore");
  require("firebase/firebase-storage");

{
    /*Button Form */
  }
  export const FormButton = ({
    labelText = "",
    handleOnPress = null,
    style,
    isPrimary = true,
    ...more
  }) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          backgroundColor: isPrimary ? COLORS.primary : COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: 5,
          ...style,
        }}
        activeOpacity={0.9}
        onPress={handleOnPress}
        {...more}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: isPrimary ? COLORS.white : COLORS.primary,
          }}
        >
          {labelText}
        </Text>
      </TouchableOpacity>
    );
  };

const AddEdit = ({navigation, route}) => {
    const { language } = route?.params ?? {};
  console.log(language);


  return (
   <View>
        <FormButton
            labelText="Add Question"
            handleOnPress={() => {
                
                navigation.navigate("AddQuestions", {language: language});
              }}
          />
          <FormButton
            labelText="Edit Question"
            handleOnPress={() => {
              navigation.navigate("EditQuestion", {language: language});
            }}
            style={{
              marginVertical: 20,
            }}
          />
   </View>
    
    
  )
}

export default AddEdit;
const COLORS = {
    primary: "#4630EB",
    secondary: "#000020",
  
    success: "#00C851",
    error: "#ff4444",
  
    black: "#171717",
    white: "#FFFFFF",
    background: "#f4f4f4",
    border: "#F5F5F7",
  };
  
  export const SIZES = {
    base: 10,
  };
  