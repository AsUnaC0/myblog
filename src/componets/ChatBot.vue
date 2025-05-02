<template>
  <div class="chat-container">
    <h1>ChatBot</h1>
    <div class="chat-body" id="chat-body">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.isLeft ? 'message-left' : 'message-right']">
        <div class="message-content">
          {{ message.text }}
        </div>
      </div>
    </div>
    <div class="chat-footer">
      <input
        v-model="messageInput"
        type="text"
        id="message-input"
        placeholder="来与我畅聊吧~~" />
      <button @click="send" id="send-button">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBot",
  data() {
    return {
      messageInput: "",
      userContent: "",
      messages: [],
    };
  },
  methods: {
    send() {
      const messageToSend = this.messageInput.trim();
      if (messageToSend === "") return;

      this.sendMessage(false, messageToSend);
      this.userContent = messageToSend;
      // 清空输入框
      this.messageInput = "";
      const options = {
        method: "POST",
        headers: {
          Authorization:
            "Bearer sk-wonjouvczzwznffzdzxsmdjumkdgnbcywybezpnrdfxxdvjd",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
          messages: [
            {
              role: "assistant",
              content:
                "你是Yuanc的博客里面的聊天机器人，请根据用户的输入进行回答。你可以回答任何问题，或者进行闲聊。请注意，你的回答应该是友好和礼貌的。使用中文进行交流。请开始聊天吧！",
            },
            {
              role: "user",
              content: this.userContent,
            },
          ],
          stream: false,
          max_tokens: 300,
          temperature: 0.2,
          top_p: 0.1,
          top_k: 10,
          frequency_penalty: 0,
          n: 1,
        }),
      };

      fetch("https://api.siliconflow.cn/v1/chat/completions", options)
        .then((response) => response.json())
        .then((response) => {
          const botMessage = response.choices[0].message.content;
          this.sendMessage(true, botMessage);
        })
        .catch((err) => console.error(err));
    },
    sendMessage(isLeft, messageText) {
      if (messageText.trim() === "") return;

      // 添加消息到数组
      this.messages.push({
        isLeft,
        text: messageText,
      });

      // 在下一个 tick 时滚动到底部
      this.$nextTick(() => {
        const chatBody = document.getElementById("chat-body");
        chatBody.scrollTop = chatBody.scrollHeight;
      });
    },
  },
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

/* 聊天框头部 */
h1 {
  background-color: rgb(227, 161, 164);
  text-align: center;
}

/* 聊天框主体 */
.chat-body {
  flex: 1;
  padding: 10px;
  width: 100%;
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
}

.chat-body::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: url("@/assets/images/year2025.svg") no-repeat center center;
  background-size: contain;
  opacity: 0.5;
  pointer-events: none;
  z-index: 1;
}

/* 确保消息在背景上层 */
.message {
  position: relative;
  z-index: 2;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  padding: 0 10px;
}

.message.message-left {
  justify-content: flex-start;
}

.message.message-right {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
}

.message.message-left .message-content {
  background-color: #e5e5ea;
  color: #000;
}

.message.message-right .message-content {
  background-color: rgb(227, 161, 164);
  color: white;
}

/* 聊天框底部 */
.chat-footer {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
}

.chat-footer input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.chat-footer button {
  padding: 10px 20px;
  background-color: rgb(227, 161, 164);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-footer button:hover {
  background-color: #005bb5;
}
</style>
