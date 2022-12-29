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
    }
  },
  async mounted() {
    await this.getParagraphs();
  },
  template: await importTemplate('components/home/home.html')
}