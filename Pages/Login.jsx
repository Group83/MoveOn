import { View, Text, ImageBackground, StyleSheet, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import React from 'react';
import { I18nManager } from "react-native";

export default function Login({ navigation }) {

  return (

    <ImageBackground source={require('../images/background.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>כניסה לחשבון</Text>

      <SafeAreaView style={{ top: -250 }}>
        <TextInput
          style={styles.emailinput}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="example@gmail.com"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.passinput}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="***********"
          keyboardType="phone-pad"
        />
      </SafeAreaView>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Sign Up');
      }}>
        <Text style={styles.text}>שכחתי סיסמא</Text>
      </TouchableOpacity>

      <Button
        title="כניסה"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        onPress={() => navigation.navigate('Dashboard')}
      />

      <View style={styles.iconContainerStyle}>
        <Button
          icon={{
            name: 'google',
            type: 'font-awesome',
            size: 20,
            color: 'black',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          buttonStyle={{
            backgroundColor: '#E5E5E5',
            borderColor: '#E5E5E5',
            borderWidth: 5,
            borderRadius: 15,
          }}
          containerStyle={{
            marginHorizontal: 50,
            marginHorizontal: 32,
            width: 150,
          }}
        />

        <Button
          icon={{
            name: 'facebook',
            type: 'font-awesome',
            size: 20,
            color: 'black',
          }}
          iconContainerStyle={{ marginRight: 10 }}
          buttonStyle={{
            backgroundColor: '#E5E5E5',
            borderColor: '#E5E5E5',
            borderWidth: 5,
            borderRadius: 15,
          }}
          containerStyle={{
            marginHorizontal: 32,
            width: 150,
          }}
        />
      </View>

      <TouchableOpacity style={styles.touchOp} onPress={() => {
        navigation.navigate('Sign Up');
      }}>
        <Text style={styles.text1}>עדיין אין לך חשבון ?</Text>
        <Text style={styles.text2}>משתמש חדש</Text>
      </TouchableOpacity>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  image: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    flex: 1,
    width: 258,
    height: 137,
    left: 50,
    top: 250,
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
  },

  emailinput: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: 30,
    marginVertical: 20,
    borderBottomWidth: 1,
  },

  passinput: {
    flexDirection: "row",
    marginVertical: 20,
    height: 40,
    marginHorizontal: 30,
    borderBottomWidth: 1,
  },

  text: {
    left: 30,
    top: -250,
    color: '#313131',
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
    height: 43,
    width: 380,
    top: -200,
  },

  text1: {
    fontSize: 10,
    color: '#FFFFFF',
    marginHorizontal: 60,
  },

  text2: {
    fontSize: 20,
    color: '#07635D',
    fontWeight:'400'
  },

  touchOp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
    top: -50,
    backgroundColor: '#D3DE32',
    borderRadius: 5,
    width: 380,
    height: 40,
    margin: 25,
  },

  iconContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    top: -170,
    marginHorizontal: 0,
  },

});