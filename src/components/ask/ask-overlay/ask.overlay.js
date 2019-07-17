import { getZIndex } from '../utils/getZIndex.js';
import Vue from 'vue';
import ComponentTemplate from './ask-overlay.vue';
const VueComponent = Vue.extend(ComponentTemplate);
let TIMER = null;
const askOverlay = {
    instances: [],
    overlay: false,
    open(instance) {
        /* 检测实例是否有传递过来或者实例是否存在 */
        if (!instance || this.instances.indexOf(instance) !== -1) return;
        if (this.overlay === false) {
            this.creatOverlay(instance.shadeColor, instance.shade);
        } else {
            this.overlay.show = true;
        }
        this.instances.push(instance);
        this.changeOverlayStyle(instance);
    },
    closeAll() {
        if (this.instances.length === 0) return;
        this.instances.map(index => {
            index.close();
            index.$el.remove && index.$el.remove();
            this.close(index);
        });
    },
    close(instance, type) {
        let index = this.instances.indexOf(instance);

        if (index === -1) return;

        instance.$nextTick(() => {
            /* if (this.instances.length === 1) {
                this.closeOverlay();
            }
            if(type === 'des') {
                this.instances.splice(index, 1);
                this.changeOverlayStyle();
            } */
            this.instances.splice(index, 1);

            if (this.instances.length === 0) {
                this.closeOverlay();
            }
            this.changeOverlayStyle(this.instances[this.instances.length - 1]);
        });
    },
    creatOverlay(color, opacity) {
        let vm = this.overlay = new VueComponent().$mount();
        vm.opacity = opacity;
        vm.color = color;
        vm.$on('overlayClick', () => {
            this.handlerOverlayClick();
        });
        this.bodyStyle = {
            overflow: document.body.style.overflow,
            width: document.body.style.width,
            height: document.body.style.height,
            position: document.body.style.position
        };

        // document.body.style.position = "fixed";
        // document.body.style.width = "100vw";
        // document.body.style.height = "100vh";
        //
        document.body.style.overflow = 'hidden';
        document.body.appendChild(vm.$el);
        vm.show = true;
    },
    closeOverlay() {
        if (!this.overlay) return;
        document.body.style.position = this.bodyStyle.position;
        document.body.style.width = this.bodyStyle.width;
        document.body.style.height = this.bodyStyle.height;
        document.body.style.overflow = this.bodyStyle.overflow;
        this.overlay.show = false;
        // this.overlay = null;
    },
    changeOverlayStyle(instance) {
        if (!this.overlay || this.instances.length === 0) return;
        this.overlay.color = instance.shadeColor;
        this.overlay.opacity = instance.shade;
        this.overlay.setZIndex = getZIndex();
        instance.zIndex = getZIndex();
    },
    handlerOverlayClick() {
        if (this.instances.length === 0) return;
        const instance = this.instances[this.instances.length - 1];
        if (!instance.shadeClick && instance.show) {
            instance.$el.classList.add('ask-on-foucs');

            TIMER = setTimeout(() => {
                if (TIMER) clearTimeout(TIMER);
                if (instance.$el.classList.contains('ask-on-foucs')) {
                    instance.$el.classList.remove('ask-on-foucs');
                }
            }, 300);
            return;
        }
        if (instance.close && instance.show) {
            instance.close();
        }
    }
};

export default askOverlay;
