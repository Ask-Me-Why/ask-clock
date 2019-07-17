<template>
    <button :type="type" class="ask-button" :class="[color,{'is-icon':icon},{'is-entity':entity}]" @click="handlerClick($event)" ref="buttonEvent">
        <slot>
            <span class="button-text" v-if="text">
                {{text}}
            </span>
        </slot>
        <div class="ask-button-focus-overlay" v-if="hover"></div>
        <ask-ripple :color="rippleColor" :triggerEvents="rippleEvent" :ripple="ripple"></ask-ripple>
    </button>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'button'
        },
        text: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        ripple: {
            type: Boolean,
            default: true
        },
        hover: {
            type: Boolean,
            default: true
        },
        entity: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Boolean,
            default: false
        },
        rippleColor: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            rippleEvent: ''
        };
    },
    mounted() {
        this.rippleEvent = this.$refs.buttonEvent;
    },
    methods: {
        handlerClick(event) {
            event.target.blur && event.target.blur();
            this.$emit('click', event);
        }
    }
};

</script>
