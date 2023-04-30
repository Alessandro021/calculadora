import React, {useState} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Diaplay';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState('');
  const [firstValue, setFirstValue] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false); //esperando pelo operando

  function addDigito(digit) {

    if (digit === '.' && (displayValue.includes('.') || waitingForOperand)) {
      // Impede que o usuário digite mais de um ponto decimal ou inicie com um ponto decimal
      return;
    }

    if(displayValue.replace(".", "").length > 14){
      return;
    }
    
    startWithDecimal()

    if (digit === '0' && displayValue === '0') {
      // Impede que o usuário digite zeros consecutivos no início
      return;
    }

    if (displayValue === '0' || waitingForOperand) {
      setDisplayValue(digit.toString());
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue + digit.toString());
    }
  }
  
  function clear() {
    setDisplayValue('0');
    setOperator('');
    setFirstValue('');
    setWaitingForOperand(false);
  }

  function performOperation(nextOperator) {
    if (operator === '=' && waitingForOperand) {
      // Impede que o usuário execute operações múltiplas consecutivas
      setOperator(nextOperator);
      return;
    }

    const inputValue = parseFloat(displayValue);

    if (operator && !waitingForOperand) {
      const result = calculate(firstValue, inputValue, operator);
      setDisplayValue(result.toString());
      setFirstValue(result);
    } else {
      setFirstValue(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  }

  function calculate(firstValue, secondValue, currentOperator) {
    switch (currentOperator) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  }


  function startWithDecimal() {
    if (displayValue === '' || displayValue === '0') {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    }
  }
  
  return (
    <View style={styles.container}>
    <StatusBar barStyle="light-content" />

      <Display value={displayValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.').toString()} />

      <View style={styles.buttons}>
        <Button label="AC" triple="triple" OnClick={clear} />
        <Button label="/" operation="operation" OnClick={() => performOperation("/")} />
        <Button label="7" OnClick={() => addDigito("7")} />
        <Button label="8" OnClick={() => addDigito("8")} />
        <Button label="9" OnClick={() => addDigito("9")} />
        <Button label="*" operation="operation" OnClick={() => performOperation("*")} />
        <Button label="4" OnClick={() => addDigito("4")} />
        <Button label="5" OnClick={() => addDigito("5")} />
        <Button label="6" OnClick={() => addDigito("6")} />
        <Button label="-" operation="operation" OnClick={() => performOperation("-")} />
        <Button label="1" OnClick={() => addDigito("1")} />
        <Button label="2" OnClick={() => addDigito("2")} />
        <Button label="3" OnClick={() => addDigito("3")} />
        <Button label="+" operation="operation" OnClick={() => performOperation("+")} />
        <Button label="0" double="double" OnClick={() => addDigito("0")} />
        <Button label="." OnClick={() => addDigito(".")} />
        <Button label="=" opertion="operation" OnClick={() => performOperation("=")} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttons:{
    flexDirection: "row",
    flexWrap: "wrap", //QUEBRA A LINHA
  }
});
