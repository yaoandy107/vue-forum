<template>
    <v-container d-block fluid fill-height white py-0>
      <v-layout class="chat-body pb-0">
          <!-- Main -->
          <template v-for="item in messages">
              <!-- other people -->
              <template v-if="item.userId != globalObject.userData.userId">
                  <div class="message">
                      <img v-show="avatarUrl" :src="avatarUrl" class="message__user" draggable="false">
                      <div v-show="!avatarUrl" class="message__user">
                        <v-avatar color="teal" size="40">
                          <span class="white--text headline">{{(item.userName || '')[0]}}</span>
                        </v-avatar>
                      </div>
                      <div class="message__content">
                          <div class="message__name">{{item.userName}}</div>
                          <div v-if="item.type == 'text'" class="message__message">
                            <div class="message__text">{{item.message}}</div>
                          </div>
                          <div v-if="item.type == 'image'" class="message__image"><img :src="item.message"></div>
                      </div>
                      <div class="message__time">{{item.timeStamp}}</div>
                  </div>
              </template>
              <!-- 區塊：self -->
              <template v-if="item.userId == globalObject.userData.userId">
                  <div class="message message--self">
                      <div class="message__time">{{item.timeStamp}}</div>
                      <div class="message__content">
                          <div v-if="item.type == 'text'" class="message__message">
                            <div class="message__text">{{item.message}}</div>
                          </div>
                          <div v-if="item.type == 'image'" class="message__image"><img :src="item.message"></div>
                      </div>
                  </div>
              </template>
          </template>
      </v-layout>
      <v-container fluid pa-0>
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              id="js-message" 
              class="chat-input"
              v-model="message"
              label="輸入訊息"
              rows="4"
              textarea
              hide-details
              @keyup.enter="sendMessage($event)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
</template>

<script>
import FirebaseHelper from '@/helpers/FirebaseHelper'

export default {
  watch: {
    'globalObject.userData.userId': function () {
      const vm = this
      if (!vm.globalObject.userData.userId) {
        vm.messages = []
      }
    }
  },
  created: function () {
    this.setChat()
  },
  updated () {
    const chatBody = document.querySelector('.chat-body')
    chatBody.scrollTop = chatBody.scrollHeight
  },
  methods: {
    setChat () {
      const vm = this
      const userId = vm.globalObject.userData.userId
      FirebaseHelper.getChat(userId, vm.friendId)
        .onSnapshot((doc) => {
          vm.chatId = doc.id
          vm.messages = doc.data().messages || []
        })
    },
    sendMessage (event) {
      console.log(event)
      const vm = this
      const message = vm.message.trim()
      const userId = vm.globalObject.userData.userId
      const friendId = vm.friendId
      if (!message) {
        return
      }
      // 如果是按住shift則不傳送訊息(多行輸入)
      if (event.shiftKey) {
        return false
      }
      // 如果輸入是空則不傳送訊息
      if (message.length <= 1 && message.trim() === '') {
        return false
      }
      vm.messages.push({
        userName: vm.globalObject.userData.userName,
        userId: vm.globalObject.userData.userId,
        type: 'text',
        message: message.trim(),
        timeStamp: FirebaseHelper.getTimeStamp()
      })
      FirebaseHelper.sendMessage(userId, friendId, vm.messages)
      // 清空輸入欄位並
      vm.message = ''
    }
  },
  data: () => ({
    messages: [],
    message: ''
  }),
  props: {
    friendId: String,
    avatarUrl: String
  }
}
</script>

<style>
.chat-body {
  display: block;
  padding: 10px 0px;
  background-color: #fff;
  height: 65vh !important;
  overflow-y: auto;
  overflow-x: hidden;
}
.message {
  padding: 5px 10px;
  position: relative;
}
.message__user {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  vertical-align: top;
  display: inline-block;
  cursor: pointer;
}
.message__content {
  max-width: 70%;
  display: inline-block;
}
.message__name {
  margin: 5px 0px 5px 5px;
  font-size: 13px;
  color: #727C8A;
  vertical-align: top;
  cursor: pointer;
}
.message__message {
  margin: 5px 0px 5px 5px;
  font-size: 12px;
  color: #35393D;
  letter-spacing: 0.6px;
  background-color: #E3E8EB;
  border-radius: 12px;
  line-height: 1.5;
  text-align: left;
  word-break: break-all;
  white-space: pre-line;
}
.message__text {
  padding: 8px 10px 9px 11px;
  max-height: 300px;
  overflow: hidden;
}

.message__image {
  margin: 5px 25px 5px 5px;
}
.message__time {
  transform: scale(0.7);
  color: #ACB0B8;
  vertical-align: bottom;
  margin: 0px 0px 5px -12px;
  display: inline-block;
}
.message--self {
  text-align: right;
}
.message--self .message__message {
  background-color: #81D4FA;
}
.message--self .message__time {
  margin: 0px -16px 5px 0px;
}
.chat-input {
  height: 25vh;
}

@media screen and (max-width: 425px) {
  .message__content {
    max-width: 60%;
  }
}
@media screen and (max-width: 385px) {
  .message__content {
    max-width: 50%;
  }
}
</style>