<template>
    <div class="ask-loader">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715" style="transform: rotate(0deg);">
            <circle fill="transparent" cx="45.714285714285715" cy="45.714285714285715" r="20" stroke-width="5.714285714285714" :stroke="color" stroke-dasharray="125.664" stroke-dashoffset="125.66370614359172px" class="v-progress-circular__overlay"></circle>
        </svg>
    </div>
</template>
<script >
export default {
        name: 'AskLoader',
        props: {
            color: {
                type: String,
                default: '#1867c0'
            }
        }
};
</script>
