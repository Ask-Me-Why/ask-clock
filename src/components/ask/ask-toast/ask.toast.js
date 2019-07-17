import Vue from 'vue';
import ComponentTemplate from './ask-toast.vue';
const VueComponent = Vue.extend(ComponentTemplate);

export const askToast = (option, onClose) => {
    let opt = {
        msg: 'toast',
        class: '', // success|info|danger
        time: 3000,
        position: 'center' // top-left|top-right|top-center|bottom-left|bottom-right|bottom-center
    };
    opt = Object.assign(opt, option);
    opt.time = parseInt(opt.time, 10);
    let toastPromise = toast.init(opt, onClose);
    return toastPromise;
};
const TOAST_TRANSITION_DURATION = 500;
const toast = {
    container: false,
    instances: [],
    init(opt, onClose) {
        let instance = this.creatToast(opt);

        if (!instance || this.instances.indexOf(instance) !== -1) return;
        if (this.instances.length === 0) {
            this.creatBox(opt.position);
        }
        let onlyKey = Date.now();
        this.instances.push(onlyKey);
        return new Promise((resolve, reject) => {
            if (isNaN(opt.time)) reject(Error('time必须是整数'));
            this.changePosition(opt.position);
            this.onClose = onClose;
            this.appendToast(instance, opt, onlyKey, resolve);
        });
    },
    creatBox(position) {
        let vm = this.container = new VueComponent().$mount();
        vm.$el.classList.add(position);
        document.body.appendChild(vm.$el);
    },
    creatToast(opt) {
        let instance = document.createElement('div');

        instance.classList.add('ask-toast-message', 'ask-toast-theme-' + (opt.class === '' ? 'default' : opt.class));
        let _msg = opt.msg === '' ? 'toast' : opt.msg;
        instance.innerHTML = _msg;
        return instance;
    },
    changePosition(position) {
        let _el = this.container.$el;
        if (_el.classList.item(1) !== position) {
            _el.classList.remove(_el.classList.item(1));
            _el.classList.add(position);
        }
    },
    appendToast(instance, opt, onlyKey, resolve) {
        instance.style.transitionDuration = `${TOAST_TRANSITION_DURATION}ms`;
        instance.style.transform = 'translateY(30px)';
        instance.style.opacity = '0';
        this.container.$el.appendChild(instance);
        window.getComputedStyle(instance).getPropertyValue('opacity');
        instance.style.transform = 'translateY(0px)';
        instance.style.opacity = '1';

        let timer = setTimeout(() => {
            this.removeToast(instance, onlyKey, resolve);
            this.onClose && this.onClose();
            clearTimeout(timer);
        }, TOAST_TRANSITION_DURATION + opt.time);
    },
    removeToast(instance, onlyKey, resolve) {
        let index = this.instances.indexOf(onlyKey);

        if (index === -1) return;

        instance.style.transitionDuration = `${TOAST_TRANSITION_DURATION}ms`;
        instance.style.transform = 'translateY(-30px)';
        instance.style.opacity = '0';

        let timer = setTimeout(() => {
            clearTimeout(timer);
            resolve('close');
            this.instances = this.instances.filter(index => {
                return index !== onlyKey;
            });
            if (this.instances.length === 0) {
                this.container.$el.remove();
            }
            instance.remove();
        }, TOAST_TRANSITION_DURATION);
    }
};
