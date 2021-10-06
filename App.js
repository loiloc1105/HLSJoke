import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const App = () => {
  const [data, setData] = useState([]);
  const [num, setNum] = useState(0);

  const multiSet = async () => {
    const firstPair = [
      'Joke 1',
      `
      A child asked his father, "How were people born?" So his father said, "Adam and Eve made babies, then their babies became adults and made babies, and so on."
      The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now."
      The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."`,
    ];
    const secondPair = [
      'Joke 2',
      `
    Teacher: "Kids,what does the chicken give you?" 
    Student: "Meat!" 
    Teacher: "Very good! Now what does the pig give you?" 
    Student: "Bacon!" 
    Teacher: "Great! And what does the fat cow give you?" 
    Student: "Homework!"`,
    ];
    const thirdPair = [
      'Joke 3',
      `
      The teacher asked Jimmy, "Why is your cat at school today Jimmy?" 
      Jimmy replied crying, "Because I heard my daddy tell my mommy, 'I am going to eat that pussy once Jimmy leaves for school today!'"`,
    ];
    const fourPair = [
      'Joke 4',
      `
      A housewife, an accountant and a lawyer were asked "How much is 2+2?" 
      The housewife replies: "Four!". 
      The accountant says: "I think it's either 3 or 4. Let me run those figures through my spreadsheet one more time." 
      The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"`,
    ];
    const fivePair = [
      'Thanks you',
      `
      "That's all the jokes for today! Come back another day!"`,
    ];
    try {
      await AsyncStorage.multiSet([
        firstPair,
        secondPair,
        thirdPair,
        fourPair,
        fivePair,
      ]);
    } catch (e) {
      //save error
    }

    console.log('Done set all joke.');
  };

  const multiGet = async () => {
    try {
      let value = await AsyncStorage.multiGet([
        'Joke 1',
        'Joke 2',
        'Joke 3',
        'Joke 4',
        'Thanks you',
      ]);
      // console.log(JSON.parse(value));
      if (value !== null) {
        setData(value);
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const setStringValue = async value => {
    try {
      await AsyncStorage.setItem('key', value);
    } catch (e) {
      // save error
    }

    console.log('Done set Number voted.');
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        // We have data!!
        let valueNum = parseInt(value);
        setNum(valueNum + 1);
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const nextJoke = number => {
    setStringValue(number + '');
    setNum(number + 1);
    // console.log(num);
  };

  useEffect(() => {
    retrieveData();
    multiSet();
    multiGet();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.titleLeft}>
          <Image style={styles.imageLeft} source={require('./img/logo.png')} />
        </View>
        <View style={styles.titleRight}>
          <View style={styles.titleRightTxt}>
            <Text>Handicraft by</Text>
            <Text style={styles.txtTitleRightTxt}>Jim HLS</Text>
          </View>
          <View style={styles.titleRightImg}>
            <Image
              style={styles.imageRight}
              source={require('./img/avatar.png')}
            />
          </View>
        </View>
      </View>
      <View style={styles.background}>
        <Text style={styles.titleBG}>A joke a day keeps the doctor away</Text>
        <Text style={styles.titleBGContent}>
          If you joke wrong away, your teeth have to pay. (Serious)
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textContent}>{data[num]}</Text>
        {num === 4 ? null : (
          <View style={styles.btnControl}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.btnLike}
              onPress={() => nextJoke(num)}>
              <Text style={styles.txtTitle}>This is Funny!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.btnUnLike}
              onPress={() => nextJoke(num)}>
              <Text style={styles.txtTitle}>This is not Funny.</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Text>
          This app is created as part of HLsolution program. The materials
          contained on this website are provided for general information only
          and do not consitute any from of advice. HLS assumes no responsibility
          for the accuracy of any particular statement and accepts no liability
          for any loss or damage which may arise from reliance on the
          information contained on this site.
        </Text>
        <Text>Copyright 2021 HLS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems:'center',
    height: height,
  },
  title: {
    height: height * 0.15,
    paddingTop: height * 0.04,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    // borderWidth: 1,
  },
  imageLeft: {
    width: width * 0.15,
    height: width * 0.155,
  },
  titleRight:{
    flexDirection:'row'
  },
  titleRightTxt:{
    marginTop: width * 0.02
  },
  txtTitleRightTxt:{
    marginLeft: width * 0.06,
    color: 'black',
  },
  imageRight: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 10,
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.15,
    backgroundColor: '#29b363',
    // borderWidth: 1,
  },
  titleBG: {
    fontSize: Platform.OS === 'android' ? 18 : 20,
    color: 'white',
    fontWeight: 'bold',
  },
  titleBGContent: {
    fontSize: Platform.OS === 'android' ? 15 : 17,
    color: 'white',
  },
  content: {
    height: Platform.OS === 'ios' ? height * 0.4 : height * 0.45,
    // borderWidth: 1,
    borderBottomWidth: 0.8,
    borderColor: 'gray',
  },
  textContent: {
    width: width * 0.8,
    marginHorizontal: width * 0.1,
    fontSize: Platform.OS === 'android' ? 15 : 16,
  },
  btnControl: {
    width: width * 0.8,
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? height * 0.05 : height * 0.03,
    marginHorizontal: width * 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  },
  btnLike: {
    width: width * 0.3,
    height: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c7edb',
    borderRadius: 4,
    // borderWidth: 1,
  },
  btnUnLike: {
    width: width * 0.3,
    height: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CD5555',
    borderRadius: 4,
    // borderWidth: 1,
  },
  txtTitle: {
    color: 'white',
  },
  footer: {
    height: height * 0.2,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    // borderWidth: 1,
  },
});

export default App;
