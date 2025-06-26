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
        <img @click="leveaMessage" class="icon" src="@/assets/images/message.svg" alt="" />
        <img @click="changeColor" class="icon" src="@/assets/images/set.svg" alt="" />
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
          <span>Asuna</span>
        </div>
        |
        <div class="title">
          <span>Meibus</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyHome",
  data() {
    return {
    };
  },
  methods: {
    like() {
      const h = this.$createElement;
      this.$notify({
        title: '点赞成功',
        duration: 1000,
        showClose: false,
        message: h(
          'i', { style: 'color: red' },
          '谢谢你的点赞~'
        )
      });
    },
    leveaMessage() {
      this.$message({
        message: '静态网站做不了啊~~~~',
        type: 'warning',
      });
    },
    changeColor() {
      const randomIndex = Math.floor(Math.random() * 10);
      this.$store.commit("setCurrentIndex", randomIndex);
    }
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

    span {
      color: black;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
