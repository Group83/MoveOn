import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import React, { useState } from 'react';
import Overlay from 'react-native-modal-overlay';

export default function Login({ navigation }) {

  //Input variables
  const [mailInput, setMailInput] = useState({ color: '#a9a9a9', text: 'example@gmail.com' });
  const [passInput, setPassInput] = useState({ color: '#a9a9a9', text: '********' });
  const [emailInputFocus, setEmailInputFocus] = useState(false);
  const [passwordInputFocus, setPasswordInputFocus] = useState(false);

  //Overlay
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //User 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //DATA - url
  const apiUrl = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Terapist?email";

  //check User function
  const checkUser = () => {

    //check empty fields
    if (!email.trim()) { //Check for the Email TextInput
      let newobj = { color: 'red', text: 'נראה שחסרה כתובת אימייל' };
      setMailInput(newobj)
      return;
    }
    if (!password.trim()) { //Check for the Name TextInput
      let newobj = { color: 'red', text: 'נראה שחסרה סיסמה' };
      setPassInput(newobj)
      return;
    }

    //GET user from DB
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
          if (result[0]) { //found user
            navigation.navigate('Dashboard', { id: result[0].IdTherapist, name: result[0].NicknameTherapist, back: false });
          }
          else { //not found user
            toggleOverlay();
          }
        },
        (error) => {
          console.log("err GET=", error);
        });
  }

  return (

    <View style={styles.topContainer}>

      <Header
        centerComponent={
          <Image
            source={require('../images/newlogo.jpeg')}
            resizeMode="cover"
            style={{ width: 230, alignSelf: 'center', height: 45 }}
          />
        }
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
        }}
      />

      <ImageBackground source={require('../images/background.png')} resizeMode='stretch' style={styles.image}>

        <Text style={styles.title}>כניסה לחשבון</Text>

        <SafeAreaView style={{ top: -250 }}>

          <View style={styles.inputSection}>
            <Icon style={styles.icon} name="email" size={27} color="#000" />
            <TextInput
              style={[styles.inputEmail, { borderBottomColor: emailInputFocus ? '#fc7b03' : '#000' }]}
              onChangeText={newText => setEmail(newText)}
              placeholder={mailInput.text}
              placeholderTextColor={mailInput.color}
              textAlign='right'
              onFocus={event => setEmailInputFocus(true)}
              onBlur={event => setEmailInputFocus(false)}
            />
          </View>

          <View style={styles.inputSection}>
            <Icon style={styles.icon} name="vpn-key" size={27} color="#000" />
            <TextInput
              style={[styles.inputPass, { borderBottomColor: passwordInputFocus ? '#fc7b03' : '#000' }]}
              onChangeText={newText => setPassword(newText)}
              placeholder={passInput.text}
              placeholderTextColor={passInput.color}
              textAlign='right'
              secureTextEntry={true}
              onFocus={event => setPasswordInputFocus(true)}
              onBlur={event => setPasswordInputFocus(false)}
            />
          </View>

        </SafeAreaView>

        <TouchableOpacity onPress={() => {
          navigation.navigate('Reset Password');
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
          <Overlay visible={visible} onBackdropPress={toggleOverlay}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center' }}
            childrenWrapperStyle={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 15, alignItems: 'center', width: '50%' }}>
            <Text style={styles.textSecondary}>
              כתובת אימייל או הסיסמה שהזנתם אינם קיימים במערכת
            </Text>
            <Button
              title="אישור"
              buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
              titleStyle={{ color: 'white', marginHorizontal: 15, fontSize:20 }}
              onPress={toggleOverlay}
            />
          </Overlay>
        </View>

        <TouchableOpacity style={styles.touchOp} onPress={() => {
          navigation.navigate('Sign Up');
        }}>
          <Text style={styles.text1}>עדיין אין לך חשבון ?</Text>
          <Text style={styles.text2}>משתמש חדש</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  inputSection: {
    flexDirection: 'row',
  },

  icon: {
    marginLeft: 160,
    marginRight: 20,
    marginTop: 40
  },

  topContainer: {
    flex: 1,
  },

  textSecondary: {
    marginVertical: '5%',
    textAlign: 'center',
    fontSize: 20,
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    flex: 1,
    width: 380,
    left: 50,
    top: 350,
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
  },

  inputEmail: {
    flexDirection: "row",
    height: 65,
    marginVertical: 20,
    backgroundColor: 'white',
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '50%',
    marginBottom: 30,
    borderBottomWidth: 1,
    fontSize: 18
  },

  inputPass: {
    flexDirection: "row",
    height: 65,
    marginVertical: 20,
    backgroundColor: 'white',
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '50%',
    marginBottom: 90,
    borderBottomWidth: 1,
    fontSize: 18
  },

  text: {
    top: -300,
    color: '#313131',
    right: '65%'
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
    fontSize: 25,
    color: 'black'
  },

  containerStyle: {
    marginHorizontal: 25,
    height: 45,
    width: '50%',
    top: -230,
    marginHorizontal: '25%'
  },

  text1: {
    fontSize: 15,
    color: '#FFFFFF',
    marginHorizontal: '13%',
  },

  text2: {
    fontSize: 20,
    color: '#07635D',
    fontWeight: '400',
    marginRight: '50%'
  },

  touchOp: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -90,
    backgroundColor: '#D3DE32',
    borderRadius: 5,
    width: '50%',
    height: 40,
    marginHorizontal: '25%',
  },

  iconContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    top: -170,
    marginHorizontal: 0,
  },

});