<template>
    <div class="ask-ripple-link"></div>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: 'rgba(0,0,0,1)'
        },
        triggerEvents: {
            required: true
        },
        ripple: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isMouseDown: false,
            RIPPLE_FADE_IN_DURATION: 450,
            RIPPLE_FADE_OUT_DURATION: 400,
            rippleRefs: []
        };
    },
    methods: {
        initialize() {
            this.triggerEvents.addEventListener('mousedown', this.onMousedown);
            this.triggerEvents.addEventListener('mouseup', this.onMouseup);
            this.triggerEvents.addEventListener('mouseleave', this.onMouseLeave);
        },
        onMousedown(event) {
            if (this.ripple) {
                this.isMouseDown = true;
                this.fadeInRipple(event.pageX, event.pageY);
            }
        },
        onMouseLeave() {
            if (this.isMouseDown) {
                this.onMouseup();
            }
        },
        onMouseup() {
            this.isMouseDown = false;
            this.rippleRefs.map(index => {
                if (index.state === 'VISIBLE') {
                    this.fadeOutRipple(index);
                }
            });
        },
        fadeInRipple(pageX, pageY) {
            let container = this.$el.getBoundingClientRect();
            let scrollPosition = this.getViewportScrollPosition();

            pageX -= scrollPosition.left;
            pageY -= scrollPosition.top;
            let radius = this.distanceToFurthestCorner(pageX, pageY, container);
            let duration = this.RIPPLE_FADE_IN_DURATION;
            let offsetX = pageX - container.left;
            let offsetY = pageY - container.top;

            let ripple = document.createElement('div');
            ripple.classList.add('ask-ripple-element');

            ripple.style.left = `${offsetX - radius}px`;
            ripple.style.top = `${offsetY - radius}px`;
            ripple.style.height = `${radius * 2}px`;
            ripple.style.width = `${radius * 2}px`;

            if (this.color) {
                ripple.style.backgroundColor = this.color;
            }
            ripple.style.transitionDuration = `${duration}ms`;

            this.$el.appendChild(ripple);
            this.enforceStyleRecalculation(ripple);

            ripple.style.transform = 'scale(1)';
            let rippleRef = {
                state: 'HIDDEN',
                element: ripple
            };
            rippleRef.state = 'FADING_IN';
            this.rippleRefs.push(rippleRef);
            let timer = setTimeout(() => {
                clearTimeout(timer);
                rippleRef.state = 'VISIBLE';
                if (!this.isMouseDown) {
                    this.fadeOutRipple(rippleRef);
                }
            }, duration);
        },
        fadeOutRipple(rippleRef) {
            let rippleEl = rippleRef.element;
            rippleEl.style.transitionDuration = `${this.RIPPLE_FADE_OUT_DURATION}ms`;
            rippleEl.style.opacity = '0';
            rippleRef.state = 'FADING_OUT';
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (rippleEl.parentNode) {
                    rippleRef.state = 'HIDDEN';
                    this.rippleRefs.splice(0, 1);
                    rippleEl.parentNode.removeChild(rippleEl);
                }
            }, this.RIPPLE_FADE_OUT_DURATION);
        },
        distanceToFurthestCorner(x, y, rect) {
            const distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right));
            const distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
            return Math.sqrt(distX * distX + distY * distY);
        },
        enforceStyleRecalculation(element) {
            // 让浏览器强制重新布局
            window.getComputedStyle(element).getPropertyValue('opacity');
        },
        getViewportScrollPosition(documentRect) {
            if (!documentRect) {
                documentRect = this._cacheViewportGeometry();
            }

            // The top-left-corner of the viewport is determined by the scroll position of the document
            // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
            // whether `document.body` or `document.documentElement` is the scrolled element, so reading
            // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
            // `document.documentElement` works consistently, where the `top` and `left` values will
            // equal negative the scroll position.
            const top = -documentRect.top || document.body.scrollTop || window.scrollY ||
                document.documentElement.scrollTop || 0;

            const left = -documentRect.left || document.body.scrollLeft || window.scrollX ||
                document.documentElement.scrollLeft || 0;

            return { top, left };
        },
        _cacheViewportGeometry() {
            return document.documentElement.getBoundingClientRect();
        }
    },
    destroyed() {
        this.$nextTick(function() {
            this.triggerEvents.removeEventListener('mousedown', this.onMousedown);
            this.triggerEvents.removeEventListener('mouseup', this.onMouseup);
            this.triggerEvents.removeEventListener('mouseleave', this.onMouseLeave);
        });
    },
    watch: {
        triggerEvents: function(n, o) {
            if (n) {
                this.initialize();
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.triggerEvents) {
                this.initialize();
            }
        });
    }
};

</script>
