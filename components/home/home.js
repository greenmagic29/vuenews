import importTemplate from '../../util/importTemplate.js';

export default {
  data() {
    return { 
      items: [
 
    
    ],
      count: 0,
      topNews: []
    }
    
  },
  methods: {
    async getParagraphs() {
      console.log("🚀 ~ file: home.js:47 ~ getParagraphs ~ getParagraphs starts")
      try {
        const res = await fetch("http://localhost:3100/paragraph", {
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
      catch(error) {}
    },
    async getNews() {
      try {
        const res = await fetch("http://localhost:3100/news/topNews", {
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
      catch(error) {}
    },
    async toDocEdit(item) {
      this.$router.push(`/docEdit/${item.id}`)
    },
    async createParagraph() {
      try {
        const res = await fetch("http://localhost:3100/paragraph", {
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
    async createParagraphFromNews(item, index) {
      try {
        const res = await fetch(`http://localhost:3100/news/topNews/createTopNews/${index}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
        });
        const result = JSON.parse(await res.text());
        console.log("🚀 ~ file: home.js:61 ~ createParagraphFromNews ~ result", result)
        
        await this.toDocEdit(result)
      }
      catch(error) {
        console.log("🚀 ~ file: home.js:66 ~ createParagraphFromNews ~ error", error)
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
    await this.getNews();
    await this.getParagraphs();
    
  },

  template: await importTemplate('components/home/home.html')
}