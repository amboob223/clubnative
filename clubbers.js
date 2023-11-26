import React, { useState } from "react";
import { View, Button, TextInput, Alert, StyleSheet, ScrollView } from "react-native";

export default function Clubbers() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    phone: "",
    email: "",
  });

  const submitHandler = async () => {
    try {
      const response = await fetch("http://192.168.1.243:3000/clubbers/text", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          namee: formData.name,
          date: formData.date,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        console.log(response.status, response.statusText);
        Alert.alert("FAIL", "SOMETHING IS WRONG");
        return;
      }

      setFormData({
        name: "",
        date: "",
        phone: "",
        email: "",
      });

      Alert.alert("Success","Now look and see where you want to party")
    } catch (error) {
      console.error(error);
      Alert.alert("error", "this ain't it");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Name"
          value={formData.name}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFormData({ ...formData, date: text })}
          placeholder="Date"
          value={formData.date}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="Phone"
          value={formData.phone}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Email"
          value={formData.email}
        />
        <Button title="Submit" onPress={submitHandler} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282c34",
    flex: 1,
  },
  form: {
    margin: 30,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: "#333",
  },
});
