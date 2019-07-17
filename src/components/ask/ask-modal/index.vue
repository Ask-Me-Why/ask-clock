<template>
    <div class="ask-modal-box" :style="style" @click="shadeClickClose">
        <transition :name="transition" @after-enter="afterEnter" @after-leave="afterLeave">
            <div class="ask-modal-wrapper" @click.stop="''" v-if="show" :style="{width}">
                <div class="ask-modal-header" v-if="showHeader">
                    <div class="ask-modal-title" v-if="title">{{title}}</div>
                    <div class="ask-close-icon" v-if="showClose" @click="close">
                        <span class="icon"></span>
                    </div>
                </div>
                <div class="ask-modal-body">
                    <slot></slot>
                </div>
                <div class="ask-modal-footer" v-if="showFooter">
                    <slot name="footer">
                        <ask-button text="关闭" @ask-click="close"></ask-button>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import askOverlay from '../ask-overlay/ask.overlay.js';
let TIMER_CLOSE = null;
export default {
    name: 'AskModal',
    props: {
        show: {
            type: Boolean,
            default: false // 是否显示，默认不显示
        },
        showHeader: {
            type: Boolean,
            default: true // 是否显示头部，默认显示
        },
        showFooter: {
            type: Boolean,
            default: true // 是否显示底部，默认显示
        },
        title: {
            type: String,
            default: '' // 是否有标题，默认没有
        },
        showClose: {
            type: Boolean,
            default: true // 是否显示关闭icon,默认显示
        },
        shade: {
            type: Number,
            default: 0.4 // 遮罩层透明度
        },
        shadeColor: {
            type: String,
            default: '#000' // 遮罩层颜色
        },
        shadeClick: {
            type: Boolean,
            default: true // 是否可以点击触发关闭事件
        },
        beforeClose: {
            type: Function,
            default: null
        },
        afterClose: {
            type: Function,
            default: null
        },
        transition: {
            type: String,
            default: 'ask-modal-fill' // 弹框进场和离场样式名
        },
        time: {
            type: Number,
            default: null
        },
        width: {
            type: String
        }
    },
    data() {
        return {
            zIndex: null,
            theme: '',
            currentChange: false
        };
    },
    computed: {
        style() {
            return {
                'z-index': this.zIndex === null ? 'auto' : this.zIndex,
                'pointer-events': this.show ? 'auto' : 'none'
            };
        }
    },
    methods: {
        shadeClickClose() {
            if (this.shadeClick) {
                this.close();
            }
        },
        close() {
            if (TIMER_CLOSE) clearTimeout(TIMER_CLOSE);
            if (this.beforeClose && Object.prototype.toString.call(this.beforeClose) === '[object Function]') {
                this.beforeClose(this.closeModal);
            } else {
                this.closeModal();
            }
        },
        closeModal() {
            this.$emit('update:show', false);
        },
        afterEnter() {
            this.$emit('open');
        },
        afterLeave() {
            this.$nextTick(function() {
                this.$el.remove && this.$el.remove();
                this.afterClose && this.afterClose(this);
                askOverlay.close(this, 'des');
            });
        },
        open() {
            if (this.time != null) {
                TIMER_CLOSE = setTimeout(() => {
                    this.close();
                }, this.time);
            }
            askOverlay.open(this);
            document.body.appendChild(this.$el);
            this.$emit('update:show', true);
        }
    },
    mounted() {
        if (this.show) {
            this.open();
        }
    },
    destroyed() {
        this.$nextTick(function() {
            askOverlay.close(this, 'des');
        });
    },
    watch: {
        show: function(n, o) {
            if (n) {
                this.open();
            } else {
                this.close();
                this.$emit('close');
            }
        }
    }
};
</script>
