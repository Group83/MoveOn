import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';

export default function Login({ navigation }) {

  const [mailInput, setMailInput] = useState({ color: '#a9a9a9', text: 'example@gmail.com' });
  const [passInput, setPassInput] = useState({ color: '#a9a9a9', text: '********' });

  //Overlay
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //answer terapistID from DATA
  const [terapistId, setterapistId] = useState(0);

  //DATA - url
  const apiUrl = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Terapist?email";

  //check User function
  const checkUser = () => {

    //check empty fields
    //Check for the Email TextInput
    if (!email.trim()) {
      let newobj = { color: 'red', text: 'חובה להזין כתובת אימייל' };
      setMailInput(newobj)
      return;
    }
    //Check for the Name TextInput
    if (!password.trim()) {
      let newobj = { color: 'red', text: 'חובה להזין סיסמה' };
      setPassInput(newobj)
      return;
    }

    //get all recipes from DB
    fetch(apiUrl + "=" + email + "&password=" + password, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {

          if (result[0]) {
            navigation.navigate('Dashboard', { id: result[0].IdTherapist, name: result[0].NicknameTherapist });
          }
          else {
            toggleOverlay();
          }

        },
        (error) => {
          console.log("err post=", error);
        });
  }

  return (

    <ImageBackground source={require('../images/background.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>כניסה לחשבון</Text>

      <SafeAreaView style={{ top: -250 }}>
        <TextInput
          left={<TextInput.Icon name="email-outline" color="grey" size={20}/>}
          style={styles.input}
          onChangeText={newText => setEmail(newText)}
          placeholder={mailInput.text}
          placeholderTextColor={mailInput.color}
          activeUnderlineColor="orange"
        />

        <TextInput
          left={<TextInput.Icon name="key-outline" color="grey" size={20}/>}
          style={styles.input}
          onChangeText={newText => setPassword(newText)}
          secureTextEntry={true}
          placeholder={passInput.text}
          placeholderTextColor={passInput.color}
          activeUnderlineColor="orange"
        />
      </SafeAreaView>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Sign Up');
      }}>
        <Text style={styles.text}>שכחתי סיסמא</Text>
      </TouchableOpacity>

      <View>
        <Button
          title="כניסה"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          containerStyle={styles.containerStyle}
          onPress={checkUser}
        />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Icon name='warning' color='#ff4500' size={30} />
          <Text style={styles.textSecondary}>
            כתובת אימייל או סיסמה שהזנתם אינם תקינים
          </Text>
          <Button
            title="אישור"
            buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={toggleOverlay}
          />
        </Overlay>
      </View>

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

  textSecondary: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 17,
  },

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

  input: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: 30,
    marginVertical: 20,
    // borderBottomWidth: 1,
    backgroundColor: 'white'
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
    fontWeight: '400'
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