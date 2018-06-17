import firebase from 'firebase'

class FirebaseHelper {
  constructor () {
    const config = {
      apiKey: 'AIzaSyAGG7_qNlsnDTRePGGsB8Q3Cbit27AkDwQ',
      authDomain: 'devzone-27674.firebaseapp.com',
      databaseURL: 'https://devzone-27674.firebaseio.com',
      projectId: 'devzone-27674',
      storageBucket: '',
      messagingSenderId: '1024656756798'
    }
    const settings = {timestampsInSnapshots: true}
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }
    this.db = firebase.firestore()
    this.db.settings(settings)
  }
  isRegisteredEmail (email = '') {
    const accountsRef = this.db.collection('accounts')
    return accountsRef.where('email', '==', email).get()
    .then((querySnapshot) => {
      return querySnapshot.docs.length > 0 && email.length > 0
    })
  }
  login (email, password) {
    const accountsRef = this.db.collection('accounts')
    return accountsRef.where('email', '==', email).where('password', '==', password).limit(1).get()
    .then((querySnapshot) => {
      let userId
      querySnapshot.forEach((doc) => {
        userId = doc.id
        accountsRef.doc(userId).set({
          login_time: new Date(),
          logged_in: true
        }, { merge: true })
      })
      return userId
    })
    .catch((exception) => {
      console.log('登入錯誤')
    })
  }
  logout (userId) {
    const accountsRef = this.db.collection('accounts')
    return accountsRef.doc(userId).set({
      logout_time: new Date(),
      logged_in: false
    }, { merge: true })
    .then(() => {
      return true
    })
    .catch((exception) => {
      console.log('登出錯誤')
      return false
    })
  }
  register (email, username, password) {
    const accountsRef = this.db.collection('accounts')
    return accountsRef.add({
      email: email,
      username: username,
      password: password,
      created_time: new Date(),
      login_time: null,
      logout_time: null,
      logged_in: false
    })
    .then(() => {
      return true
    })
    .catch((exception) => {
      console.log('註冊錯誤')
      return false
    })
  }
}

const instance = new FirebaseHelper()

export default instance
