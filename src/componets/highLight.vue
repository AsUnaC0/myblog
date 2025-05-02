<template>
  <pre><code class="language-javascript" v-html="highlightedCode"></code></pre>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';   // 引入主题样式
import 'prismjs/components/prism-javascript'; // 引入 JavaScript 语言支持

export default {
  props: ['code'],
  computed: {
    highlightedCode() {
      return Prism.highlight(this.code, Prism.languages.javascript, 'javascript');
    }
  }
};
</script>