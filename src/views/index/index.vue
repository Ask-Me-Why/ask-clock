<style src="./index.scss" lang="scss" scoped></style>
<template>
    <div class="clock-index-box" ref="svgBoxRef">
        <svg>
            <defs>
                <linearGradient id="Gradient" x1="1" y1=".2" x2=".2" y2="0">
                    <!-- <stop offset="0%" stop-color="#292929"/>
                    <stop offset="100%" stop-color="#292929"/> -->
                    <stop offset="0%" stop-color="#9ED3E3"/>
                    <stop offset="50%" stop-color="#9ED3E3"/>
                    <stop offset="50%" stop-color="#F5E3E3"/>
                    <stop offset="100%" stop-color="#F5E3E3"/>
                </linearGradient>
                <svg viewBox="0 0 200 200" id="wdw">
                    <path d="M20 0 h 80 v 40 L70 70 v 60 Z" stroke-width="4" fill="none"/>
                </svg>

            </defs>
            <!-- <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient)" /> -->
            <!-- <use xlink:href="#wdw" x="0" y="0" width="200" height="200" stroke="pink"/> -->
        </svg>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { AskClock } from './clock';

export default {
    name: 'Index',
    components: {
        // AskLoader
    },
    data() {
        return {
            coinGrain: null,
            user: {
                id: '',
                name: '',
                type: '',
                inviteCode: '',
                assets: [{
                    type: 'ebt',
                    value: '0'
                }, {
                    type: 'eos',
                    value: '0'
                }],
                canReceiveAward: false
            },
            rankings: []
        };
    },

    computed: {
        ...mapState({
            ajaxLoader: state => state.ajaxLoader
        })
    },
    watch: {
        ajaxLoader(val) {
            this.$askLoader(val);
        }
    },
    created() {
        // 0123456789零一二三四五六七八九十点时分秒年月日周星期
    },
    async mounted() {
        this.$nextTick(() => {
            new AskClock({
                el: this.$refs.svgBoxRef
            });
        });
    },
    methods: {
        async initRankings() {
            const { data: resCode } = await this.$server['rankings']({});
            this.rankings = resCode.data.map(cur => {
                return {
                    name: cur.name,
                    total: cur.total
                };
            });
        }
    }
};

</script>
