<template>
    <div>
        <el-container>
            <el-header style="height:60px;text-align:center;line-height:60px;background-color:#409EFF;color: #fff;font-size:24px;">世纪宏达经营报表系统</el-header>
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
                            <span slot="title">导航二</span>
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
                <el-main v-show="leftIndex === 4">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                    </el-tabs>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import goodsOrderIpnut from '@/components/goodsOrderIpnut.vue'
export default {
    data() {
      return {
            leftIndex:1,
            activeName: 'second'
        }
    },
    created(){

    },
    components:{
       'goodsOrderIpnut':goodsOrderIpnut 
    },
    methods: {
        select(key,keyPath){
            this.leftIndex = Number(key);
        },
        handleClick(tab, event) {
            console.log(tab, event);
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