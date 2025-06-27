<template>
  <div class="json">
    <div class="editor">
      <VueJSONEditor
        :content="content"
        mode="text"
        tag="editor1"
        :navigation-bar="true"
        :main-menu-bar="true"
        :on-change="onChange1"
        :read-only="false"
      />
      <VueJSONEditor
        :content="content2"
        :navigation-bar="false"
        :main-menu-bar="true"
        mode="tree"
        tag="editor2"
        :read-only="true"
      />
    </div>
  </div>
</template>

<script>
// import VueJSONEditor from './components/VueJSONEditor.vue'
import VueJSONEditor from './components/VueJSONEditor.vue'
export default {
  components: { VueJSONEditor },
  data() {
    return {
      content: {
        json: {
          greeting: 'Hello World',
          color: '#ff3e00',
          ok: true,
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        },
        text: undefined
      },
      content2: {
        json: {
        },
        text: undefined
      }
    }
  },

  mounted () {
    this.onChange1(this.content)
  },

  methods: {
    onChange1(content) {
      console.log('onChange1', content)
      // this.content = content

      if (content.text) {
        this.content2.text = content.text
      } else if (content.json) {
        this.content2.text = JSON.stringify(content.json)
      }
    }
  }

}
</script>
<style lang="less" scoped>
.json {


  .editor {
    width: 100%;
    height: auto;
    display: flex;

    --jse-theme-color: var(--primary-color);
    --jse-theme-color-highlight: var(--primary-hover-color);
  }
}
</style>
