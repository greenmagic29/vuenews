import importTemplate from '../../util/importTemplate.js';

export default {
  data() {
    return { 
      items: [
 
    
    ],
    count: 0
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
    await this.getParagraphs();
  },
  filters: {

  },
  template: await importTemplate('components/home/home.html')
}