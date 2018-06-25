<template>
    <v-content>
        <v-container fluid fill-height white>
        <v-layout class="room_body" justify-center align-center>
            <!-- Main -->
            <template v-for="item in messages">
                <!-- other people -->
                <template v-if="item.userName != userName">
                    <div class="message">
                        <img src="https://vuetifyjs.com/static/doc-images/john.jpg" class="message_user" draggable="false">
                        <div class="message_content">
                            <div class="message_name">{{item.userName}}</div>
                            <div v-if="item.type == 'text'" class="message_message">
                            <div class="message_text">{{item.message}}</div>
                            </div>
                            <div v-if="item.type == 'image'" class="message_image"><img :src="item.message"></div>
                        </div>
                        <div class="message_time">{{item.timeStamp}}</div>
                    </div>
                </template>
                <!-- 區塊：self -->
                <template v-if="item.userName == userName">
                    <div class="message message_self">
                        <div class="message_time">{{item.timeStamp}}</div>
                        <div class="message_content">
                            <div v-if="item.type == 'text'" class="message_message">
                            <div class="message_text">{{item.message}}</div>
                            </div>
                            <div v-if="item.type == 'image'" class="message_image"><img :src="item.message"></div>
                        </div>
                    </div>
                </template>
            </template>
        </v-layout>
    </v-container>
    </v-content>
    
</template> 

<script>
export default {
  watch: {
    'globalObject.userId' (val, oldVal) {
      console.log(val + ' ' + oldVal)
    }
  },
  data: () => ({
    messages: [
        {userName: '姚韋辰', type: 'text', message: '哈哈'},
        {userName: '陳威任', type: 'text', message: '您好'}
    ],
    userName: '姚韋辰'
  }),
  props: {
    source: String
  }
}
</script>

<style>
.room_body {
  display: block;
  padding: 10px 0px;
  margin-top: 48px;
  background-color: #fff;
  height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.message {
  padding: 5px 10px;
  position: relative;
}
.message_user {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  vertical-align: top;
  display: inline-block;
  cursor: pointer;
}
.message_content {
  max-width: 70%;
  display: inline-block;
}
.message_name {
  margin: 5px 0px 5px 5px;
  font-size: 13px;
  color: #727C8A;
  vertical-align: top;
  cursor: pointer;
}
.message_message {
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
.message_text {
  padding: 8px 10px 9px 11px;
  max-height: 300px;
  overflow: hidden;
}

.message_image {
  margin: 5px 25px 5px 5px;
}
.message_time {
  transform: scale(0.7);
  color: #ACB0B8;
  vertical-align: bottom;
  margin: 0px 0px 5px -12px;
  display: inline-block;
}
.message_self {
  text-align: right;
}
.message_self .message_message {
  background-color: #AFF47E;
  /* margin-right: 25px; */
}
.message_self .message_message_text {
  padding: 8px 10px 9px 11px;
  max-height: 100%;
  overflow: unset;
}
.message_self .message_time {
  margin: 0px -16px 5px 0px;
}
@media screen and (max-width: 425px) {
  .message_content {
    max-width: 60%;
  }
}
@media screen and (max-width: 385px) {
  .message_content {
    max-width: 50%;
  }
}
</style>
