import { View, Text, ImageBackground, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { Button, Overlay, Icon } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';


export default function AddPatient(props) {

  //input
  const [nameInput, setNameInput] = useState({ color: '#a9a9a9', text: 'שם משתמש' });
  const [mailInput, setMailInput] = useState({ color: '#a9a9a9', text: 'example@gmail.com' });
  const [phoneInput, setPhoneInput] = useState({ color: '#a9a9a9', text: '0500000000' });
  const [pass1Input, setPass1Input] = useState({ color: '#a9a9a9', text: 'סיסמה' });
  const [pass2Input, setPass2Input] = useState({ color: '#a9a9a9', text: 'אימות סיסמה' });


  //Terapist id
  const idTerapist = props.route.params.id;

  //Patient
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  //Overlay
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };


  //toggleSwitch
  const [isEnabledMale, setIsEnabledMale] = useState(false);
  const [isEnabledFemale, setIsEnabledFemale] = useState(false);
  const [isEnabledOther, setIsEnabled1Other] = useState(false);

  const toggleSwitchMale = () => {
    setIsEnabledMale(previousState => !previousState);
    if (isEnabledMale) {
      setGender('זכר');
    }
    else {
      setGender('');
    }
  }
  const toggleSwitchFemale = () => {
    setIsEnabledFemale(previousState => !previousState);
    if (isEnabledFemale) {
      setGender('נקבה');
    }
    else {
      setGender('');
    }
  }
  const toggleSwitchOther = () => {
    setIsEnabled1Other(previousState => !previousState);
    if (isEnabledOther) {
      setGender('אחר');
    }
    else {
      setGender('');
    }
  }

  //DATA - url
  const apiUrl = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Patient";

  //add patient button
  const addPatient = () => {

    console.log(email);
    console.log(name);
    console.log(phone);
    console.log(gender);


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
    //Check for the Phone TextInput
    if (!phone.trim()) {
      let newobj = { color: 'red', text: 'חובה להזין מספר טלפון' };
      setPhoneInput(newobj)
      return;
    }
    //Check for the Gender TextInput
    if (!gender.trim()) {
      alert('עלייך לסמן זכר, נקבה או אחר');
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

      //set patient object
      let obj = [{ NicknamePatient: name, PasswordPatient: password1, EmailPatient: email, PhoneNumberPatient: phone, PatientStatus: 1, PatientGender: gender, UpdatePermissionPatient: 0, ReceiveAlertsPermissionPatient: 1, IdTherapist: idTerapist }];
      //let obj = [{ NicknamePatient: 'אביב', PasswordPatient: '1234', EmailPatient: 'aviv@gmail.com', PhoneNumberPatient: '0545954582', PatientStatus: 1, PatientGender: 'זכר', UpdatePermissionPatient: 0, ReceiveAlertsPermissionPatient: 1, IdTherapist: idTerapist }];

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
  }


  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>מטופל חדש</Text>

      <SafeAreaView style={{ top: 90 }}>
        <TextInput
          style={styles.input}
          onChangeText={newText => setName(newText)}
          placeholder={nameInput.text}
          placeholderTextColor={nameInput.color}
          left={<TextInput.Icon name="account-outline" color="grey" size={20} />}
          activeUnderlineColor="orange"
        />

        <TextInput
          style={styles.input}
          nChangeText={newText => setEmail(newText)}
          placeholder={mailInput.text}
          placeholderTextColor={mailInput.color}
          left={<TextInput.Icon name="email-outline" color="grey" size={20} />}
          activeUnderlineColor="orange"
        />

        <TextInput
          style={styles.input}
          onChangeText={newText => setPhone(newText)}
          placeholder={phoneInput.text}
          placeholderTextColor={phoneInput.color}
          left={<TextInput.Icon name="phone-outline" color="grey" size={20} />}
          activeUnderlineColor="orange"
        />

        <View style={styles.genderinput}>
          <Text style={styles.gender}>זכר</Text>
          <Switch
            trackColor={{ false: "#a9a9a9", true: "#dcdcdc" }}
            thumbColor={isEnabledMale ? "#D3DE32" : "#f4f3f4"}
            ios_backgroundColor="#a9a9a9"
            onValueChange={toggleSwitchMale}
            value={isEnabledMale}
          />
          <Text style={styles.gender}>נקבה</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#dcdcdc" }}
            thumbColor={isEnabledFemale ? "#D3DE32" : "#f4f3f4"}
            ios_backgroundColor="#a9a9a9"
            onValueChange={toggleSwitchFemale}
            value={isEnabledFemale}
          />
          <Text style={styles.gender}>אחר</Text>
          <Switch
            trackColor={{ false: "#a9a9a9", true: "#dcdcdc" }}
            thumbColor={isEnabledOther ? "#D3DE32" : "#f4f3f4"}
            ios_backgroundColor="#a9a9a9"
            onValueChange={toggleSwitchOther}
            value={isEnabledOther}
          />
        </View>

        <TextInput
          style={styles.input}
          onChangeText={newText => setPassword1(newText)}
          placeholder={pass1Input.text}
          placeholderTextColor={pass1Input.color}
          left={<TextInput.Icon name="key-outline" color="grey" size={20} />}
          activeUnderlineColor="orange"
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          onChangeText={newText => setPassword2(newText)}
          placeholder={pass2Input.text}
          placeholderTextColor={pass2Input.color}
          left={<TextInput.Icon name="key-outline" color="grey" size={20} />}
          activeUnderlineColor="orange"
          secureTextEntry={true}
        />

      </SafeAreaView>

      <View>
        <Button
          title="אישור"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          containerStyle={styles.containerStyle}
          onPress={addPatient}
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