<template>
  <div id="app">
    <div id="nav">
      <router-link class="nav-link" to="/myhome">Home</router-link>
      <router-link class="nav-link" to="/myblog">Blog</router-link>
      <router-link class="nav-link" to="/aboutme">About</router-link>
    </div>
    <div :style="{ backgroundColor: currentColor }" id="banner">
      <keep-alive include="AboutMe,ChatBot">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  computed: {
    currentColor() {
      return this.$store.getters.currentColor;
    },
  },
  methods: {
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#app {
  font-style: normal;
  display: flex;
  flex-direction: column;
  height: 97vh;
  width: 100%;
  overflow: hidden;

  #nav {
    border-radius: 10px 10px 0 0;
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-right: 2px solid black;
    background-color: white;
    height: 35px;
    min-height: 30px;
    width: 100%;
    border-bottom: 2px solid black;
    display: flex;
    flex-direction: row;
    gap: 10px;

    .nav-link {
      font-family: "Times New Roman", Times, serif;
      padding-right: 10px;
      height: 100%;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: inherit;

      &:nth-child(1) {
        padding-left: 15px;
      }

      &:not(:last-child) {
        border-right: 1px solid black;
      }

      &.router-link-exact-active::after,
      &:hover::after {
        content: "o";
        position: absolute;
        top: -18px;
        font-size: 50px;
        color: rgba(0, 122, 0, 0.3);
      }
    }
  }

  #banner {
    position: relative;
    flex: 1;
    overflow: hidden;
    border: 2px solid black;
    border-radius: 0 0 10px 10px;
  }

  #banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/images/line.png') no-repeat center center;
    background-attachment: fixed;
    background-size: cover;
    opacity: 0.2;
    z-index: 0;
  }
}
</style>
