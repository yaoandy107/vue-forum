import firebase from 'firebase/app'
import 'firebase/firestore'

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
      let userData = {}
      querySnapshot.forEach((doc) => {
        userData.userId = doc.id
        userData.userName = doc.data().userName
        accountsRef.doc(userData.userId).set({
          login_time: new Date(),
          logged_in: true
        }, { merge: true })
      })
      return userData
    })
    .catch((exception) => {
      console.log(exception)
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
  register (email, userName, password) {
    const accountsRef = this.db.collection('accounts')
    return accountsRef.add({
      email: email,
      userName: userName,
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
  getFriendList (userId) {
    if (userId) {
      const accountsRef = this.db.collection('friends').doc(userId).collection('friends')
      return accountsRef.get()
        .then((querySnapshot) => {
          let friendList = []
          querySnapshot.forEach((doc) => {
            friendList.push(doc.data())
          })
          return friendList
        })
      .catch((exception) => {
        console.log(exception)
      })
    }
  }
  getChat (userId, friendId) {
    if (userId && friendId) {
      const chatRef = this.db.collection('chats').doc(userId).collection('chats').doc(friendId)
      return chatRef
    }
  }
  sendMessage (userId, friendId, message) {
    // console.log(message)
    const chatRef = this.db.collection('chats').doc(userId).collection('chats').doc(friendId)
    const chatRef2 = this.db.collection('chats').doc(friendId).collection('chats').doc(userId)
    chatRef.set({
      messages: message
    }, {merge: true})
    chatRef2.set({
      messages: message
    }, {merge: true})
  }
  searchUserByEmail (email) {
    if (email) {
      const accountsRef = this.db.collection('accounts')
      return accountsRef.where('email', '==', email).limit(1).get()
        .then((querySnapshot) => {
          let userInfo
          querySnapshot.forEach((doc) => {
            userInfo = doc.data()
          })
          return userInfo
        })
        .catch((exception) => {
          console.log(exception)
        })
    }
  }
  addFriend (userId, email) {
    if (email) {
      const accountsRef = this.db.collection('accounts')
      return accountsRef.where('email', '==', email).limit(1).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const friendsRef = this.db.collection('friends').doc(userId).collection('friends')
            let friend = doc.data()
            friend.userId = doc.id
            friendsRef.add(friend)
          })
        })
        .catch((exception) => {
          console.log(exception)
        })
    }
  }
  getTimeStamp () {
    return new Date()
  }
  getCategoryList () {
    const categoriesRef = this.db.collection('categories')
    return categoriesRef.get()
    .then((querySnapshot) => {
      let categoryList = []
      querySnapshot.forEach((doc) => {
        categoryList.push({ url: doc.id, text: doc.data().name })
      })
      return categoryList
    })
  }
  getPostList (category, orderBy = '') {
    const postsRef = this.db.collection('posts')
    const path = 'categories.' + category
    let tempQuery = postsRef.where(path, '<', new Date())
    switch (orderBy) {
      case 'explore':
        tempQuery = tempQuery.orderBy('categories.num_of_explore')
        break
      case 'like':
        tempQuery = tempQuery.orderBy('categories.num_of_like')
        break
      case 'reply':
        tempQuery = tempQuery.orderBy('categories.num_of_reply')
        break
      case 'created_time':
        tempQuery = tempQuery.orderBy('categories.' + category)
        break
    }
    return tempQuery.get()
    .then((querySnapshot) => {
      let postList = []
      querySnapshot.forEach((doc) => {
        postList.push({ postId: doc.id, title: doc.data().title, author: doc.data().author, like: doc.data().num_of_like, reply: doc.data().num_of_reply, explore: doc.data().num_of_explore })
      })
      return postList
    })
  }
  getPostData (postId) {
    const postsRef = this.db.collection('posts')
    return postsRef.doc(postId).get()
    .then((documentSnapshot) => {
      return documentSnapshot.data()
    })
  }
  addPost (postData) {
    const postsRef = this.db.collection('posts')
    let temp = {}
    temp[postData.category] = new Date()
    return postsRef.add({
      authorId: postData.authorId,
      authorName: postData.authorName,
      categories: temp,
      title: postData.title,
      content: postData.content,
      floor: 0,
      num_of_like: 0,
      num_of_reply: 0,
      num_of_explore: 0,
      isMarkdown: postData.isMarkdown
    })
  }
}

const instance = new FirebaseHelper()

export default instance
