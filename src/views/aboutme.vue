<template>
  <div class="container">
    <div class="left">
      <h1>Asuna</h1>
      <div class="showImg">
        <img class="box" v-for="item in 9" :key="item" src="@/assets/images/asuna.png" :alt="'item ' + item" />
      </div>
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
    <div class="imgBox leftdown">
      <h1>QQ</h1>
      <img src="@/assets/images/qq.jpg" alt="" />
    </div>
    <div class="imgBox downy">
      <h1>github</h1>
      <a class="mygithub" href="https://github.com/AsUnaC0">https://github.com/AsUnaC0</a>
    </div>
    <div class="imgBox downc">
      <h1>WeChat</h1>
      <img src="@/assets/images/wechat.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import ChatBot from "@/componets/ChatBot.vue";
import messageData from "@/assets/message.js";
import { gsap } from "gsap";
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
  mounted() {
    this.registerFadeEffect();
    this.setupHoverEffect();
  },
  methods: {
    registerFadeEffect() {
      gsap.registerEffect({
        name: "fade",
        defaults: { duration: 3 }, // 调整持续时间为3秒
        effect: (targets, config) => {
          return gsap.to(targets, {
            duration: config.duration,
            opacity: 0,
            onComplete: () => {
              // 可选：隐藏后重置透明度
              gsap.set(targets, { opacity: 1 });
            }
          });
        }
      });
    },
    setupHoverEffect() {
      document.querySelectorAll(".box").forEach((box) => {
        box.addEventListener("mouseenter", () => {
          gsap.effects.fade(box);
        });
        // 添加鼠标离开时恢复的效果
        box.addEventListener("mouseleave", () => {
          gsap.to(box, { opacity: 1, duration: 0.5 }); // 恢复透明度
        });
      });
    }
  }
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
      width: 150px;
      height: 150px;
    }
  }
}

.left {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  grid-area: left;
  background-color: rgb(254, 254, 254);

  h1 {
    background-color: rgb(159, 124, 93) !important;
    width: 100%;
  }

  .showImg {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    width: 100%;
    box-sizing: border-box;

    img {
      width: 100%;
      height: auto;
      aspect-ratio: 1/1;
      border-radius: 40%;
      transition: opacity 0.3s ease;
      object-fit: cover;
    }
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
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-content: center;
    background-color: #a5a6fe;
    border-radius: 0 0 10px 10px;

    div {
      padding: 0 20px;
      margin: 10px 0;
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

.imgBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden; // 确保内容不会溢出

  h1 {
    width: 100%;
    margin: 0;
    text-align: center;
    padding: 5px 0;
    background-color: white;
  }

  img {
    width: 100%;
    height: auto;
    max-width: 150px;
    max-height: 150px;
    min-width: 80px; // 设置最小宽度保证二维码可扫描
    min-height: 80px; // 设置最小高度保证二维码可扫描
    object-fit: contain;
    border-radius: 5px;
    transition: all 0.3s ease; // 添加平滑过渡效果
  }
}

// 特定区域的样式覆盖
.leftdown {
  grid-area: leftdown;
  background-color: rgb(37, 38, 39);

  h1 {
    background-color: rgb(213, 181, 248) !important;
  }
}

.downy {
  grid-area: downy;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .mygithub {
    text-decoration: none;
    color: black;
    margin: auto 0;
  }

  h1 {
    background-color: black !important;
    color: rgb(60, 118, 196);
  }
}

.downc {
  grid-area: downc;
  background-color: rgb(255, 255, 255);

  h1 {
    background-color: rgb(126, 184, 72) !important;
  }
}

// 响应式调整
@media (max-width: 1200px) {
  .imgBox {
    img {
      max-width: 130px;
      max-height: 130px;
    }
  }
}

@media (max-width: 992px) {
  .imgBox {
    img {
      max-width: 110px;
      max-height: 110px;
    }
  }
}

@media (max-width: 768px) {
  .imgBox {
    img {
      max-width: 100px;
      max-height: 100px;
    }
  }

  // 调整网格布局以适应小屏幕
  .container {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "left top"
      "left top"
      "right rightdown"
      "leftdown downy"
      "downc .";
  }
}

@media (max-width: 576px) {
  .imgBox {
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }

  // 进一步调整网格布局以适应手机屏幕
  .container {
    grid-template-columns: 1fr;
    grid-template-areas:
      "left"
      "top"
      "right"
      "rightdown"
      "leftdown"
      "downy"
      "downc";
  }
}
</style>
