<template>
    <div id="myranksubscibe">
        <group>
            <!--<cell :value="item.num" :title="item.lanmuName" v-for="item in subscibelist">-->
            <cell :value="value.num" :title="value.lanmuName" v-for="(value,index) in subscibelist">
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
    #myranksubscibe >div{
        padding-top: 1px;
    }

    #myranksubscibe {
        .weui-cell__hd{
            display: flex;
            flex-direction: row-reverse;
            width: 80px;
            img{
                height: 30px;
                margin-right: 10px;
            }
        }
        .vux-no-group-title{
            margin-top: 40px;
        }
        .vux-label{
            font-size: 15px;
            color: rgba(0,0,0,0.9);
        }
        .vux-cell-primary{
            display: flex;
        }
        .xuhao{
            width: 36px;
            position: absolute;
            left: 10px;
            top:0;
            bottom: 0;
            font-size: 12px;
            color:rgba(0,0,0,0.8);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .weui-cell{
            padding:16px;
        }
        .weui-cell:before{
            left: 16px;
            right: 16px;
        }
        .weui-cell__ft{
            width:40px;
            font-size: 12px;
            color:rgba(0,0,0,0.8);
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
</style>
<script>
    import {Group,Cell} from "vux";
    import axios from 'axios'

    export default {
        components: {
            Cell,
            Group},
        name:'MyRankSubscibe',
        data(){
            return{
                subscibelist:[]
            }
        },
        created(){
            this.getSubscibeList();
        },
        methods:{
            getSubscibeList(){
                var that=this;
                var info={type:'DY'};
                axios.get('/xqjyw/zixun/findPaihang',{params:info})
                    .then(function (response){
                        that.subscibelist=response.data.result;
                    })
            }
        }
    }
</script>