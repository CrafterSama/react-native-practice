import React from "react";

import { StyleSheet, Text, View } from "react-native";

export default function Header({
  title,
  headerRight,
  headerLeft,
}: {
  title: string;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
}) {
  return (
    <View style={styles.header}>
      <View>{headerLeft && headerLeft}</View>
      <Text style={styles.title}>{title}</Text>
      <View>{headerRight && headerRight}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#002859",
  },
});
