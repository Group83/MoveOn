import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import ProgressCircle from 'react-native-progress-circle-rtl';
import { TextInput } from 'react-native-paper';
import Overlay from 'react-native-modal-overlay';

export default function Dashboard(props) {

  //Terapist id fron log in page
  const idTerapist = props.route.params.id;

  //Back (to refresh page after add new patient)
  const back = props.route.params.back;

  //Patients lists - from DATA and after SEARCH
  const [DataPatients, setDataPatients] = useState([]);
  const [patients, setPatients] = useState([]);

  //DATA - url
  const apiUrlPatients = "https://proj.ruppin.ac.il//igroup83/test2/tar6/api/Patient?id";

  //EVERY RENDER
  useEffect(() => {

    //GET all patients from DB
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

    if (query) {
      var filterData = DataPatients.filter(item => item.IdPatient.toString().includes(query));
      setPatients(filterData); //set to view only filter patients
    }
    else {
      setPatients(DataPatients); //return all the patients
    }
  }

  const headerfunc = () => {
    props.navigation.goBack();
  }

  return (
    <View style={styles.topContainer}>

      <Header
        rightComponent={<View>
          <TouchableOpacity style={{ marginTop: '10%', marginRight: 20 }} onPress={headerfunc}>
            <Icon name='arrow-back-ios' color='black' size={25} />
          </TouchableOpacity>
        </View>}
        centerComponent={<View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Text style={{ fontSize: 23, marginRight: 10, marginTop: 14 }}>{props.route.params.name}</Text>
          <Icon name='account-circle' color='black' size={38} style={{ marginTop: 10 }} />
        </View>}
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          justifyContent: 'space-around',
        }}
      />

      <ImageBackground
        source={require('../images/background4.jpeg')}
        resizeMode="cover" style={styles.image}
      >

        <View style={styles.centerContainer}>
          <View>
            <TextInput
              left={<TextInput.Icon name="magnify" color="grey" size={25} />}
              style={styles.searchinput}
              onChangeText={onChangeSearch}
              placeholder="מספר מטופל"
              placeholderTextColor="#a9a9a9"
              activeUnderlineColor="orange"
            />
          </View>
          <View>
            <TouchableOpacity style={styles.touchOp} onPress={() => {
              props.navigation.navigate('Add Patient', { idTerapist: idTerapist, name: props.route.params.name, back: false });
            }}>
              <Icon name='add' style={{ marginLeft: 20 }} />
              <Text style={{ marginLeft: 50, fontSize: 19 }}>הוסף מטופל חדש</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dashboardContainer}>

          <View style={styles.col}>
            <View style={styles.coltitle}>
              <Text style={{ fontSize: 18, marginTop: 18, marginHorizontal: 40 }}>מספר</Text>
              {patients.length > 0 && patients.map((item, key) => {
                return (
                  <View style={styles.row} key={key}>
                    <Text
                      style={{ fontSize: 15, marginTop: 8, marginHorizontal: 20 }}>
                      #{item?.IdPatient}
                    </Text>
                  </View>
                )
              })}
            </View>

          </View>

          <View style={styles.col}>
            <View style={styles.coltitle}>
              <Text style={{ fontSize: 18, marginTop: 18, marginHorizontal: 50 }}>כינוי</Text>
              {patients.length > 0 && patients.map((item, key) => {
                return (
                  <View style={styles.row} key={key}>
                    <Text tyle={{ fontSize: 15, marginHorizontal: 18, marginTop: 5 }}>{item?.NicknamePatient}</Text>
                  </View>
                )
              })}
            </View>

          </View>

          <View style={styles.col}>
            <View style={styles.coltitle}>
              <Text
                style={{ fontSize: 18, marginTop: 14, marginHorizontal: 25 }}>רמת ביצוע</Text>
              {patients.length > 0 && patients.map((item, key) => {

                return (
                  <View style={styles.circlerow} key={key}>
                    <ProgressCircle
                      percent={item ? Math.round(item.ComplishionPresentae * 100) : 0}
                      radius={12}
                      borderWidth={4}
                      color={item.ComplishionPresentae < 0.5 ? 'red' : 'lawngreen'}
                      shadowColor="lightgrey"
                      bgColor="#fff"
                    />
                    <Text style={{ fontSize: 15, marginLeft: 10, transform: [{ rotate: '180deg' }] }}>{item?.ComplishionPresentae * 100}%</Text>
                  </View>
                )
              })}

            </View>

          </View>

          <View style={styles.col}>
            <View style={styles.coltitle}>
              <Text style={{ fontSize: 18, marginTop: 14, marginHorizontal: 25 }}>מצב רוח</Text>
              {patients.length > 0 && patients.map((item, key) => {
                return (
                  <View style={styles.rowmood} key={key}>
                    <View key={key} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginLeft: 35 }}>
                      <Icon name={item.RelativeMood == 'DOUN' ? 'south' : 'north'} size={23} color={item.RelativeMood == 'DOUN' ? 'red' : '#7fff00'} />
                      <Icon name={item.Mood == 'SAD' ? 'sentiment-very-dissatisfied' : 'sentiment-satisfied-alt'} size={20} />
                    </View>
                  </View>
                )
              })}
            </View>

          </View>

          <View style={styles.col}>
            <View style={styles.coltitle} />
            {patients.length > 0 && patients.map((item, key) => {
              return (
                <View style={styles.rowmood} key={key}>
                  <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={toggleOverlay}>
                    <Icon name='warning' color='gold' size={25} />
                  </TouchableOpacity>
                  <Overlay visible={visible}
                    onClose={()=>{setVisible(false)}}
                    closeOnTouchOutside
                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center' }}
                    childrenWrapperStyle={{ backgroundColor: 'white', borderWidth: 1, borderColor: 'white', borderRadius: 15, alignItems: 'center', width: '50%' }}
                    onBackdropPress={toggleOverlay}>
                    <Icon name='warning' color='gold' size={30}/>
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
            {patients.length > 0 && patients.map((item, key) => {
              return (
                <View style={styles.row} key={key}>
                  <TouchableOpacity style={styles.show} onPress={() => {
                    props.navigation.navigate('Patient Page', { patient: item, terapistId: idTerapist, name: props.route.params.name });
                  }}>
                    <Text style={{ fontSize: 15, marginLeft: '35%' }}>הצג</Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>

        </View>

      </ImageBackground >
    </View >
  )
}

const styles = StyleSheet.create({

  topContainer: {
    flex: 1,
  },

  searchinput: {
    flexDirection: "row",
    height: 50,
    backgroundColor: '#EFEFEF',
    marginLeft: 25,
    width: 300,
    fontSize: 18,
  },

  circlerow: {
    width: 60,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: 7.5,
    marginHorizontal: 35,
    transform: [{ rotate: '180deg' }]
  },

  textSecondary: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 20,
    marginVertical: '5%'
  },

  row: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '65%',
    height: 30,
    marginLeft: 20,
    marginTop: 8
  },

  rowmood: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '65%',
    height: 30,
    marginLeft: 20,
    marginTop: 7
  },

  show: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    height: 22,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
  },

  coltitle: {
    backgroundColor: '#F5F5F5',
    height: 40,
    borderBottomWidth: 1,
  },

  col: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 630,
    width: '30%',
  },

  dashboardContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 600,
    width: 435,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%'
  },

  centerContainer: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 70,
    width: '95%',
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EFEFEF',
    marginLeft: 120,
  },

});