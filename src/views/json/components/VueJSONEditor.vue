<template>
  <div ref="editor" class="svelte-jsoneditor-vue" />
</template>

<script>
import { JSONEditor } from 'vanilla-jsoneditor';

export default {
  name: 'VueJSONEditor',
  props: {
    content: Object,
    readOnly: Boolean,
    onChange: Function,
    mode: String,
    tag: String,
    navigationBar: Boolean,
    mainMenuBar: Boolean
  },
  data() {
    return {
      config: {}
    };
  },
  watch: {
    content: {
      handler(newValue, oldValue) {
        console.log(
          `'watch content handle ==========${this.tag}=========`,
          JSON.stringify(newValue)
        );
        this.editor.updateProps({ content: { text: newValue.text } });
      },
      deep: true, // 是否深度监听
      immediate: false // 是否在组件创建时立即执行回调函数
    }
  },
  methods: {
    generateProps() {
      return {
        content: this.content,
        readOnly: this.readOnly,
        onChange: this.onChange,
        mode: this.mode,
        navigationBar: this.navigationBar,
        mainMenuBar: this.mainMenuBar
      };
    }
  },
  mounted() {
    this.editor = new JSONEditor({ target: this.$refs.editor, props: this.generateProps() });
    console.log('create editor', this.editor);
  },
  updated() {
    console.log('updated editor', this.editor);
    this.editor.updateProps(this.generateProps());
  },

  beforeUnmount() {
    console.log('destroy editor2');
    this.editor.destroy();
    this.editor = null;
  }
};
</script>

<style lang="less" scoped>
.svelte-jsoneditor-vue {
  display: flex;
  flex: 1;
}
</style>
