import importTemplate from '../../util/importTemplate.js';
import {backendPath} from '../../env.js';
export default {
  props: {
    paragraphId: {
      type: String
    }
  },
  data() {
    return { meanings: [], count: 0 }
  },
  methods: {
    async getBookmarks() {
      try {
        const res = await fetch(`${backendPath}/bookmark?paragraphId=${ this.paragraphId }`, {
          method: 'GET',
          // params: { paragraphId: this.paragraphId },
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
        });
        const result = JSON.parse(await res.text());
        this.meanings = result.row.map(i=> {return {...i, open: false}});
        this.count = result.count;
      } catch (error) {
        
      }
    },
    closeDialog() {
      this.$emit('close')
    },
  },
  async mounted() {
    await this.getBookmarks();
  },
  template: await importTemplate('components/bookmarkDialog/bookmarkDialog.html')
}

