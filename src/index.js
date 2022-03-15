import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ProgressBtn } from './components';
import Icon from 'react-native-vector-icons/Ionicons';
import * as PaymentApi from './api/payment.api';
import axios from 'axios';

const STATUS_TEXT = {
  0: {
    text: 'SUBMIT',
    icon: 'chevron-forward'
  },
  1: {
    text: 'SUCCESS',
    icon: 'checkmark'
  },
  2: {
    text: 'ERROR',
    icon: 'close'
  }
}

export default function App() {
  const [progress, setProgress]   = React.useState(0);
  const [status, setStatus]       = React.useState(0);
  const [paymentId, setPaymentId] = React.useState(null);
  const [disableBtn, setDisableBtn] = React.useState(false);

  React.useEffect(() => {
    if (paymentId === null) { return }

    const interval = setInterval(() => {
      PaymentApi.getProgress(paymentId)
        .then((res) => {
          setProgress(res.data.progress);
          setDisableBtn(true)
          if (res.data.progress === 100) {
            setStatus(1)
            setDisableBtn(false)
            clearInterval(interval)
          }
        })
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentId])

  const initiatePayment = () => {
    PaymentApi.create()
      .then((res) => setPaymentId(res.data.id))
      .catch(err => console.log("error while creating payment", err))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ProgressBtn step={progress} totalSteps={100} status={status} onClick={initiatePayment} disable={disableBtn}>
        <View style={styles.textView}>
          <Text style={styles.text}>{STATUS_TEXT[status].text}</Text>
          <Icon name={STATUS_TEXT[status].icon} size={24} color="white"/>
        </View>
      </ProgressBtn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: '800',
    fontSize: 24,
    marginRight: 10
  }
});
