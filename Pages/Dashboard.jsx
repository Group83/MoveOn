import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import ProgressCircle from 'react-native-progress-circle-rtl';
import { TextInput } from 'react-native-paper';

export default function Dashboard(props) {

  //Terapist id
  const idTerapist = props.route.params.id;

  //Back
  const back = props.route.params.back;

  //Patients list from DATA
  const [DataPatients, setDataPatients] = useState([]);
  const [patients, setPatients] = useState([]);

  //DATA - url
  const apiUrlPatients = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Patient?id";

  //EVERY RENDER
  useEffect(() => {

    //get all terapist patients from DB
    fetch(apiUrlPatients + "=" + idTerapist, {
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
          var obj = result.map(patient => patient);
          setPatients(obj);
          setDataPatients(obj);
        },
        (error) => {
          console.log("err post=", error);
        });

  }, [back]);

  //Overlay
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //Search Bar
  const onChangeSearch = query => {
    console.log(query);
    if (query) {
      var filterData = DataPatients.filter(item => item.IdPatient.toString().includes(query));
      console.log(filterData);
      setPatients(filterData);
    }
    else {
      setPatients(DataPatients);
    }
  }

  return (

    <ImageBackground
      source={require('../images/background1.png')}
      resizeMode="cover" style={styles.image}
    >

      <View style={styles.titleContainer}>
        <Text style={styles.title}>שלום {props.route.params.name},</Text>
      </View>

      <View style={styles.centerContainer}>
        <View>
          <TouchableOpacity style={styles.touchOp} onPress={() => {
            props.navigation.navigate('Add Patient', { idTerapist: idTerapist, nameTerapist: props.route.params.name, back:false });
          }}>
            <Icon name='add' />
            <Text style={{ marginRight: 20, marginLeft: 20, fontSize: 17 }}>הוסף מטופל חדש</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Searchbar}>
          <TextInput
            left={<TextInput.Icon name="magnify" color="grey" size={20} />}
            style={styles.searchinput}
            onChangeText={onChangeSearch}
            placeholder="מספר מטופל"
            placeholderTextColor="#a9a9a9"
            activeUnderlineColor="orange"
          />
        </View>
      </View>

      <View style={styles.dashboardContainer}>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text style={{ fontSize: 14, marginTop: 18, marginHorizontal: 5 }}>מספר</Text>
            {patients.length > 0 && patients.map((item) => {
              return (
                <View style={styles.row}>
                  <Text
                    style={{ fontSize: 12, marginLeft: 5, marginTop: 15 }}>
                    #{item?.IdPatient}
                  </Text>
                </View>
              )
            })}
          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text style={{ fontSize: 14, marginTop: 18, marginHorizontal: 2 }}>כינוי</Text>
            {patients.length > 0 && patients.map((item) => {
              return (
                <View style={styles.row}>
                  <Text style={{ fontSize: 12, marginLeft: 2, marginTop: 15 }}>{item?.NicknamePatient}</Text>
                </View>
              )
            })}
          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text
              style={{ fontSize: 14, marginTop: 16, marginHorizontal: 2 }}>רמת ביצוע</Text>
            {patients.length > 0 && patients.map((item) => {

              return (
                <View style={styles.circlerow}>
                  <ProgressCircle
                    percent={item?.ComplishionPresentae * 100}
                    radius={10}
                    borderWidth={4}
                    color={item.ComplishionPresentae < 0.5 ? 'red' : 'lawngreen'}
                    shadowColor="lightgrey"
                    bgColor="#fff"
                  >
                  </ProgressCircle>
                  <Text style={{ fontSize: 12, marginLeft: 5 }}>{item?.ComplishionPresentae * 100}%</Text>
                </View>
              )
            })}

          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle}>
            <Text style={{ fontSize: 14, marginTop: 16, marginHorizontal: 2 }}>מצב רוח</Text>
            {patients.length > 0 && patients.map((item) => {
              return (
                <View style={styles.row}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 11, marginLeft: 8 }}>
                    <Icon name={item.Mood == 'SAD' ? 'sentiment-very-dissatisfied' : 'sentiment-satisfied-alt'} size={20} />
                    <Icon name={item.RelativeMood == 'DOUN' ? 'south' : 'north'} size={20} color={item.RelativeMood == 'DOUN' ? 'red' : '#7fff00'} />
                  </View>
                </View>
              )
            })}
          </View>

        </View>

        <View style={styles.col}>
          <View style={styles.coltitle} />
          {patients.length > 0 && patients.map((item) => {
            return (
              <View style={styles.row}>
                <TouchableOpacity style={{ marginTop: 6, marginRight: 20 }} onPress={toggleOverlay}>
                  <Icon name='warning' color='gold' size={22} />
                </TouchableOpacity>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                  <Icon name='warning' color='gold' />
                  <Text style={styles.textSecondary}>
                    סומנו מספר פעילויות ברצף !
                  </Text>
                </Overlay>
              </View>
            )
          })}
        </View>

        <View style={styles.col}>
          <View style={styles.coltitle} />
          {patients.length > 0 && patients.map((item) => {
            return (
              <View style={styles.row}>
                <TouchableOpacity style={styles.show} onPress={() => {
                  props.navigation.navigate('Patient Page', {patient:item});
                }}>
                  <Text style={{ fontSize: 12, marginLeft: 20 }}>הצג</Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>

      </View>

    </ImageBackground >
  )
}

const styles = StyleSheet.create({

  searchinput: {
    flexDirection: "row",
    height: 50,
    backgroundColor: '#EFEFEF',
    marginLeft: 10,
    width: 200,
  },

  circlerow: {
    width: 60,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12
  },

  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },

  row: {
    width: 60,
    height: 30,
  },

  show: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    height: 20,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
  },

  coltitle: {
    backgroundColor: '#F5F5F5',
    height: 35,
    borderBottomWidth: 1,
  },

  col: {
    display: 'flex',
    backgroundColor: 'white',
    height: 600,
    width: 70,
  },

  dashboardContainer: {
    display: 'flex',
    backgroundColor: '#EFEFEF',
    height: 600,
    width: 420,
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  title2Container: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 50,
    width: 420,
    marginHorizontal: 2,
  },

  centerContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 70,
    width: 420,
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },

  titleContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 50,
    width: 420,
    marginHorizontal: 2,
    marginTop: 20
  },

  title: {
    left: 20,
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  touchOp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    height: 50,
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
  },

});