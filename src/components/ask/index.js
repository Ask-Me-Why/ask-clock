import './ask-theme/index.scss';

// BASIC 按钮控件
import AskButton from './ask-button';
import AskRipple from './ask-ripple';

// 模态框控件
import AskModal from './ask-modal';
// Loader
import AskLoader from './ask-loader/index.vue';

const components = {
    AskButton,
    AskRipple,
    AskModal,
    AskLoader
};
export default {
    install(Vue) {
        Object.keys(components).forEach((key) => Vue.component(key, components[key]));
    }
};
