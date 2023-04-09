import importTemplate from '../../util/importTemplate.js';
import {backendPath} from '../../env.js';
import  textToVoice from '../../util/textToVoice.js';
export default {
  props: {
    bookmark: {
      type: Object,
      default: () => {word: ""}
    }
  }, 
  data() {
    return { count: 0, openedTranslate: false, translateDetails: null, }
  },
  methods: {
    async speak(word) {
      try {
        await textToVoice(word)
      } catch (error) {
        console.log("🚀 ~ file: bookmarkItem.js:18 ~ speak ~ error:", error)
        
      }
    },
    async getTranslateDetails() {
      //if it is closed and no translate details, get the defination
      if(this.openedTranslate === false && this.translateDetails === null ) {
        await this.getDefination()
      }
      this.openedTranslate = !this.openedTranslate;
    },
    async getDefination() {
      try {
        const res = await fetch(`${backendPath}/word?text=${this.word}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
        });
        const resBody = JSON.parse(await res.text());
        this.translateDetails = resBody.def.meanings;
      } catch (error) {
        
      }
    }
  },
  computed: {
    word() {
      if(this.bookmark.word) {
        return this.bookmark.word;
      }
    }
  },
  template: await importTemplate('components/bookmarkItem/bookmarkItem.html')
}

