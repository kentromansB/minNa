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
    SafeAreaView,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import firebase from "firebase";
  require("firebase/firestore");
  require("firebase/firebase-storage");

{
    /* Form Input */
  }
  export const FormInput = ({
    labelText = "",
    placeholderText = "",
    onChangeText = null,
    value = null,
    ...more
  }) => {
    return (
      <View style={{ width: "100%", marginBottom: 20 }}>
        <Text>{labelText}</Text>
        <TextInput
          style={{
            padding: 10,
            borderColor: COLORS.black + "20",
            borderWidth: 1,
            width: "100%",
            borderRadius: 5,
            marginTop: 10,
          }}
          placeholder={placeholderText}
          onChangeText={onChangeText}
          value={value}
          {...more}
        />
      </View>
    );
  };
  
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
  



const Edits = ({route}) => {

    const { language } = route?.params ?? {};
    const { currentData } = route?.params ?? {};
    const { data } = route?.params ?? {};
    

    


    const [question, setQuestion] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [OptionTwo, setOptionTwo] = useState("");
  const [OptionThree, setOptionThree] = useState("");
  const [OptionFour, setOptionFour] = useState("");

    const [questions, setQuestions] = useState(currentData?.question);
    const [CorrectAnswers, setAnswer] = useState(currentData?.correct_answer);
    const [options1, setOptions1] = useState(currentData?.incorrect_answers[0])
    const [options2, setOptions2] = useState(currentData?.incorrect_answers[1])
    const [options3, setOptions3] = useState(currentData?.incorrect_answers[2])



  const handleQuestionSave = async () => {
    if (
      question == "" ||
      correctAnswer == "" ||
      OptionTwo == "" ||
      OptionThree == "" ||
      OptionFour == ""
    ) {
      return;
    }

    // Add question to db
    await createQuestion( {
      question: question,
      correct_answer: correctAnswer,
      incorrect_answers: [OptionTwo, OptionThree, OptionFour],
    });

    // Reset
    setQuestion("");
    setCorrectAnswer("");
    setOptionTwo("");
    setOptionThree("");
    setOptionFour("");
  };


  const createQuestion = () => {
    return firebase
      .firestore()
      .collection("languages")
      .doc(language)
      .collection("Quizzes")
      .doc(data)
      .collection("QNA")
      .doc(`${currentData?.id}`)
      .update({
        question,
        correct_answer: correctAnswer,
        incorrect_answers: [OptionTwo, OptionThree, OptionFour],
      })

      .then(() => {
        console.log('Question updated!');
      });
  };

 


  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ padding: 20 }}>
          <Text
            style={{ fontSize: 20, textAlign: "center", color: COLORS.black }}
          >
            Edit Question
          </Text>
          <Text style={{ textAlign: "center", marginBottom: 20 }}>
            For {currentData.question}
          </Text>

          <FormInput
            labelText="Question"
            placeholderText={questions}
            onChangeText={(val) => setQuestion(val)}
            value={question}
          />

          {/* Image upload */}

          {/* Options */}
          <View style={{ marginTop: 30 }}>
            <FormInput
              labelText="Correct Answer"
              placeholderText={CorrectAnswers}
              onChangeText={(val) => setCorrectAnswer(val)}
              value={correctAnswer}
            />
            <FormInput
              labelText="Option 2"
              placeholderText={options1}
              onChangeText={(val) => setOptionTwo(val)}
              value={OptionTwo}
            />
            <FormInput
              labelText="Option 3"
              placeholder={options2}
              onChangeText={(val) => setOptionThree(val)}
              value={OptionThree}
            />
            <FormInput
              labelText="Option 4"
              placeholder={options3}
              onChangeText={(val) => setOptionFour(val)}
              value={OptionFour}
            />
          </View>
          <FormButton
            labelText="Save Question"
            handleOnPress={handleQuestionSave}
          />
          <FormButton
            labelText="Done & Go Home"
            isPrimary={false}
            handleOnPress={() => {
              setcurrentQuizId("");
              navigation.navigate("Course");
            }}
            style={{
              marginVertical: 20,
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Edits;

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