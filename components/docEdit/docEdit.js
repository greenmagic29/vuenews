import importTemplate from '../../util/importTemplate.js';

function getSelection(quill) {
  const range = quill.getSelection();
  if (range) {
    if (range.length == 0) {
      console.log('User cursor is at index', range.index);
    } else {
      const text = quill.getText(range.index, range.length);
      console.log('User has highlighted: ', text);
      return text;
    }
  } else {
    console.log('User cursor is not in editor');
  }

  return null;
}
function customBoldHandler(paragraphId) {
  return function (value) {
    console.log("🚀 ~ file: docEdit.js:3 ~ customBoldHandler ~ value", value)
    if(value) {
      this.quill.format('bold', true);
      const text = getSelection(this.quill);
      console.log("🚀 ~ file: docEdit.js:24 ~ customBoldHandler ~ text", text);
      //TODO: call api to save the text in db highlight words table
      const payload = {
        word: text,
        paragraphId: paragraphId
      };
      fetch("http://localhost:3100/bookmark", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': localStorage.getItem('login')
        },
        body: JSON.stringify(payload)
      }).then(res => {})
      .catch(e => {console.log(`customBoldHandler error: `, e)})
    }
    else {
      this.quill.format('bold', false);
    }
  }
}
export default {
  data() {
    return { count: 0, paragraph: {}, bookmarkDialog: { open: false }, saveTimer:null }
  },
  methods: {
    async getParagraph() {
      try {
        const res = await fetch(`http://localhost:3100/paragraph/${this.$route.params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
        });
        const resBody = JSON.parse(await res.text());
        
        this.paragraph = resBody.document;
      } catch (error) {
        
      }
    },
    openBookmarkDialog() {
      this.bookmarkDialog.open = true;
    }
  },
  async mounted() {
    console.log(`abcc`);
    let changes = false;
    const paragraphId = this.$route.params.id;
    const quill = new Quill('#editor', {
      theme: 'snow',
      formats: {
        Inline: {
          'size': 'large'
        }
      },
      modules: {
        
        toolbar: {
          container: '#toolbar',
          handlers: {
            'bold': customBoldHandler(paragraphId)
          }
        }
      },
      //readOnly: true
    });
    this.saveTimer = setInterval(function() {
      //
        
        // Save the entire updated text to localStorage
        if(!changes) {
          return;
        }
        const data = quill.getContents();
        console.log("🚀 ~ file: docEdit.js:99 ~ this.saveTime=setInterval ~ data", data)
        const payload = {
          content: data.ops
        }
        fetch("http://localhost:3100/paragraph/" + paragraphId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('login')
          },
          body: JSON.stringify(payload)
        }).then(res => {changes = false;})
        .catch(e => {console.log(`customBoldHandler error: `, e)})
      //}
    }, 10*1000);
    quill.on('text-change', function(delta, oldDelta, source) {
      //quill.getContents()
      changes = true;
      
    });
    await this.getParagraph();
    quill.setContents(this.paragraph.content);
    
    // var customButton = document.querySelector('#custom-button');
    // customButton.addEventListener('click', function() {
    //   console.log('Clicked!');
    // });
  },
  beforeDestroy() {
    if(this.saveTimer) {
      clearInterval(this.saveTimer);
    }
  },
  template: await importTemplate('components/docEdit/docEdit.html')
}

