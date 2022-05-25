import { View, Text, ImageBackground, StyleSheet, SafeAreaView, Switch, TouchableOpacity, TextInput } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import React, {useState } from 'react';


export default function AddPatient(props) {

  //Input variables
  const [nameInput, setNameInput] = useState({ color: '#a9a9a9', text: 'כינוי' });
  const [phoneInput, setPhoneInput] = useState({ color: '#a9a9a9', text: '0500000000' });
  const [pass1Input, setPass1Input] = useState({ color: '#a9a9a9', text: 'סיסמה' });
  const [pass2Input, setPass2Input] = useState({ color: '#a9a9a9', text: 'אימות סיסמה' });
  const myTextInput = React.createRef();

  //SET terapist variables from dashboard
  const idTerapist = props.route.params.idTerapist;
  const nameTerapist = props.route.params.name;

  //Patient variables
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  //Toggle Switch
  const [isEnabledMale, setIsEnabledMale] = useState(false);
  const [isEnabledFemale, setIsEnabledFemale] = useState(false);
  const [isEnabledOther, setIsEnabledOther] = useState(false);
  const toggleSwitchMale = () => {
    setIsEnabledMale(previousState => !previousState);
    setIsEnabledFemale(false);
    setIsEnabledOther(false);
    if (!isEnabledMale) {
      setGender('זכר');
    }
    else {
      setGender('');
    }
  }
  const toggleSwitchFemale = () => {
    setIsEnabledFemale(previousState => !previousState);
    setIsEnabledMale(false);
    setIsEnabledOther(false);
    if (!isEnabledFemale) {
      setGender('נקבה');
    }
    else {
      setGender('');
    }
  }
  const toggleSwitchOther = () => {
    setIsEnabledOther(previousState => !previousState);
    setIsEnabledFemale(false);
    setIsEnabledMale(false);
    if (!isEnabledOther) {
      setGender('אחר');
    }
    else {
      setGender('');
    }
  }

  //DATA - url
  const apiUrl = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Patient";

  //Add patient button
  const addPatient = () => {

    //check empty fields
    if (!name.trim()) { //Check for the Name TextInput
      let newobj = { color: 'red', text: 'נראה שחסר כינוי' };
      setNameInput(newobj)
      return;
    }
    if (!phone.trim()) { //Check for the Phone TextInput
      let newobj = { color: 'red', text: 'נראה שחסר מספר טלפון' };
      setPhoneInput(newobj)
      return;
    }
    if (!gender.trim()) { //Check for the Gender TextInput
      alert('עלייך לסמן זכר, נקבה או אחר');
      return;
    }
    if (!password1.trim()) { //Check for the Password TextInput
      let newobj = { color: 'red', text: 'נראה שחסרה סיסמה' };
      setPass1Input(newobj)
      return;
    }
    if (!password2.trim()) { //Check for the Password TextInput
      let newobj = { color: 'red', text: 'עליך לאמת את הסיסמה שהזנת' };
      setPass2Input(newobj)
      return;
    }

    //Check matching passwords
    if (password1 !== password2) {
      let newobj = { color: 'red', text: 'הסיסמה אינה זהה לסיסמה שבחרת' };
      setPass2Input(newobj)
      myTextInput.current.clear();
    }
    else {

      //SET patient object
      let obj = [{ NicknamePatient: name, PasswordPatient: password1, EmailPatient: name, PhoneNumberPatient: phone, PatientStatus: 1, PatientGender: gender, UpdatePermissionPatient: 0, ReceiveAlertsPermissionPatient: 1, IdTherapist: idTerapist }];

      //POST patient to DB
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(obj[0]),
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

            console.log('OK new patient');
            
            //check if email exist in data
            if (result==1) {
              alert('המשתמש נוצר בהצלחה'); //not exist
              props.navigation.navigate('Dashboard', { id: idTerapist, name: nameTerapist, back: true });
            }else { //exist
              alert('הכינוי תפוס, נסה כינוי אחר');
            }

          }, error => {
            console.log("err post=", error);
          })
    }
  }

  const headerfunc = () => {
    props.navigation.goBack();
  }

  return (

    <View style={styles.topContainer}>

      <Header
        rightComponent={<View>
          <TouchableOpacity style={{ marginTop: 6, marginLeft: 5 }} onPress={headerfunc}>
            <Icon name='arrow-back-ios' color='black' size={25} />
          </TouchableOpacity>
        </View>}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          justifyContent: 'space-around',
        }}
      />

      <ImageBackground source={require('../images/background1.jpeg')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>מטופל חדש</Text>

        <SafeAreaView style={{ top: 90 }}>
          <TextInput
            style={styles.input}
            onChangeText={newText => setName(newText)}
            placeholder={nameInput.text}
            placeholderTextColor={nameInput.color}
            textAlign='right'
          />

          <TextInput
            style={styles.input}
            onChangeText={newText => setPhone(newText)}
            placeholder={phoneInput.text}
            placeholderTextColor={phoneInput.color}
            textAlign='right'
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
            textAlign='right'
            secureTextEntry={true}
          />

          <TextInput
            style={styles.input}
            onChangeText={newText => setPassword2(newText)}
            placeholder={pass2Input.text}
            placeholderTextColor={pass2Input.color}
            textAlign='right'
            secureTextEntry={true}
            ref={myTextInput}
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
    </View>
  )
}

const styles = StyleSheet.create({

  topContainer: {
    flex: 1,
  },

  genderinput: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: 195,
    marginTop: 15,
    marginBottom:40
  },

  gender: {
    fontSize: 18,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 25,
    color: '#696969'
  },

  image: {
    flex: 1,
    justifyContent: "center"
  },

  title: {
    right:425,
    flexDirection: "row",
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
    top:40
  },

  input: {
    flexDirection: "row",
    height: 65,
    marginHorizontal: 30,
    marginVertical: 20,
    backgroundColor: 'white',
    flexShrink:1,
    flexWrap: 'wrap',
    width:'50%',
    marginHorizontal:'25%',
    top:-30,
    borderBottomWidth: 1,
    fontSize:18
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
    width: '50%',
    top: 120,
    marginHorizontal:'25%'
  },

});