import { View, Text, StyleSheet, ImageBackground, ScrollView, Switch, LogBox } from 'react-native';
import { Button } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import { isVisible } from 'dom-helpers';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function AddActivity(props) {

  console.log(props.route.params.Date);
  console.log(props.route.params.StartHour);

  //select options
  const activityType = ["תרגול", "פנאי", "תפקוד"]

  //Data Activity List
  const [DataActivities, SetDataActivities] = useState([
    { name: 'ריצה', key: '1' },
    { name: 'עיסוי צלקת', key: '2' },
    { name: 'תרגול ידיים', key: '3' },
    { name: 'נעילת נעליים', key: '4' },
    { name: 'סודוקו', key: '5' },
    { name: 'הליכה', key: '6' },
    { name: 'שחייה', key: '7' },
  ]);

  //Activity List
  const [Activities, SetActivities] = useState([
    { name: 'ריצה', key: '1' },
    { name: 'עיסוי צלקת', key: '2' },
    { name: 'תרגול ידיים', key: '3' },
    { name: 'נעילת נעליים', key: '4' },
    { name: 'סודוקו', key: '5' },
    { name: 'הליכה', key: '6' },
    { name: 'שחייה', key: '7' },
  ]);

  //Activity
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [about, setAbout] = useState('');
  const [sets, setSets] = useState('');
  const [repit, setRepit] = useState('');
  const [type, setType] = useState('');
  const [isEnabledMoved, setIsEnabledMoved] = useState(false);
  const [isEnabledRequired, setIsEnabledRequired] = useState(false);
  console.log(isEnabledMoved);
  console.log(isEnabledRequired);

  //input
  const [nameInput, setNameInput] = useState({ color: '#a9a9a9', text: 'שם הפעילות' });
  const [aboutInput, setAboutInput] = useState({ color: '#a9a9a9', text: 'אודות' });

  //Search Bar
  const onChangeSearch = query => {
    console.log(query);
    if (query) {
      var filterData = DataActivities.filter(item => item.name.includes(query));
      console.log(filterData);
      SetActivities(filterData);
    }
    else {
      SetActivities(DataActivities);
    }
  }

  //toggleSwitch
  const toggleSwitchMoved = () => {
    setIsEnabledMoved(previousState => !previousState);
  }
  const toggleSwitchRequired = () => {
    setIsEnabledRequired(previousState => !previousState);
  }

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
  }

  // //EVERY RENDER
  // useEffect(() => {



  // }, [[DataActivities]]);

  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>פעילות חדשה</Text>
      <View style={styles.container}>

        {/* left container */}
        <View style={styles.leftcontainer}>
          <SelectDropdown
            rowTextStyle={{ fontSize: 16 }}
            data={activityType}
            defaultButtonText={'לחץ לבחירת סוג פעילות'}
            buttonStyle={{ height: 40, width: 200, borderColor: "#FFBD73", borderWidth: 0.5, borderRadius: 5, marginHorizontal: 3, marginTop: 15, backgroundColor: 'rgba(255, 189, 115, 0.27)' }}
            onSelect={(selectedItem, index) => {
              setType(selectedItem);
              console.log(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
          <TextInput
            style={styles.input}
            placeholder={nameInput.text}
            onChangeText={newText => setName(newText)}
            placeholderTextColor={nameInput.color}
            activeUnderlineColor="orange"
          />
          <TextInput
            style={styles.input}
            onChangeText={newText => setLink(newText)}
            placeholder="כתובת סרטון"
            placeholderTextColor="#a9a9a9"
            activeUnderlineColor="orange"
          />
          <TextInput
            style={styles.inputDisc}
            onChangeText={newText => setAbout(newText)}
            placeholder={aboutInput.text}
            placeholderTextColor={aboutInput.color}
            activeUnderlineColor="orange"
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
                {Activities.map((item) => {
                  return (
                    <View>
                      <Text style={styles.activity}>{item.name}</Text>
                    </View>
                  )
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <Button
        title="אישור"
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        containerStyle={styles.containerStyle}
        onPress={addActivity}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  toggleinput: {
    marginRight: 15,
    marginTop: 5,
    fontSize: 15
  },

  toggleRequired: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 15
  },

  toggleMoved: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15
  },

  searchinput: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: 0,
    marginVertical: 0,
    backgroundColor: 'white',
    marginTop: 25
  },

  activity: {
    marginTop: 3,
    padding: 30,
    backgroundColor: 'rgba(255, 189, 115, 0.27)',
    display: 'flex',
    borderWidth: 1,
    borderColor: '#FFBD73',
  },

  Searchbar: {
    top: 10,
    margin: 3,
  },

  inputDisc: {
    flexDirection: "row",
    height: 170,
    width: 190,
    top: 10,
    marginTop: 10,
    left: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    textAlign: 'center'
  },

  input: {
    flexDirection: "row",
    height: 40,
    width: 190,
    top: 10,
    marginTop: 5,
    left: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
  },

  text: {
    fontSize: 18,
    left: 10,
    top: 20,
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
    height: 550,
    width: 210,
    marginHorizontal: 2,
    top: 40
  },

  rightcontainer: {
    display: 'flex',
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 5,
    height: 550,
    width: 210,
    marginHorizontal: 2,
    top: 40
  },

  scrollView: {
    backgroundColor: '#EFEFEF',
    height: 425,
    width: 200,
    marginHorizontal: 1,
    top: 10,
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
    left: 70,
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
    fontSize: 20,
    color: 'black'
  },

  containerStyle: {
    marginHorizontal: 25,
    width: 380,
    top: 60,
  },

});