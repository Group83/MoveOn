import { View, Text, StyleSheet, ImageBackground, ScrollView, Switch, LogBox, TouchableOpacity, TextInput } from 'react-native';
import { Button, Icon, Header } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';

export default function AddActivity(props) {

  //SET DATE&TIME
  const time = moment(props.route.params.Date).format("YYYY-MM-DDTHH:mm");
  const sec = parseInt(time.substring(14, 16));
  const newSecStart = (sec < 30 ? '00' : '30');
  const startTime = time.substring(0, 14) + newSecStart;
  const endTime = moment(startTime, "YYYY-MM-DDThh:mm").add(30, 'minutes').format('YYYY-MM-DDThh:mm');
  const idPatient = props.route.params.patient.IdPatient;

  //Select options
  const activityType = ["תרגול", "פנאי", "תפקוד"]

  //Activity List - from DATA and after SEARCH
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

  //Activity variables
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [about, setAbout] = useState('');
  const [idActivity, setIdActivity] = useState(0);
  const [sets, setSets] = useState('');
  const [repit, setRepit] = useState('');
  const [type, setType] = useState('');
  const [isEnabledMoved, setIsEnabledMoved] = useState(0);
  const [isEnabledRequired, setIsEnabledRequired] = useState(0);

  //Activity object from data to list
  const [fillName, setFillName] = useState();
  const [fillLink, setFillLink] = useState();
  const [fillAbout, setFillAbout] = useState();

  //Input variables
  const [nameInput, setNameInput] = useState({ color: '#a9a9a9', text: 'שם הפעילות' });
  const [aboutInput, setAboutInput] = useState({ color: '#a9a9a9', text: 'אודות' });

  //Toggle Switch
  const toggleSwitchMoved = () => {
    setIsEnabledMoved(previousState => !previousState);
  }
  const toggleSwitchRequired = () => {
    setIsEnabledRequired(previousState => !previousState);
  }

  //DATA - url
  //activityes
  const apiUrlAddActivity = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/PatientActivity";
  //events
  const apiUrlEvents = "https://proj.ruppin.ac.il/igroup83/test2/tar6/api/Activity?activityClassification";

  const addToBoard = () => {

    //check empty fields
    if (!name.trim()) { //Check for the Name TextInput
      let newobj = { color: 'red', text: 'נראה שחסרה שם פעילות' };
      setNameInput(newobj)
      return;
    }
    if (!about.trim()) { //Check for the about TextInput
      let newobj = { color: 'red', text: 'נראה שחסר טקסט אודות' };
      setAboutInput(newobj)
      return;
    }
    if (!type.trim()) { //Check for the about TextInput
      alert('נראה שלא בחרת סוג פעילות');
      return;
    }

    //SET promossions
    let moved = (isEnabledMoved ? 1 : 0);
    let required = (isEnabledRequired ? 1 : 0);

    //SET activity object
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

    //PUT activity to DB
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
          let back = obj;
          props.navigation.navigate('Activity Board', { patient: props.route.params.patient, back: back, terapistId: props.route.params.patient.terapistId });
        }, error => {
          console.log("err post=", error);
        })
  }

  //fill inputs with exist activity data
  const fillActivity = (e) => {
    setFillName(e.ActivityName);
    setName(e.ActivityName);
    setFillLink(e.ActivityLink);
    setLink(e.ActivityLink);
    setFillAbout(e.DescriptionActivity);
    setAbout(e.DescriptionActivity);
    setIdActivity(e.IdActivity);
  }

  //render exist selected type activityes
  const changeActivityType = type => {

    setType(type); //selected type

    //GET selected type activityes nfrom DB
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

      <ImageBackground source={require('../images/background2.jpeg')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>פעילות חדשה</Text>
        <View style={styles.container}>

          {/* left container */}
          <View style={styles.leftcontainer}>
            <SelectDropdown
              rowTextStyle={{ fontSize: 20 }}
              data={activityType}
              defaultButtonText={'לחץ לבחירת סוג פעילות'}
              buttonTextStyle={{ fontSize: 22 }}
              buttonStyle={{ height: 50, width: 350, borderColor: "black", borderWidth: 0.5, borderRadius: 5, marginHorizontal: 20, marginTop: 20, backgroundColor: 'rgba(211, 222, 50, 0.8)' }}
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
              textAlign='right'
            />
            <TextInput
              defaultValue={fillLink}
              style={styles.inputLink}
              onChangeText={newText => setLink(newText)}
              placeholder="כתובת סרטון"
              placeholderTextColor="#a9a9a9"
              textAlign='right'
              multiline={true}
            />
            <TextInput
              defaultValue={fillAbout}
              style={styles.inputDisc}
              onChangeText={newText => setAbout(newText)}
              placeholder={aboutInput.text}
              placeholderTextColor={aboutInput.color}
              textAlign='right'
              multiline={true}
            />
            <TextInput
              style={styles.input}
              onChangeText={newText => setSets(newText)}
              placeholder="מספר סטים"
              placeholderTextColor="#a9a9a9"
              textAlign='right'
            />
            <TextInput
              style={styles.input}
              onChangeText={newText => setRepit(newText)}
              placeholder="מספר חזרות"
              placeholderTextColor="#a9a9a9"
              textAlign='right'
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
              <View style={styles.searchSection}>
                <Icon style={styles.searchIcon} name="search" size={27} color="#000" />
                <TextInput
                  style={styles.searchinput}
                  onChangeText={onChangeSearch}
                  placeholder="חיפוש"
                  textAlign='right'
                />
              </View>
              <View style={styles.scrollView}>
                <ScrollView>
                  {activityes.map((item, key) => {
                    return (
                      <TouchableOpacity id={key} onPress={() => fillActivity(item)}>
                        <Text id={key} style={styles.activity}>{item.ActivityName}</Text>
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
          onPress={() => setback(back?0:1), addToBoard}
        />
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({

  searchSection: {
    flexDirection: 'row',
  },

  searchIcon: {
    marginTop: 40
  },

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
    marginTop: 55,
    marginLeft: 15,
  },

  searchinput: {
    flexDirection: "row",
    height: 50,
    marginHorizontal: 8,
    backgroundColor: 'white',
    marginTop: 25,
    flexShrink: 1,
    flexWrap: 'wrap',
    width: '90%',
    borderBottomWidth: 1,
    fontSize:18
  },

  activity: {
    marginTop: 5,
    padding: 30,
    backgroundColor: 'rgba(211, 222, 50, 0.3)',
    display: 'flex',
    borderWidth: 0.3,
    borderRadius: 10,
    borderColor: 'black',
    textAlign: 'left',
    fontSize: 18
  },

  Searchbar: {
    top: 20,
    marginHorizontal: 8,
  },

  inputDisc: {
    flexDirection: "row",
    height: 180,
    width: 350,
    top: 10,
    marginTop: 20,
    left: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    marginHorizontal: 8,
    fontSize:18
  },

  input: {
    flexDirection: "row",
    height: 60,
    width: 350,
    top: 10,
    marginTop: 10,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 8,
    borderBottomWidth: 1,
    fontSize:18
  },

  inputLink: {
    flexDirection: "row",
    height: 90,
    width: 350,
    top: 10,
    marginTop: 10,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 8,
    borderBottomWidth: 1,
    fontSize:18
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderRadius: 5,
    height: 750,
    width: '47%',
    marginLeft: 20,
    top: 40
  },

  rightcontainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderRadius: 5,
    height: 750,
    width: '45%',
    marginLeft: 20,
    top: 40
  },

  scrollView: {
    backgroundColor: 'white',
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