<template>
  <div id="demo" class="cropperImg">
    <!-- 遮罩层 -->
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>
      <button type="button" id="button" @click="crop">确定</button>
    </div>
    <div>
        <div class="show" style="height:64px;width:64px;">
          <div class="picture" :style="'backgroundImage:url('+headerImage+')'" style="height:64px;width:64px;">
          </div>
        </div>
        <div style="opacity:0;width:360px;position:absolute;top:0;right:0;left:0;height:100%;">
          <input type="file" id="change" accept="image" @change="change" style="display:block;position:absolute;top:0;bottom:0;left:16px;margin:auto;height:64px;width:64px;
          border-radius:50%;">
          <label for="change"></label>
        </div>
    </div>
  </div>
</template>
 <style type="text/css">
   #demo #button {  
  position: absolute;  
  right: 10px;  
  top: 10px;  
  width: 80px;  
  height: 40px;  
  border:none;  
  border-radius: 5px;  
  background:white;  
}  
#demo .show {  
  width: 100px;  
  height: 100px;  
  overflow: hidden;  
  position: absolute;  
  border-radius: 50%;  
  border: 1px solid #d5d5d5;
  top: 0px;
  bottom: 0px;
  left: 16px;
  margin: auto;
}  
#demo .picture {  
  width: 100%;  
  height: 100%;  
  overflow: hidden;  
  background-position: center center;  
  background-repeat: no-repeat;  
  background-size: cover;   
}  
#demo .container {  
    z-index: 99;  
    position: fixed;  
    padding-top: 60px;  
    left: 0;  
    top: 0;  
    right: 0;  
    bottom: 0;  
    background:rgba(0,0,0,1);  
}  
  
#demo #image {  
  max-width: 100%;  
}  
  
.cropper-view-box,.cropper-face {  
  border-radius: 50%;  
}  
/*!  
 * Cropper.js v1.0.0-rc  
 * https://github.com/fengyuanchen/cropperjs  
 *  
 * Copyright (c) 2017 Fengyuan Chen  
 * Released under the MIT license  
 *  
 * Date: 2017-03-25T12:02:21.062Z  
 */  
  
.cropper-container {  
  font-size: 0;  
  line-height: 0;  
  
  position: relative;  
  
  -webkit-user-select: none;  
  
     -moz-user-select: none;  
  
      -ms-user-select: none;  
  
          user-select: none;  
  
  direction: ltr;  
  -ms-touch-action: none;  
      touch-action: none  
}  
  
.cropper-container img {  
  /* Avoid margin top issue (Occur only when margin-top <= -height) */  
  display: block;  
  min-width: 0 !important;  
  max-width: none !important;  
  min-height: 0 !important;  
  max-height: none !important;  
  width: 100%;  
  height: 100%;  
  image-orientation: 0deg  
}  
  
.cropper-wrap-box,  
.cropper-canvas,  
.cropper-drag-box,  
.cropper-crop-box,  
.cropper-modal {  
  position: absolute;  
  top: 0;  
  right: 0;  
  bottom: 0;  
  left: 0;  
}  
  
.cropper-wrap-box {  
  overflow: hidden;  
}  
  
.cropper-drag-box {  
  opacity: 0;  
  background-color: #fff;  
}  
  
.cropper-modal {  
  opacity: .5;  
  background-color: #000;  
}  
  
.cropper-view-box {  
  display: block;  
  overflow: hidden;  
  
  width: 100%;  
  height: 100%;  
  
  outline: 1px solid #39f;  
  outline-color: rgba(51, 153, 255, 0.75);  
}  
  
.cropper-dashed {  
  position: absolute;  
  
  display: block;  
  
  opacity: .5;  
  border: 0 dashed #eee  
}  
  
.cropper-dashed.dashed-h {  
  top: 33.33333%;  
  left: 0;  
  width: 100%;  
  height: 33.33333%;  
  border-top-width: 1px;  
  border-bottom-width: 1px  
}  
  
.cropper-dashed.dashed-v {  
  top: 0;  
  left: 33.33333%;  
  width: 33.33333%;  
  height: 100%;  
  border-right-width: 1px;  
  border-left-width: 1px  
}  
  
.cropper-center {  
  position: absolute;  
  top: 50%;  
  left: 50%;  
  
  display: block;  
  
  width: 0;  
  height: 0;  
  
  opacity: .75  
}  
  
.cropper-center:before,  
  .cropper-center:after {  
  position: absolute;  
  display: block;  
  content: ' ';  
  background-color: #eee  
}  
  
.cropper-center:before {  
  top: 0;  
  left: -3px;  
  width: 7px;  
  height: 1px  
}  
  
.cropper-center:after {  
  top: -3px;  
  left: 0;  
  width: 1px;  
  height: 7px  
}  
  
.cropper-face,  
.cropper-line,  
.cropper-point {  
  position: absolute;  
  
  display: block;  
  
  width: 100%;  
  height: 100%;  
  
  opacity: .1;  
}  
  
.cropper-face {  
  top: 0;  
  left: 0;  
  
  background-color: #fff;  
}  
  
.cropper-line {  
  background-color: #39f  
}  
  
.cropper-line.line-e {  
  top: 0;  
  right: -3px;  
  width: 5px;  
  cursor: e-resize  
}  
  
