import { View, Text, ImageBackground, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';


export default function AddPatient({ navigation }) {
  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>מטופל חדש</Text>

      <SafeAreaView style={{ top: 90 }}>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="שם המטופל"
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="מספר מטופל"
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="מין"
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="תאריך לידה"
          keyboardType="default"
        />

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="כתובת אימייל"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="מספר טלפון"
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="סיסמא"
          keyboardType="phone-pad"
        />


        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="אימות סיסמא"
          keyboardType="phone-pad"
        />
      </SafeAreaView>

      <Button
        title="אישור"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        onPress={() => navigation.navigate('Activity Board')}
      />

    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  image: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    left: 20,
    flexDirection: "row",
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
    top:10
  },

  input: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: 30,
    marginVertical: 12,
    borderBottomWidth: 1,
  },

  buttonStyle: {
    backgroundColor: '#D3DE32',
    borderRadius: 5,
    borderColor: '#000000',
    borderWidth: 1,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 56, height: 13 },
    shadowRadius: 5,
    shadowOffset: { width: 0.1, height: 0.1 },
  },

  titleStyle: {
    fontSize: 20,
    color: 'black'
  },

  containerStyle: {
    marginHorizontal: 25,
    marginVertical: 10,
    height: 43,
    width: 380,
    top: 120
  },

});