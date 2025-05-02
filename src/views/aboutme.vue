<template>
  <div class="container">
    <div class="left">
      <h1>Asuna</h1>
      <img src="@/assets/images/asuna.png" alt="" />
    </div>
    <div class="top">
      <chat-bot></chat-bot>
    </div>
    <div class="right">
      <h1>About me</h1>
      <div class="tag">
        <div>亚斯娜</div>
        <div>梦比优斯</div>
        <div>动漫</div>
        <div>影视</div>
        <div>佛系</div>
        <div>摆烂</div>
      </div>
    </div>
    <div class="rightdown">
      <h1>留言板</h1>
      <div class="messageContent">
        <span v-for="(item, index) in message" :key="index" class="messageItem">
          <div class="nameTime">
            <p>{{ item.name }}</p>
            <p>{{ item.time }}</p>
          </div>
          <span>
            {{ item.message }}
          </span>
        </span>
      </div>
    </div>
    <div class="leftdown">
      <h1>QQ</h1>
      <img src="@/assets/images/qq.jpg" alt="" />
    </div>
    <div class="downy">
      <h1>github</h1>
      <img src="@/assets/images/github.png" alt="" />
    </div>
    <div class="downc">
      <h1>WeChat</h1>
      <img src="@/assets/images/wechat.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import ChatBot from "@/componets/ChatBot.vue";
import messageData from "@/assets/message.js";
export default {
  components: {
    ChatBot,
  },
  name: "AboutMe",
  data() {
    return {
      message: messageData,
    };
  },
};
</script>
<style lang="less" scoped>
@keyframes move {
  0% {
    transform: translateX(800px);
  }
  100% {
    transform: translateX(0);
  }
}
.container {
  animation: move 0.5s ease-in-out;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "left top top right"
    "left top top rightdown"
    "leftdown downy downc rightdown";

  gap: 20px;
  padding: 5px;
  box-sizing: border-box;
  min-height: 585px;
  div {
    z-index: 1;
    border-radius: 10px;
    overflow: hidden;
    h1 {
      margin: 0;
      text-align: center;
      background-color: white;
    }
    img {
      width: 125px;
    }
  }
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  grid-area: left;
  background-color: rgb(254, 254, 254);
  h1 {
    background-color: rgb(159, 124, 93) !important;
    width: 100%;
    justify-items: flex-start;
  }
  img {
    width: 50%;
    border-radius: 40%;
    transform: translateY(-80%);
  }
}
.top {
  grid-area: top;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.right {
  grid-area: right;
  background-color: green;
  display: flex;
  flex-direction: column;
  .tag {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 10px;
    align-content: center;
    background-color: #a5a6fe;
    div {
      padding: 0 20px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      background-color: #fe73a2;
      position: relative;
    }
    div:hover {
      cursor: default;
      transform: scale(1.1);
      transition: all 0.3s ease-in-out;
    }
    div::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 9%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: url("@/assets/images/tag.svg") no-repeat center center;
      background-size: contain;
      pointer-events: none;
      z-index: 1;
    }
  }
}
.rightdown {
  grid-area: rightdown;
  display: flex;
  flex-direction: column;
  height: 100%;
  h1 {
    border-bottom: 1px solid #000;
  }
  .messageContent {
    background-color: rgb(235, 92, 32);
    border-radius: 0 0 10px 10px;
    overflow-y: auto;
    .messageItem {
      display: block;
      margin: 10px auto;
      padding: 0 10px;
      border-radius: 10px;
      width: 80%;
      div {
        margin-bottom: 5px;
        background-color: rgba(0, 0, 0, 0);
        color: white;
      }
      span {
        padding: 5px;
        display: inline-block;
        background-color: rgb(245, 172, 3);
        width: 100%;
        border-radius: 10px;
      }
      .nameTime {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0;
        height: 44px;
      }
    }
  }
}
.leftdown {
  grid-area: leftdown;
  background-color: rgb(37, 38, 39);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  h1 {
    background-color: rgb(213, 181, 248) !important;
    width: 100%;
  }
}
.downy {
  grid-area: downy;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  h1 {
    width: 100%;
    background-color: black !important;
    color: rgb(60, 118, 196);
  }
}
.downc {
  grid-area: downc;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  h1 {
    width: 100%;
    background-color: rgb(126, 184, 72) !important;
  }
}
</style>
