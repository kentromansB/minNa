import React from "react";
import { View, Text } from "react-native";
export const NoConnection = () => {
  return (
    <View style={styles.container}>
      <Text> No Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NoConnection;
