import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import DisableAutocomplete from "vue-disable-autocomplete";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDumpster } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

library.add(faDumpster);
library.add(faXmark);
library.add(faPen);
library.add(faCircleNotch);
library.add(faArrowRightFromBracket);

createApp(App)
.use(router)
.use(DisableAutocomplete)
.component('font-awesome-icon', FontAwesomeIcon)
.mount("#app");
