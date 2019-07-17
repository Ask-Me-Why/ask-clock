<template>
    <!-- <transition name="ask-overlay-fade" @after-leave="afterLeave"> -->
    <div class="ask-overlay-box" @click="handlerClick" :style="style" v-if="show"></div>
    <!-- </transition> -->
</template>
<style src="./ask-overlay.scss" lang="scss"></style>
<script>
import { getZIndex } from '../utils/getZIndex.js';
export default {
    props: {
        opacity: {
            type: Number,
            default: 0.4
        },
        color: {
            type: String,
            default: '#000'
        },
        setZIndex: {
            type: Number,
            default: null
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handlerClick() {
            console.log(233);
            this.$emit('overlayClick');
        },
        afterLeave() {
            // if (this.$el.remove) this.$el.remove();
            // this.$destroy();
        }
    },
    destroyed() {
        // this.$nextTick(function() {
        //  if (this.$el.remove) this.$el.remove();
        //  this.$destroy();
        // })
    },
    computed: {
        zIndex() {
            return getZIndex();
        },
        style() {
            return {
                'opacity': this.opacity,
                'background-color': this.color,
                'z-index': this.setZIndex === null ? this.zIndex : this.setZIndex
            };
        }
    }
};

</script>
