import importTemplate from '../../util/importTemplate.js';

export default {
  data() {
    return { count: 0 }
  },
  template: await importTemplate('components/login/login.html')
}

