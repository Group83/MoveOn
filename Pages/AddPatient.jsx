import { View, Text, ImageBackground, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';


export default function AddPatient(props) {

  //Terapist id
  const idTerapist = props.route.params.id;

  //Patient
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [patient, setPatient] = useState({});

  //toggleSwitch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  //DATA - url
  const apiUrl = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Patient";

  //add patient button
  const addPatient = () => {

    //let obj = [{ NicknamePatient: name, PasswordPatient: password1, EmailPatient: email, PhoneNumberPatient: phone, PatientStatus: 1, PatientGender: gender, UpdatePermissionPatient: 0, ReceiveAlertsPermissionPatient: 1, IdTherapist: idTerapist }];
    let obj = [{ NicknamePatient: 'אביב', PasswordPatient: '1234', EmailPatient: 'aviv@gmail.com', PhoneNumberPatient: '0545954582', PatientStatus: 1, PatientGender: 'זכר', UpdatePermissionPatient: 0, ReceiveAlertsPermissionPatient: 1, IdTherapist: idTerapist }];

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

        console.log('ok');
        alert('המשתמש נוצר בהצלחה');
        navigation.navigate('Dashboard');

        //if email exist
        // if (res == 1) {
        //   alert('המשתמש נוצר בהצלחה');
        //   navigation.navigate('Dashboard');
        // } else {
        //   alert('כתובת המייל נמצאת כבר במערכת');
        // }

      }).catch(error => {
        console.log('error')
      })
  }


  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>מטופל חדש</Text>

      <SafeAreaView style={{ top: 90 }}>
        <TextInput
          left={<TextInput.Icon name="email" />}
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

        <View style={styles.genderinput}>
          <Text style={styles.gender}>זכר</Text>
          <Switch
            trackColor={{ false: "#a9a9a9", true: "#dcdcdc" }}
            thumbColor={isEnabled ? "#D3DE32" : "#f4f3f4"}
            ios_backgroundColor="#a9a9a9"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.gender}>נקבה</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#dcdcdc" }}
            thumbColor={isEnabled ? "#D3DE32" : "#f4f3f4"}
            ios_backgroundColor="#a9a9a9"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={styles.gender}>אחר</Text>
          <Switch
            trackColor={{ false: "#a9a9a9", true: "#dcdcdc" }}
            thumbColor={isEnabled ? "#D3DE32" : "#f4f3f4"}
            ios_backgroundColor="#a9a9a9"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="סיסמה"
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={text}
          placeholder="אימות סיסמה"
          keyboardType="phone-pad"
        />

      </SafeAreaView>

      <Button
        title="אישור"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        onPress={addPatient}
      />

    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  genderinput: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: 70,
    marginTop: 30,
  },

  gender: {
    fontSize: 14,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    color: '#696969'
  },

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
  },

  input: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: 30,
    marginVertical: 18,
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
    marginVertical: 10,
    height: 43,
    width: 380,
    top: 120
  },

});