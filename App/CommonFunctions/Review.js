import React from 'react'
import { AsyncStorage, Keyboard } from 'react-native'

export function UpdatePosition(selection,positionOfKeyWords,e)  {
  var keyType = '' ;

  if (e.nativeEvent.key == "Backspace") {
    keyType = 'BackSpace'
  } else if (e.nativeEvent.key == "Enter"){
    Keyboard.dismiss()
  } else {
    keyType = 'Character'
  }
  var i1 = 0;
  var flag = 0;

  for (var i = 0; i < positionOfKeyWords.length; i++) {
    var object = positionOfKeyWords[i];
    if(selection.start <= positionOfKeyWords[positionOfKeyWords.length -1].end){
      if (selection.start > object.end && selection.start < positionOfKeyWords[i + 1].position) {
        i1 = i;
        const { start } = selection;
        flag =  1
      } else if (selection.start < object.position && i == 0) {
        i1 = -1;
        const { start } = selection;
        flag =  1 ;
      }

      if (flag == 1 && i > i1) {
        if (keyType == 'BackSpace') {
          object.position = object.position - 1
          object.end = object.end - 1
        } else if(keyType == 'Character') {
          object.position = object.position + 1
          object.end = object.end + 1
        }
        positionOfKeyWords[i] = object
        if (i == positionOfKeyWords.length -1) {
          flag = 0
        }
      }
    }
  }

}

export function TrimPosition(positionOfKeyWords,message,isKeyWordFirst){

  AsyncStorage.setItem("IsReview", "True");
  var arrText = [];
  if (isKeyWordFirst) {
    for (var i = 0; i <= positionOfKeyWords.length; i++) {
      var object = positionOfKeyWords[i];
      let strSub = ''
      if (i == 0){
        strSub = message.substring(0,object.position)
      }
      else if(i == positionOfKeyWords.length){
        strSub = message.substring(positionOfKeyWords[i - 1].end,message.length)
      }
      else {
        strSub = message.substring(positionOfKeyWords[i - 1].end,object.position)
      }
      arrText.push(strSub)
    }
  } else {
    for (var i = 0; i < positionOfKeyWords.length; i++) {
      var object = positionOfKeyWords[i];
      let strSub = ''
      if(i == positionOfKeyWords.length - 1){
        strSub = message.substring(positionOfKeyWords[i].end,message.length)
      }
      else {
        strSub = message.substring(object.end,positionOfKeyWords[i+1].position)
      }
      arrText.push(strSub)
    }
  }
  AsyncStorage.setItem("MessageArray", JSON.stringify(arrText));
}
