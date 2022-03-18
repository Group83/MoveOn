import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import ToggleSwitch from 'toggle-switch-react-native';

export default function AddActivity({ navigation }) {

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

  //Search Bar
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <ImageBackground source={require('../images/background1.png')} resizeMode="cover" style={styles.image}>
      <Text style={styles.title}>פעילות חדשה</Text>
      <View style={styles.container}>

        {/* left container */}
        <View style={styles.leftcontainer}>
          <Text style={styles.text}>הוסף פעילות חדשה</Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={text}
            placeholder="שם הפעילות"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={text}
            placeholder="כתובת סרטון"
            keyboardType="default"
          />
          <TextInput
            style={styles.inputDisc}
            // onChangeText={onChangeNumber}
            // value={text}
            placeholder="אודות"
            keyboardType="default"
            multiline={true}
          />
          <ToggleSwitch
            onColor="black"
            offColor="gray"
            label="פעילות ניתנת להזזה"
            labelStyle={{ color: "black", fontWeight: "400" }}
            size="small"
            onToggle={isOn => console.log("changed to : ", isOn)}
            style={{ top: 40, marginTop: 30, flexDirection: 'row' }}
          />
          <ToggleSwitch
            onColor="black"
            offColor="gray"
            label="פעילות חובה"
            labelStyle={{ color: "black", fontWeight: "400" }}
            size="small"
            onToggle={isOn => console.log("changed to : ", isOn)}
            style={{ top: 40, marginTop: 30, flexDirection: 'row' }}
          />
        </View>

        {/* right container */}
        <View style={styles.rightcontainer}>
          <Text style={styles.text}>רשימת פעילויות</Text>
          <View style={styles.Searchbar}>
            <Searchbar
              placeholder=""
              onChangeText={onChangeSearch}
              value={searchQuery}
              fontSize={15}
            />
            <View style={styles.scrollView}>
              <ScrollView>
              {Activities.map((item) => { 
                return(
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
        onPress={() => navigation.navigate('Activity Board')}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  activity:{
    marginTop:3,
    padding:30,
    backgroundColor:'rgba(139, 92, 246, 0.1)',
    display:'flex',
    borderWidth:1,
    borderColor:'#8B5CF6',
  },

  Searchbar: {
    top: 40,
    margin: 3,
  },

  inputDisc: {
    flexDirection: "row",
    height: 200,
    width: 190,
    top: 40,
    marginTop: 20,
    left: 10,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    textAlignVertical: 'top',
  },

  input: {
    flexDirection: "row",
    height: 40,
    width: 190,
    top: 40,
    marginTop: 20,
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
    top: 50
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
    top: 50
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
    top: 80,
  },

});