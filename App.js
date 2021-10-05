import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  AsyncStorage,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const App = () => {
  const [data, setData] = useState([]);
  const [num,setNum] = useState(0)

  const multiSet = async value => {
    const firstPair = [
      'TASKS1',
      `A child asked his father, "How were people born?" So his father said, "Adam and Eve made babies, then their babies became adults and made babies, and so on."

  The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now."
  
  The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."`,
    ];
    const secondPair = [
      'TASKS2',
      `Teacher: "Kids,what does the chicken give you?" 
      Student: "Meat!" 
      Teacher: "Very good! Now what does the pig give you?" 
      Student: "Bacon!" 
      Teacher: "Great! And what does the fat cow give you?" 
      Student: "Homework!"`,
    ];
    const thirdPair = [
      'TASKS3',
      `The teacher asked Jimmy, "Why is your cat at school today Jimmy?" 
      Jimmy replied crying, "Because I heard my daddy tell my mommy, 'I am going to eat that pussy once Jimmy leaves for school today!'"`,
    ];
    const fourPair = [
      'TASKS4',
      `A housewife, an accountant and a lawyer were asked "How much is 2+2?" 
      The housewife replies: "Four!". 
      The accountant says: "I think it's either 3 or 4. Let me run those figures through my spreadsheet one more time." 
      The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"`,
    ];
    const fivePair = [
      'TASKS5',
      `"That's all the jokes for today! Come back another day!"`,
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

    console.log('Done.');
  };

  const multiGet = async value => {
    try {
      const value = await AsyncStorage.multiGet([
        'TASKS1',
        'TASKS2',
        'TASKS3',
        'TASKS4',
        'TASKS5',
      ]);
      if (value !== null) {
        setData(value);
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('TASKS1');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };


  const setStringValue = async (value) => {
  try {
    await AsyncStorage.setItem('key', value)
  } catch(e) {
    // save error
  }

  console.log('Done.')
}
 const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('key');
    if (value !== null) {
      // We have data!!
      let valueNum = parseInt(value)
      setNum(valueNum + 1)
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

  const nextJoke = (number) => {
    setStringValue(number+'')
    setNum(number + 1)
    // console.log(num);
    
  };

  useEffect(() => {
    retrieveData()
    multiSet();
    multiGet();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Title</Text>
      </View>
      <View style={styles.background}>
        <Text>Background green</Text>
      </View>
      <View style={styles.content}>
        <Text>{data[num]}</Text>
        { num === 4 ? null :
        <View style={styles.btnControl}>
          <Button title="Like" onPress={() => nextJoke(num)} />
          <Button title="Unlike" color="red" onPress={() => nextJoke(num)} />
        </View> 
        }
        
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
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
    paddingTop: height * 0.05,
    borderWidth: 1,
  },
  background: {
    height: height * 0.15,
    borderWidth: 1,
  },
  content: {
    height: height * 0.4,
    borderWidth: 1,
  },
  btnControl: {
    width: width * 0.8,
    flexDirection: 'row',
    marginBottom: height * 0.1,
    marginHorizontal: width * 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  footer: {
    height: height * 0.2,
    borderWidth: 1,
  },
});

export default App;
