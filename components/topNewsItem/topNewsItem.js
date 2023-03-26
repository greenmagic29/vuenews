import importTemplate from '../../util/importTemplate.js';
import {backendPath} from '../../env.js';
export default {
  props: {
    topNew: {
      type: Object,
      default: () => { name: "" }
    },
    newsIndex: Number,
    modes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return { count: 0, showPanel: false }
  },
  methods: {
    async createParagraphFromNews(mode="prime") {
      try {
        const payload = {mode};
        const res = await fetch(`${backendPath}/news/topNews/createTopNews/${this.newsIndex}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
          body: JSON.stringify(payload)
        });
        const result = JSON.parse(await res.text());
        console.log("🚀 ~ file: home.js:61 ~ createParagraphFromNews ~ result", result)
        this.$emit('doc-edit', result)
        
      }
      catch(error) {
        console.log("🚀 ~ file: home.js:66 ~ createParagraphFromNews ~ error", error)
      }
    },
    togglePanel() {
      this.showPanel = !this.showPanel
    }
  },
  template: await importTemplate('components/topNewsItem/topNewsItem.html')
}