.cropper-line.line-n {  
  top: -3px;  
  left: 0;  
  height: 5px;  
  cursor: n-resize  
}  
  
.cropper-line.line-w {  
  top: 0;  
  left: -3px;  
  width: 5px;  
  cursor: w-resize  
}  
  
.cropper-line.line-s {  
  bottom: -3px;  
  left: 0;  
  height: 5px;  
  cursor: s-resize  
}  
  
.cropper-point {  
  width: 5px;  
  height: 5px;  
  
  opacity: .75;  
  background-color: #39f  
}  
  
.cropper-point.point-e {  
  top: 50%;  
  right: -3px;  
  margin-top: -3px;  
  cursor: e-resize  
}  
  
.cropper-point.point-n {  
  top: -3px;  
  left: 50%;  
  margin-left: -3px;  
  cursor: n-resize  
}  
  
.cropper-point.point-w {  
  top: 50%;  
  left: -3px;  
  margin-top: -3px;  
  cursor: w-resize  
}  
  
.cropper-point.point-s {  
  bottom: -3px;  
  left: 50%;  
  margin-left: -3px;  
  cursor: s-resize  
}  
  
.cropper-point.point-ne {  
  top: -3px;  
  right: -3px;  
  cursor: ne-resize  
}  
  
.cropper-point.point-nw {  
  top: -3px;  
  left: -3px;  
  cursor: nw-resize  
}  
  
.cropper-point.point-sw {  
  bottom: -3px;  
  left: -3px;  
  cursor: sw-resize  
}  
  
.cropper-point.point-se {  
  right: -3px;  
  bottom: -3px;  
  width: 20px;  
  height: 20px;  
  cursor: se-resize;  
  opacity: 1  
}  
  
@media (min-width: 768px) {  
  
  .cropper-point.point-se {  
    width: 15px;  
    height: 15px  
  }  
}  
  
@media (min-width: 992px) {  
  
  .cropper-point.point-se {  
    width: 10px;  
    height: 10px  
  }  
}  
  
@media (min-width: 1200px) {  
  
  .cropper-point.point-se {  
    width: 5px;  
    height: 5px;  
    opacity: .75  
  }  
}  
  
.cropper-point.point-se:before {  
  position: absolute;  
  right: -50%;  
  bottom: -50%;  
  display: block;  
  width: 200%;  
  height: 200%;  
  content: ' ';  
  opacity: 0;  
  background-color: #39f  
}  
  
.cropper-invisible {  
  opacity: 0;  
}  
  
.cropper-bg {  
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');  
}  
  
.cropper-hide {  
  position: absolute;  
  
  display: block;  
  
  width: 0;  
  height: 0;  
}  
  
.cropper-hidden {  
  display: none !important;  
}  
  
.cropper-move {  
  cursor: move;  
}  
  
.cropper-crop {  
  cursor: crosshair;  
}  
  
.cropper-disabled .cropper-drag-box,  
.cropper-disabled .cropper-face,  
.cropper-disabled .cropper-line,  
.cropper-disabled .cropper-point {  
  cursor: not-allowed;  
}  

 </style>
<script>
import Cropper from 'cropperjs'  //引入插件
export default {
  props:{ 
    headerImage:{   //从user.vue父组件传过来数据库图片，即用户从本地上传的图片
      type:String,
      default:''
    }
  },
  data () {
    return {
      picValue:'',
      cropper:'',
      croppable:false,
      panel:false,
      url:'',
      postHeaderImg:''
    }
  },
  mounted () {
    //初始化这个裁剪框
    var self = this;
    var image = document.getElementById('image');
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background:false,
      zoomable:false,
      ready: function () {
        self.croppable = true;
      }
    });
  },
  methods: {
    getObjectURL (file) {
      var url = null ;
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
    },
    change (e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.panel = true;
      this.picValue = files[0];
       
      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if(this.cropper){
        this.cropper.replace(this.url);
      }
      this.panel = true;
    },
    crop () {
        this.panel = false;
        var croppedCanvas;
        var roundedCanvas;
 
        if (!this.croppable) {
          return;
        }
        // Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        console.log(this.cropper)
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);
 
        this.postHeaderImg = roundedCanvas.toDataURL();
        //传递给父组件
        this.$emit('getHeaderImage',roundedCanvas.toDataURL());
 
        this.postImg()//上传图片
         
    },
    getRoundedCanvas (sourceCanvas) {
       
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;
      //为了每张图片的大小不超过50k,所以不论裁剪多大，最后上传的，最大宽度不超过90。
      if(width > 90){
        width = 90
      }
      if(height > 90){
        height = 90
      }
       
      canvas.width = width;
      canvas.height = height;
 
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
 
      return canvas;
    },
    postImg () {
      this.$http.post(
        this.http_h + "bp/user/uploadHeadImage",
        {
          fieldName:this.postHeaderImg
        },
      ).then((res)=>{
        let response = res.body;
        if(response.code == 200){
          this.$vux.toast.show({
            type:"success",
            text: "上传头像成功",
            time:1000
          })
        }else{
          this.$vux.toast.show({
            type:"text",
            text: response.message,
            time:1000
          })
        }
      });
    }
  }
}
</script>