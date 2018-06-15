import firebase from 'firebase'

class FirebaseHelper {
  constructor () {
    this.config = {
      apiKey: 'AIzaSyAGG7_qNlsnDTRePGGsB8Q3Cbit27AkDwQ',
      authDomain: 'devzone-27674.firebaseapp.com',
      databaseURL: 'https://devzone-27674.firebaseio.com',
      projectId: 'devzone-27674',
      storageBucket: '',
      messagingSenderId: '1024656756798'
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(this.config)
    }
    this.db = firebase.firestore()
  }
  login (username, password) {
    console.log(username, password)
    var accountsRef = this.db.collection('accounts')
    return accountsRef.where('username', '==', username).where('password', '==', password).limit(1).get()
      .then((querySnapshot) => {
        let userId
        querySnapshot.forEach((doc) => {
          userId = doc.id
        })
        return userId
      })
  }
}
export default FirebaseHelper
