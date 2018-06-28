<template>
    <div>
        <el-container>
            <el-header style="height:60px;text-align:center;line-height:60px;background-color:#409EFF;color: #fff;font-size:24px;">世纪宏达经营报表系统</el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
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
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div class="block" v-show="leftIndex===1">
                        <span class="demonstration">肉类货名选择</span>
                        <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            v-model="selectedOptions2"
                        >
                        </el-cascader>
                        <span class="demonstration">重量(千克)</span>
                        <el-input style="width:20%" placeholder="请输入重量单位千克" suffix-icon="el-icon-date" v-model="input9"></el-input>
                        <span class="demonstration">单价(/千克)</span>
                        <el-input style="width:20%" placeholder="请输入单价/kg" suffix-icon="el-icon-date" v-model="input10"></el-input>
                        <span class="demonstration">添加</span>
                        <el-button type="success" icon="el-icon-plus" size="small" @click="goodAdd()"></el-button>
                    </div>

                    <el-table :data="tableData" style="width: 80%;margin-top:48px;">
                        <el-table-column align="center" header-align="center" prop="goodsType" label="类别" width="180"></el-table-column>
                        <el-table-column align="center" header-align="center" prop="goodsName" label="产品名称" width="180"></el-table-column>
                        <el-table-column align="center" header-align="center" prop="goodsNumber" label="重量(kg)"></el-table-column>
                        <el-table-column align="center" header-align="center" prop="goodsPrice" label="单价(元/kg)"></el-table-column>
                        <el-table-column align="center" header-align="center" prop="goodsAllPrice" label="总价(元)"></el-table-column>
                        <el-table-column align="center" header-align="center" label="操作">
                            <template slot-scope="scope">
                                <!-- <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, tableData)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
      return {
            leftIndex:1,
            input9:'',
            input10:'',
            tableData: [],
            options: [{
            value: '白条类',
            label: '白条类',
            children: [
                    {value: '带皮软白条',label: '带皮软白条'},
                    {value: '带皮去后段软白条',label: '带皮去后段软白条'},
                    {value: '二级去皮白条',label: '二级去皮白条'},
                    {value: '二级去皮白条（冷鲜）',label: '二级去皮白条（冷鲜）'},
                    {value: '三级去皮白条',label: '三级去皮白条'},
                    {value: '四级去皮白条',label: '四级去皮白条'},
                    {value: '去皮去前段白条',label: '去皮去前段白条'},
                    {value: '二级带皮去后段白条',label: '二级带皮去后段白条'},
                    {value: '二级带皮去后段白条',label: '二级带皮去后段白条'},
                    {value: '三级带皮去后段白条',label: '三级带皮去后段白条'},
                    {value: '四级带皮去后段白条',label: '四级带皮去后段白条'}
                ],
            },{
            value: '骨类',
            label: '骨类',
            children: [
                    {value: '颈骨',label: '颈骨'},
                    {value: '颈骨H',label: '颈骨H'},
                    {value: '带肉前腿骨',label: '带肉前腿骨'},
                    {value: '带肉前腿骨H',label: '带肉前腿骨H'},
                    {value: '带肉后腿骨',label: '带肉后腿骨'},
                    {value: '带肉后腿骨H',label: '带肉后腿骨H'},
                    {value: '无颈前排',label: '无颈前排'},
                    {value: '肋排',label: '肋排'},
                    {value: '肋排H',label: '肋排H'},
                    {value: '尾骨',label: '尾骨'},
                    {value: '尾叉骨',label: '尾叉骨'}
                ],
            },{
            value: '段类',
            label: '段类',
            children: [
                    {value: '带皮前段',label: '带肉前段'},
                    {value: '去皮前段',label: '去皮前段'},
                    {value: '带皮中段',label: '去皮中段'},
                    {value: '去皮中段',label: '去皮中段'},
                    {value: '带皮后段',label: '带肉后段'},
                    {value: '去皮后段',label: '去皮后段'}
                ],
            },{
            value: '肉类',
            label: '肉类',
            children: [
                    {value: '一级带皮五花肉',label: '一级带皮五花肉'},
                    {value: '一级带皮五花肉H',label: '一级带皮五花肉H'},
                    {value: '三级带皮五花肉',label: '三级带皮五花肉'}
                ],
            },{
            value: '腰类',
            label: '腰类',
            children: [
                    {value: '脊膘',label: '板油'},
                    {value: '肥膘',label: '肥油'},
                    {value: '去皮软膘',label: '去皮软膘'},
                    {value: '板油',label: '板油'}
                ],
            },{
            value: '副产类',
            label: '副产类',
            children: [
                    {value: '猪肚',label: '猪肚'},
                    {value: '猪心',label: '猪心'},
                    {value: '猪肝（热鲜）',label: '猪肝（热鲜）'},
                    {value: '猪肝（冷鲜）',label: '猪肝（冷鲜）'},
                    {value: '猪舌',label: '猪舌'},
                    {value: '猪腰',label: '猪腰'}
                ],
            }],
            selectedOptions2: []
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
                this.leftIndex = key;
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        goodAdd(){
            let tableList = {
                goodsType: this.selectedOptions2[0],
                goodsName: this.selectedOptions2[1],
                goodsNumber:this.input9,
                goodsPrice: this.input10,
                goodsAllPrice: Number(this.input9)* Number(this.input10)+''
            }
            this.selectedOptions2 = [];
            this.input9 = '';
            this.input10 = '';
            this.tableData.push(tableList);
        },
        handleDelete(index,rows){
            rows.splice(index, 1);
        }
    }
}
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>