import importTemplate from '../../util/importTemplate.js';

export default {
  data() {
    return { meanings: [] }
  },
  template: await importTemplate('components/bookmarkDialog/bookmarkDialog.html')
}

