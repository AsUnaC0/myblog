<template>
  <div class="home">
    <div id="banner">
      <div class="left">
        <div class="text">
          <h1>Oi~</h1>
          <h1>欢迎来到</h1>
          <h1>我的Blog</h1>
          <h1>◝(⑅•ᴗ•⑅)◜°♡</h1>
        </div>
      </div>
      <div class="right">
        <img @click="like" class="icon" src="@/assets/images/bang.svg" alt="" />
        <img
          @click="messageInput = !messageInput"
          class="icon"
          src="@/assets/images/message.svg"
          alt="" />
        <img
          @click="changeColor"
          class="icon"
          src="@/assets/images/set.svg"
          alt="" />
      </div>
      <div class="bottom">
        <div class="title">
          <span style="color: green">const</span> <span>世界和平</span>
        </div>
        |
        <div class="title">
          <span style="color: green">const</span> <span>age=18</span>
        </div>
        |
        <div class="title">
          <span style="color: green">const</span> <span>money=+∞</span>
        </div>
        |
        <div class="title">
          <span style="color: rgb(226, 174, 127)">Asuna</span>
        </div>
        |
        <div class="title">
          <span style="color: rgb(196, 27, 30)">Meibus</span>
        </div>
      </div>
      <div v-show="messageInput" class="messageInput">
        <div class="title">
          <span>留言板</span>
          <img
            @click="messageInput = false"
            src="@/assets/images/x.svg"
            alt="" />
        </div>
        <input v-model="name" type="text" placeholder="留下你的大名吧~" />
        <textarea
          v-model="content"
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="留下你的留言吧~"></textarea>
        <button @click="handleMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import message from "@/assets/message";
export default {
  name: "MyHome",
  data() {
    return {
      color: ["rgb(68, 86, 167)", "rgb(148, 68, 181)", "rgb(167, 68, 68)"],
      index: 0,
      messageInput: false,
      content: "",
      name: "",
      message: message,
    };
  },
  mounted() {
    this.messageInput = false;
  },
  computed: {
    ...mapState(["currentColor", "likes"]),
  },
  created() {
    this.$emit("changeColor", this.color[this.index]);
  },
  methods: {
    changeColor() {
      this.index = (this.index + 1) % 3;
      localStorage.setItem("color", this.color[this.index]);
      this.$store.commit("changeColor", this.color[this.index]);
    },
    like() {
      this.$store.commit("addLike");
      alert("第" + this.likes + "次点赞♡" + "谢谢你的喜欢");
    },
    handleMessage() {
      this.messageInput = false;

      this.name = "";
      this.content = "";
      alert("留言成功");
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes move {
  0% {
    transform: translate(-700px, 0);
    opacity: 0;
  }
  100% {
    transform: translate(50px, 0);
    opacity: 1;
  }
}
@keyframes move2 {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(130px);
    opacity: 1;
  }
}

.home {
  height: 100%;
  width: 100%;
}

#banner {
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 6fr 1fr;
  grid-template-rows: 1fr 80px;
  grid-template-areas:
    "left right"
    "bottom bottom";
  .messageInput {
    animation: move2 0.5s ease-in-out forwards;
    position: absolute;
    border-radius: 10px;
    top: 0;
    right: 250px;
    display: flex;
    flex-direction: column;
    background-color: rgb(235, 92, 32);
    .title {
      font-size: 30px;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      img {
        width: 20px;
        padding-right: 10px;
        cursor: pointer;
      }
      span {
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
    input {
      border-radius: 10px;
      padding: 10px;
      margin: 10px;
      box-sizing: border-box;
    }

    textarea {
      resize: none;
      border-radius: 10px;
      padding: 10px;
      margin: 10px;
      box-sizing: border-box;
    }
    button {
      border-radius: 10px;
      padding: 10px;
      margin: 10px;
      box-sizing: border-box;
    }
    button:hover {
      cursor: pointer;
    }
  }
  .left {
    grid-area: left;
    overflow: hidden;
    padding: 20px;
    .text {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
      cursor: default;
      h1 {
        transform: translateX(-700px);
        font-size: 60px;
        color: white;
        text-align: left;
        margin: 0;
      }
      h1:nth-child(1) {
        animation: move 1s ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }
      h1:nth-child(2) {
        animation: move 1s ease-in-out;
        animation-delay: 0.3s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }
      h1:nth-child(3) {
        animation: move 1s ease-in-out;
        animation-delay: 0.6s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }
      h1:nth-child(4) {
        animation: move 1s ease-in-out;
        animation-delay: 0.9s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }
    }
  }
  .right {
    z-index: 1;
    grid-area: right;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: end;
    padding: 20px;
    .icon {
      height: 50px;
      width: 50px;
      margin-right: 20px;
      transition: all 1s;
    }
    .icon:hover {
      cursor: pointer;
      transform: rotate(360deg);
    }
  }
  .bottom {
    z-index: 1;
    grid-area: bottom;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top: 2px solid black;
    .title:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.5s;
      font-size: 30px;
      font-weight: 600;
      text-shadow: 0 0 10px rgb(226, 174, 127);
    }
    span {
      color: black;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
