<template>
    <div>
        <el-container>
            <el-header style="height:60px;text-align:center;line-height:60px;background-color:#409EFF;color: #fff;font-size:24px;position:relative">
                <div>世纪宏达经营报表系统</div>
                <el-dropdown style="position:absolute;top: 0px;right: 6px;">
                    <el-button type="primary">
                        18579068637<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo" @select="select">
                         <el-menu-item index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>出货挂账</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">挂账明细查询</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">帐号管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <goodsOrderIpnut v-show="leftIndex === 1"></goodsOrderIpnut>

                <el-main v-show="leftIndex === 2">
                    <el-select style="width:200px;margin-right:36px" v-model="value4" clearable placeholder="请选择出货方">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-button icon="el-icon-search" @click="getGoodsOrder()" circle></el-button>
                    <el-table :data="tableData" style="width: 80%;margin-top:48px;">
                        <el-table-column align="center" header-align="center" prop="goodsOrderDate" label="出货日期" width="200"></el-table-column>
                        <el-table-column align="center" header-align="center" prop="goodsOrderAdderss" label="出货方" width="180"></el-table-column>
                        <el-table-column align="center" header-align="center" prop="goodsAllCount" label="出货总重量"></el-table-column>
                        <el-table-column align="center" header-align="center" prop="goodsAllPrice" label="出货总价"></el-table-column>
                        <!-- <el-table-column align="center" header-align="center" prop="goodsAllPrice" label="总价(元)"></el-table-column> -->
                        <el-table-column align="center" header-align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">明细</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>

                <el-main v-show="leftIndex === 4">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="添加用户" name="first">
                            <register></register>
                        </el-tab-pane>
                        <el-tab-pane label="删除用户" name="second">删除用户</el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import goodsOrderIpnut from '@/components/goodsOrderIpnut.vue'
import register from '@/components/register.vue'
export default {
    data() {
      return {
            leftIndex:1,
            activeName: 'first',
            options1:[{
                    value: '梅溪湖步步高',
                    label: '梅溪湖步步高'
                }, {
                    value: '梅溪湖步步高1',
                    label: '梅溪湖步步高2'
                }, {
                    value: '梅溪湖步步高3',
                    label: '梅溪湖步步高4'
                }, {
                    value: '梅溪湖步步高5',
                    label: '梅溪湖步步高5'
                }, {
                    value: '梅溪湖步步高6',
                    label: '梅溪湖步步高6'
                }
            ],
            value4:'',
            tableData:[]
        }
    },
    created(){

    },
    components:{
       'goodsOrderIpnut':goodsOrderIpnut,
       'register':register
    },
    methods: {
        select(key,keyPath){
            this.leftIndex = Number(key);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleDelete(index,data){

        },
        getGoodsOrder(){
            this.$http({
                    url:"/goods/getGoodsOrder",
                    method: 'post',
                    data:{
                        goodsOrderAdderss:this.value4
                    },
                    iResType:1
                }).then((res)=>{
                    console.log(res);
                    if(res.data.code === 200){
                        this.tableData = res.data.data;
                    }else{
                        this.tableData = [];
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                }).catch((error) =>{
                    this.buttonLoading = false;
                    this.tableData = [];
                    this.$message({
                        message: '查询失败，请稍后再试~~~',
                        type: 'error'
                    });
                })
        }
    },
}
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>