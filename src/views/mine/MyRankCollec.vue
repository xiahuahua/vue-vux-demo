<template>
    <div id="myrankcollec">
        <group>
            <cell :value="value.num" :title="value.title" v-for="(value,index) in collectlist">
                <img slot="icon" src="../../assets/image/ic_rankhead.png"/>
                <img slot="icon" v-if="index==0" src="../../assets/image/ic_gold.png"/>
                <img slot="icon" v-else-if="index==1" src="../../assets/image/ic_sliver.png"/>
                <img slot="icon" v-else-if="index==2" src="../../assets/image/ic_copper.png"/>
                <div slot="child" class="xuhao" v-else>{{index+1}}</div>
            </cell>
        </group>
    </div>
</template>
<style lang="less">
    #myrankcollec {
        .weui-cell__hd{
            display: flex;
            flex-direction: row-reverse;
            width: 80px;
            img{
                height: 30px;
                margin-right: 10px;
            }
        }
        .xuhao{
            position: absolute;
            left: 10px;
            width: 36px;
            font-size: 12px;
            text-align: center;
            color:rgba(0,0,0,0.8);
        }
        .vux-cell-primary{
            display: flex;
            .vux-label{
                font-size: 15px;
                color: rgba(0,0,0,0.9);
            }
        }
        .vux-no-group-title{
            margin-top: 40px;
        }
        .weui-cell__ft{
            width:40px;
            font-size: 12px;
            color:rgba(0,0,0,0.8);
        }
        .weui-cell{
            padding:12px;
        }
        .weui-cell:before{
            left: 16px;
            right: 16px;
        }
        .weui-cells:before{
            border-top: 0.0625rem solid #ffffff;
        }
        .weui-cells:after{
            left: 16px;
            right: 16px;
        }
        .vux-label-desc{
            padding-right: 0px;
        }
    }
    #myrankcollec >div{
        padding-top: 1px;
    }

</style>
<script>
    import {Group,Cell} from "vux";
    import axios from 'axios'
    export default {
        components: {
            Cell,
            Group},
        name:'MyRankCollec',
        data(){
          return{
              collectlist:[]
          }
        },
        created(){
            this.getCollections();
        },
        methods:{
            getCollections(){
                var that=this;
                var info={type:'SC'};
                axios.get('/xqjyw/zixun/findPaihang',{params:info})
                    .then(function (response){
                        that.collectlist=response.data.result;
                        console.log(response.data.result);
                    })
            }
        }
    }
</script>
