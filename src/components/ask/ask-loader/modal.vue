<style lang="scss" scoped>
@import '~@/styles/mixins', '~@/styles/variables';
.ask-modal-box {
    @include flexLayout(flex,center,center);
    ::v-deep {
        .ask-modal-wrapper{
            max-height: none;
            box-shadow: none;
            position: relative;
            overflow: visible;
            background: $color-default-0;
            width: .5rem;
            height: .5rem;
            border-radius: .05rem;
        }
        .ask-modal-body{
            width: 100%;
            height: 100%;
            padding: 0;
        }
        .ask-loader{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
<template>
    <ask-modal :show.sync="show" :showHeader="false" :showFooter="false" :shadeClick="false" transition>
        <ask-loader/>
    </ask-modal>
</template>
<script>
export default {
    name: 'AskLoaderM',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: 'green'
        },
        indeterminate: {
            type: Boolean,
            default: true
        },
        rotate: {
            type: [String, Number],
            default: 0
        },
        size: {
            type: [String, Number],
            default: 32
        },
        value: {
            type: [String, Number],
            default: 0
        },
        width: {
            type: [String, Number],
            default: 4
        }
    }
};

</script>
