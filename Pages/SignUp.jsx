import { View, Text, ImageBackground, StyleSheet, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import React from 'react';

export default function SignUp({ navigation }) {
  return (
    <ImageBackground source={require('../images/background.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>משתמש</Text>
      <Text style={styles.title}>חדש</Text>

      <SafeAreaView style={{top:50}}>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="שם"
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
        title="התחבר"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        onPress={() => navigation.navigate('Dashboard')}
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
    left: 50,
    flexDirection: "row",
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
  },

  input: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: 30,
    marginVertical: 20,
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
    marginVertical: 20,
    height: 43,
    width: 380,
    top:70
  },

});