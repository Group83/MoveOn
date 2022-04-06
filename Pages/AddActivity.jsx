import { View, Text, StyleSheet, ImageBackground, ScrollView, Switch, LogBox, TouchableOpacity } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AddActivity(props) {

  const [back, setBack] = useState(true);

  //set date and time
  const time = moment(props.route.params.Date).format("YYYY-MM-DDTHH:mm");
  // console.log('---------------------------------')
  // console.log('time = ', time);
  const sec = parseInt(time.substring(14, 16));
  // console.log('sec = ', sec);
  const newSecStart = (sec < 30 ? '00' : '30');
  // console.log('newSecStart = ', newSecStart);
  const startTime = time.substring(0, 14) + newSecStart;
  // console.log('startTime = ', startTime);
  const endTime = moment(startTime, "YYYY-MM-DDThh:mm").add(30, 'minutes').format('YYYY-MM-DDThh:mm');
  const idPatient = props.route.params.patient.IdPatient;

  //select options
  const activityType = ["תרגול", "פנאי", "תפקוד"]

  //Data Activity List
  const [DataActivities, SetDataActivities] = useState([]);
  const [activityes, setActivityes] = useState([]);

  //Search Bar
  const onChangeSearch = query => {

    if (query) {
      var filterData = DataActivities.filter(item => item.ActivityName.includes(query));
      setActivityes(filterData);
    }
    else {
      setActivityes(DataActivities);
    }
  }

  //Activity
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [about, setAbout] = useState('');
  const [idActivity, setIdActivity] = useState(0);
  const [sets, setSets] = useState('');
  const [repit, setRepit] = useState('');
  const [type, setType] = useState('');
  const [isEnabledMoved, setIsEnabledMoved] = useState(0);
  const [isEnabledRequired, setIsEnabledRequired] = useState(0);

  //exist Activity
  const [fillName, setFillName] = useState();
  const [fillLink, setFillLink] = useState();
  const [fillAbout, setFillAbout] = useState();

  //input
  const [nameInput, setNameInput] = useState({ color: '#a9a9a9', text: 'שם הפעילות' });
  const [aboutInput, setAboutInput] = useState({ color: '#a9a9a9', text: 'אודות' });

  //toggleSwitch
  const toggleSwitchMoved = () => {
    setIsEnabledMoved(previousState => !previousState);
  }
  const toggleSwitchRequired = () => {
    setIsEnabledRequired(previousState => !previousState);
  }

  const apiUrlAddActivity = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/PatientActivity";

  const addActivity = () => {
    //check empty fields
    //Check for the Name TextInput
    if (!name.trim()) {
      let newobj = { color: 'red', text: 'נראה שחסרה שם פעילות' };
      setNameInput(newobj)
      return;
    }
    //Check for the about TextInput
    if (!about.trim()) {
      let newobj = { color: 'red', text: 'נראה שחסר טקסט אודות' };
      setAboutInput(newobj)
      return;
    }
    //Check for the about TextInput
    if (!type.trim()) {
      alert('נראה שלא בחרת סוג פעילות');
      return;
    }

    let moved = (isEnabledMoved ? 1 : 0);
    let required = (isEnabledRequired ? 1 : 0);

    //set patient object
    let obj = [{
      StartPatientActivity: startTime,
      EndPatientActivity: endTime,
      RepetitionPatientActivity: repit,
      SetsPatientActivity: sets,
      IsMoveablePatientActivity: moved,
      IsMandatoryPatientActivity: required,
      IdPatient: idPatient,
      IdActivity: idActivity,
      StatusPatientActivity: 1,
      ActivityLink: link,
      ActivityName: name,
      ActivityClassification: type,
      DescriptionActivity: about
    }];

    //send activity to DB
    fetch(apiUrlAddActivity, {
      method: 'PUT',
      body: JSON.stringify(obj[0]),
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    })
      .then(res => {
        return res;
      })
      .then(
        (result) => {
          setBack(previousState => !previousState);
          props.navigation.navigate('Activity Board', { patient: props.route.params.patient, back: back, terapistId:props.route.params.patient.terapistId });
        }, error => {
          console.log("err post=", error);
        })
  }

  //fill exists activity
  const fillActivity = (e) => {
    setFillName(e.ActivityName);
    setName(e.ActivityName);
    setFillLink(e.ActivityLink);
    setLink(e.ActivityLink);
    setFillAbout(e.DescriptionActivity);
    setAbout(e.DescriptionActivity);
    setIdActivity(e.IdActivity);
  }

  const apiUrlEvents = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/Activity?activityClassification";

  //render exist activityes
  const changeActivityType = type => {

    setType(type);

    //get type activity
    fetch(apiUrlEvents + "=" + type, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json ; charset=UTP-8',
        'Accept': 'application/json ; charset=UTP-8'
      })
    }).then(
      (response) => response.json()
    ).then((res) => {
      console.log('OK Activityes');
      if (res) {
        var obj = res.map(activity => activity);
        SetDataActivities(obj);
        setActivityes(obj);
      } else {
        console.log('Activityes in empty');
      }
      return res;
    }).catch((error) => {
      console.log("err GET Activityes=", error);
    }).done();

  }

  const headerfunc = () => {
    props.navigation.goBack();
    //props.navigation.navigate('Activity Board', { patient: props.route.params.patient, back: false, terapistId:props.route.params.patient.IdTherapist});
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

      <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>פעילות חדשה</Text>
        <View style={styles.container}>

          {/* left container */}
          <View style={styles.leftcontainer}>
            <SelectDropdown
              rowTextStyle={{ fontSize: 20 }}
              data={activityType}
              defaultButtonText={'לחץ לבחירת סוג פעילות'}
              buttonTextStyle={{ fontSize: 22 }}
              buttonStyle={{ height: 50, width: 350, borderColor: "#FFBD73", borderWidth: 0.5, borderRadius: 5, marginHorizontal: 20, marginTop: 20, backgroundColor: 'rgba(255, 189, 115, 0.27)' }}
              onSelect={changeActivityType}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
            <TextInput
              defaultValue={fillName}
              style={styles.input}
              placeholder={nameInput.text}
              onChangeText={newText => setName(newText)}
              placeholderTextColor={nameInput.color}
              activeUnderlineColor="orange"
            />
            <TextInput
              defaultValue={fillLink}
              style={styles.input}
              onChangeText={newText => setLink(newText)}
              placeholder="כתובת סרטון"
              placeholderTextColor="#a9a9a9"
              activeUnderlineColor="orange"
            />
            <TextInput
              defaultValue={fillAbout}
              style={styles.inputDisc}
              onChangeText={newText => setAbout(newText)}
              placeholder={aboutInput.text}
              placeholderTextColor={aboutInput.color}
              activeUnderlineColor="orange"
              multiline={true}
            />
            <TextInput
              style={styles.input}
              onChangeText={newText => setSets(newText)}
              placeholder="מספר סטים"
              placeholderTextColor="#a9a9a9"
              activeUnderlineColor="orange"
              keyboardType="name-phone-pad"
            />
            <TextInput
              style={styles.input}
              onChangeText={newText => setRepit(newText)}
              placeholder="מספר חזרות"
              placeholderTextColor="#a9a9a9"
              activeUnderlineColor="orange"
              keyboardType="name-phone-pad"
            />
            <View style={styles.toggleMoved}>
              <Text style={styles.toggleinput}>פעילות ניתנת להזזה</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#dcdcdc" }}
                thumbColor={isEnabledMoved ? "#D3DE32" : "#f4f3f4"}
                ios_backgroundColor="#a9a9a9"
                onValueChange={toggleSwitchMoved}
                value={isEnabledMoved}
              />
            </View>
            <View style={styles.toggleRequired}>
              <Text style={styles.toggleinput}>פעילות חובה</Text>
              <Switch
                trackColor={{ false: "#a9a9a9", true: "#dcdcdc" }}
                thumbColor={isEnabledRequired ? "#D3DE32" : "#f4f3f4"}
                ios_backgroundColor="#a9a9a9"
                onValueChange={toggleSwitchRequired}
                value={isEnabledRequired}
              />
            </View>
          </View>

          {/* right container */}
          <View style={styles.rightcontainer}>
            <Text style={styles.text}>רשימת פעילויות</Text>
            <View style={styles.Searchbar}>
              <TextInput
                left={<TextInput.Icon name="magnify" color="grey" size={20} />}
                style={styles.searchinput}
                onChangeText={onChangeSearch}
                placeholder="חיפוש"
                placeholderTextColor="#a9a9a9"
                activeUnderlineColor="orange"
              />
              <View style={styles.scrollView}>
                <ScrollView>
                  {activityes.map((item, key) => {
                    return (
                      <TouchableOpacity onPress={() => fillActivity(item)}>
                        <Text style={styles.activity}>{item.ActivityName}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
        <Button
          title="שמור"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          containerStyle={styles.containerStyle}
          onPress={addActivity}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  topContainer: {
    flex: 1,
  },

  toggleinput: {
    marginHorizontal: 15,
    marginTop: 5,
    fontSize: 18
  },

  toggleRequired: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15
  },

  toggleMoved: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15
  },

  searchinput: {
    flexDirection: "row",
    height: 50,
    marginHorizontal: 8,
    marginVertical: 0,
    backgroundColor: 'white',
    marginTop: 25
  },

  activity: {
    marginTop: 5,
    padding: 30,
    backgroundColor: 'rgba(255, 189, 115, 0.27)',
    display: 'flex',
    borderWidth: 1,
    borderColor: '#FFBD73',
    textAlign: 'left',
    fontSize: 18
  },

  Searchbar: {
    top: 20,
    marginHorizontal: 8,
  },

  inputDisc: {
    flexDirection: "row",
    height: 210,
    width: 350,
    top: 10,
    marginTop: 10,
    left: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    textAlign: 'center',
    marginHorizontal: 8
  },

  input: {
    flexDirection: "row",
    height: 60,
    width: 350,
    top: 10,
    marginTop: 10,
    left: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    marginHorizontal: 8
  },

  text: {
    fontSize: 22,
    top: 20,
    textAlign: 'left',
    marginHorizontal: 20
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
  },

  leftcontainer: {
    display: 'flex',
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
    height: 750,
    width: '47%',
    marginLeft: 20,
    top: 40
  },

  rightcontainer: {
    display: 'flex',
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
    height: 750,
    width: '45%',
    marginLeft: 20,
    top: 40
  },

  scrollView: {
    backgroundColor: '#EFEFEF',
    height: 600,
    width: 330,
    marginHorizontal: 10,
    top: 15,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    top: -10,
    right: '35%',
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
  },

  buttonStyle: {
    backgroundColor: '#D3DE32',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 56, height: 13 },
    shadowRadius: 5,
    shadowOffset: { width: 0.1, height: 0.1 },
  },

  titleStyle: {
    fontSize: 22,
    color: 'black'
  },

  containerStyle: {
    marginHorizontal: 20,
    width: '95%',
    top: 70,
  },

});