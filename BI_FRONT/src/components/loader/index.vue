<template>
  <transition name="fade">
    <div class="loader_wrap" v-if="loading" style="z-index:9999">
      <span class="loader">
        <img :src="imageSrc">
      </span>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'loader',
    data() {
      return {
        show: false,
        loading: 0,
        imageSrc: null
      }
    },
    created() {
      this.imageSrc = require('@/assets/images/spinnerS.gif')

      axios.interceptors.request.use(config => {
        if (config && config.url && config.url.toUpperCase().indexOf('LOADINGIGNORE') < 0) {
          this.loading++
          document.activeElement && document.activeElement.blur()
        }
        return config
      })
      axios.interceptors.response.use(response => {
        if (response && response.config && response.config.url && response.config.url.toUpperCase().indexOf('LOADINGIGNORE') < 0) {
          this.loading--
          if (this.loading < 0)
            this.loading = 0
        }
        return response
      }, error => {
        console.log('error', error)
        if (error && error.config && error.config.url && error.config.url.toUpperCase().indexOf('LOADINGIGNORE') < 0) {
          this.loading--
        } else if (!error.config) {
          this.loading--
        }
        if (this.loading < 0)
          this.loading = 0
        return Promise.reject(error)
      })
    }
  }
</script>

<style>
  /* loader */
  .loader_wrap{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:9999;
    background-color: rgba(0, 0, 0, .3);
  }
  .loader_wrap .loader{
    display:block; position:absolute;
    left:50%;
    top:50%;
    transform:translateX(-50%) translateY(-50%);
    width:100px;
    height:100px;
    text-align:center;
  }

  .loader_wrap .loader:after {
    content: "";
    display: block;
    position: absolute;
    left:50%;
    top:50%;
    transform:translateX(-50%) translateY(-50%);
    width: 70px;
    height: 70px;
    background-color: rgba(255,255,255,.9);
    border-radius: 50%;
  }

  .fade-enter-active {
    transition: opacity .5s;
    transition-delay: .5s;
  }

  .fade-leave-active {
    transition: opacity .2s;
    transition-delay: 0s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
