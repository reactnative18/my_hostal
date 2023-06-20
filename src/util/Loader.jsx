
import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";
import { Colors } from "./Colors";

const Loader = (props) => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {
        console.log("close modal");
      }}
    >
      <View style={styles.modalBackground}>
        <ActivityIndicator
          animating={true}
          color={Colors.blue}
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.transparent,
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
