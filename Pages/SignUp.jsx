import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, Overlay, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';

export default function SignUp({ navigation }) {

  //input
  const [nameInput, setNameInput] = useState({ color: '#a9a9a9', text: 'שם משתמש' });
  const [mailInput, setMailInput] = useState({ color: '#a9a9a9', text: 'example@gmail.com' });
  const [pass1Input, setPass1Input] = useState({ color: '#a9a9a9', text: 'סיסמה' });
  const [pass2Input, setPass2Input] = useState({ color: '#a9a9a9', text: 'אימות סיסמה' });

  //Terapist
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  //DATA - url
  const apiUrl = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Terapist";

  //connect button
  const connect = () => {

    //check empty fields
    //Check for the Name TextInput
    if (!name.trim()) {
      let newobj = { color: 'red', text: 'חובה להזין שם משתמש' };
      setNameInput(newobj)
      return;
    }
    //Check for the Email TextInput
    if (!email.trim()) {
      let newobj = { color: 'red', text: 'חובה להזין כתובת אימייל' };
      setMailInput(newobj)
      return;
    }
    //Check for the Password TextInput
    if (!password1.trim()) {
      let newobj = { color: 'red', text: 'חובה להזין סיסמה' };
      setPass1Input(newobj)
      return;
    }
    //Check for the Password TextInput
    if (!password2.trim()) {
      let newobj = { color: 'red', text: 'חובה להזין אימות סיסמה' };
      setPass2Input(newobj)
      return;
    }

    //check password
    if (password1 !== password2) {
      toggleOverlay();
    }
    else {

      let obj = [{ NicknameTherapist: name, EmailTherapist: email, PasswordTherapist: password1 }];

      console.log(obj);

      //send terapist to DB
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(obj[0]),
        headers: new Headers({
          'Content-Type': 'application/json ; charset=UTP-8',
          'Accept': 'application/json ; charset=UTP-8'
        })
      })
        .then(res => {

          console.log(res);

          //if email exist
          if (res) {
            alert('המשתמש נוצר בהצלחה');
            navigation.navigate('Log in');
          } else {
            alert('כתובת המייל נמצאת כבר במערכת');
          }

        }).catch(error => {
          console.log("err post=", error);
        })
    }

  };

  //Overlay
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <ImageBackground source={require('../images/background.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>משתמש</Text>
      <Text style={styles.title}>חדש</Text>

      <SafeAreaView style={{ top: 50 }}>
        <TextInput
          left={<TextInput.Icon name="account-outline" color="grey" size={20} />}
          style={styles.input}cc
          onChangeText={newText => setName(newText)}
          placeholder={nameInput.text}
          keyboardType="default"
          placeholderTextColor={nameInput.color}
          activeUnderlineColor="orange"
        />

        <TextInput
          left={<TextInput.Icon name="email-outline" color="grey" size={20} />}
          activeUnderlineColor="orange"
          style={styles.input}
          onChangeText={newText => setEmail(newText)}
          placeholder={mailInput.text}
          placeholderTextColor={mailInput.color}
          keyboardType="email-address"
        />

        <TextInput
          left={<TextInput.Icon name="key-outline" color="grey" size={20} />}
          activeUnderlineColor="orange"
          style={styles.input}
          onChangeText={newText => setPassword1(newText)}
          placeholder={pass1Input.text}
          keyboardType="ascii-capable"
          secureTextEntry={true}
          placeholderTextColor={pass1Input.color}
        />

        <TextInput
          left={<TextInput.Icon name="key-outline" color="grey" size={20} />}
          activeUnderlineColor="orange"
          style={styles.input}
          onChangeText={newText => setPassword2(newText)}
          placeholder={pass2Input.text}
          keyboardType="ascii-capable"
          secureTextEntry={true}
          placeholderTextColor={pass2Input.color}
        />
      </SafeAreaView>

      <View>
        <Button
          title="התחבר"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          containerStyle={styles.containerStyle}
          onPress={connect}
        />
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Icon name='warning' color='#ff4500' size={30} />
          <Text style={styles.textSecondary}>
            אימות סיסמה נכשל!
          </Text>
          <Text style={styles.textSecondary}>
            הסיסמאות אינן זהות, אנא נסה שנית
          </Text>
          <Button
            title="אישור"
            buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
            titleStyle={{ color: 'white', marginHorizontal: 20 }}
            onPress={toggleOverlay}
          />
        </Overlay>

      </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },

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
    // borderBottomWidth: 1,
    backgroundColor: 'white'
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
    top: 70
  },

});