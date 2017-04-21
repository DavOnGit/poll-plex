import * as firebase from 'firebase'

try {
  var config = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID
  }

  firebase.initializeApp(config)
} catch (err) {
  throw new Error(err)
}

export var facebookProvider = new firebase.auth.FacebookAuthProvider()
export var firebaseRef = firebase.database().ref()

export default firebase
