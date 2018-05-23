<template>
    <div>
        <swiper :list="imgs" auto style="width:100%;margin:0 auto;" height="120px" dots-class="custom-bottom"
                dots-position="center"></swiper>
        <cell v-for="x in Objlist" :title="x.name" :link="{path: '/newsdetail',query:{id:x.id,tag:'资讯'}}"
              :inline-desc='x.body'>
            <img class="ic_img" slot="icon" src="../../assets/image/ic_label_today.png">
            <div>
                <span class="pubdate">{{x.pub_date}}</span>
            </div>
        </cell>
        <back-top></back-top>
    </div>
</template>
<style>
    .ic_img {
        position: absolute;
        top: 10px;
        left: 5px;
        width: 15px;
        height: 15px;
    }

    .weui_cell_bd > p {
        font-size: 15px;
    }

    .pubdate {
        font-size: 5px;

    }
</style>
<script>
    import {Group, Cell, Swiper, Scroller, Divider} from 'vux'
    import axios from 'axios'
    import BackTop from '../../components/BackTop'


    const imgList = [
        'http://file06.16sucai.com/2016/0222/17714c3b51079911760e5ef7fdb553f6.jpg',
        'http://pic.58pic.com/58pic/15/67/98/93C58PICjeM_1024.jpg',
        'http://file06.16sucai.com/2016/0315/1df566087c24a94cd9534bc9bc1871ff.jpg'
    ]

    const urlList = imgList.map((one, index) => ({
        url: 'javascript:',  //这里填写图片点击的链接
        img: one
    }))

    export default {
        name: 'NewsList',
        data() {
            return {
                ishow: false,
                Objlist: [],
                pageIndex: 1,
                catalog: 0,
                imgs: urlList,
            }
        },
        components: {
            Scroller,
            Cell,
            Group,
            Divider,
            Swiper,
            BackTop
        },
        created() {
            this.getList()
        },
        methods: {
            async getList() {
                var that = this;
                this.page = 1;
                let data = {page: 1, rows: this.rows * this.page}
                axios.get('/comments', {params: data})
                    .then(function (response) {
                        console.log(response.data);//获取数据
                        let res_data = response.data;
                        if (res_data.length > 0) {
                            that.Objlist = res_data.slice(0, 20);
                            that.$nextTick(() => {
                                console.log("$nextTick")
                            })
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            load(uuid) {
                setTimeout(() => {
                    this.getList();
                    this.$broadcast('pulldown:reset', uuid)
                }, 1000)
            },
        }
    }
</script>
