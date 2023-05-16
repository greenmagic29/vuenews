import importTemplate from '../../util/importTemplate.js';
import {backendPath, frontendPath} from '../../env.js';
export default {
  data() {
    return { 
      items: [
 
    
    ],
      count: 0,
      topNews: [],
      paragraphModes: []
    }
    
  },
  methods: {
    async getParagraphs() {
      console.log("🚀 ~ file: home.js:47 ~ getParagraphs ~ getParagraphs starts")
      try {
        const res = await fetch(`${backendPath}/paragraph`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
        });
        const result = JSON.parse(await res.text());
        this.items = result.row;
        this.count = result.count;
        
      }
      catch(error) {
        console.log("🚀 ~ file: home.js:34 ~ getParagraphs ~ error:", error)
        
      }
    },
    async getNews() {
      try {
        const res = await fetch(`${backendPath}/news/topNews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
        });
        const result = JSON.parse(await res.text());
        this.topNews = result.topNews
      }
      catch(error) {
        console.log("home.js, fail to get the topNews", error)
        
      }
    },
    async getParagraphModes() {
      try {
        const res = await fetch(`${backendPath}/paragraphModes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
        });
        const result = JSON.parse(await res.text());
        this.paragraphModes = result.modes
      } catch (error) {
        console.log("home.js, fail to get paragraphModes", error)
      }
    },
    async toDocEdit(item) {
      this.$router.push(`/docEdit/${item.id}`)
    },
    async createParagraph() {
      try {
        const res = await fetch(`${backendPath}/paragraph`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
        });
        const result = JSON.parse(await res.text());
        console.log("🚀 ~ file: home.js:45 ~ createParagraph ~ result", result)
        await this.toDocEdit(result)
      }
      catch(error) {}
    },
    async createParagraphFromNewsEvent(result) {
      try {        
        await this.toDocEdit(result)
      }
      catch(error) {
        console.log("🚀 ~ file: home.js:66 ~ createParagraphFromNewsEvent ~ error", error)
      }
    },
    timeFormat(value) {
      if(!value) return '';
      try {
        const format  = 'YYYY-MM-DD [at] HH:mm'
        const day = dayjs(value);
        console.log("🚀 ~ file: home.js:55 ~ timeFormat ~ value", value)
        return day.format(format);
      }
      catch(e) {
        console.log("🚀 ~ file: home.js:63 ~ time ~ e", e)
        return ""
      }
    }
  },
  async mounted() {
    await this.getParagraphModes();
    await this.getNews();
    await this.getParagraphs();
    
  },

  template: await importTemplate('components/home/home.html')
}