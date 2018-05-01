<template>
  <div class="accept-container">
    <iframe id="show-iframe" frameborder=0 name="showHere" scrolling=auto src=""></iframe>


  </div>
</template>

<script>
  export default {
    name: "iframe",
    data() {
      return {
      }
    },
    mounted() {
      console.log(this.$route.query.url);
      let _url = this.$route.query.url;
      const oIframe = document.getElementById('show-iframe');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = deviceWidth + 'px';
      oIframe.style.height = deviceHeight + 'px';
      oIframe.setAttribute('src',_url);
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
