<template>
    <div class="page-component-up" v-show="show" @click="handleBackTop">
        <i class='tri'></i>
    </div>
</template>

<script>
    export default {
        name: "back-top",
        data() {
            return {
                show: false,
                timer: ''
            }
        },
        mounted() {
            document.addEventListener('scroll', this.handleToggle, false);
        },
        beforeDestroy() {
            document.removeEventListener('scroll', this.handleToggle);
        },
        methods: {
            handleToggle() {
                const y = document.body.scrollTop || document.documentElement.scrollTop;
                if (y > 100) {
                    this.show = true;
                } else {
                    this.show = false;
                }
            },
            handleBackTop() {
                clearInterval(this.timer);
                this.timer = setInterval(function () {
                    const now = document.body.scrollTop || document.documentElement.scrollTop;
                    if (now === 0) {
                        clearInterval(this.timer);
                        return;
                    }
                    const speed = Math.floor(-now / 10);
                    document.body.scrollTop = document.documentElement.scrollTop = now + speed;
                }.bind(this), 15)
            }
        }
    }
</script>

<style lang="less">
    .page-component-up {
        background-color: #72bff3;
        position: fixed;
        right: 15px;
        bottom: 70px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        cursor: pointer;
        opacity: .5;
        transition: .3s;
        text-align: center;
        z-index: 999;
    }

    .tri {
        width: 0;
        height: 0;
        border: 12px solid transparent;
        border-bottom-color: #dfe6ec;
        text-align: center;
    }
</style>