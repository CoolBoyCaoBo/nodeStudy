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

                    <div style="margin-top:46px;text-align: center;">
                        <span>重量总计：</span><el-tag type="success" style="margin-right:36px">{{goodsCounts}}g</el-tag>
                        <span>货钱总计：</span><el-tag type="success" style="margin-right:36px">{{goodsPrices}}元</el-tag> 
                        <el-date-picker v-model="value1" type="date" placeholder="选择出货日期" style="width:150px;margin-right:36px"></el-date-picker>
                        <el-select style="width:150px;margin-right:36px" v-model="value4" clearable placeholder="请选择出货方">
                            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-button type="primary" @click="handlePost()">提交</el-button>
                    </div>
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
            options: [],
            selectedOptions2: [],
            value1:'',
            goodsCounts:'0',
            goodsPrices:'0',
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
            value4: ''
        }
    },
    created(){
        this.goodsTypeInit();
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
            this.goodsCounts = Number(this.goodsCounts) + Number(this.input9)+'';
            this.goodsPrices = Number(this.goodsPrices) + Number(tableList.goodsAllPrice)+'';
            this.selectedOptions2 = [];
            this.input9 = '';
            this.input10 = '';
            this.tableData.push(tableList);
        },
        handleDelete(index,rows){
            this.goodsCounts = Number(this.goodsCounts) - Number(rows[index].goodsNumber)+'';
            this.goodsPrices = Number(this.goodsPrices) - Number(rows[index].goodsAllPrice)+'';
            rows.splice(index, 1);
        },
        goodsTypeInit(){
            this.$http({
                url:"/goods/getGoodsType",
                method: 'get'
            }).then((res)=>{
                console.log(res);
                if(res.data.code === 200){
                    this.options = res.data.data.goodsType;
                }
            })
        },
        handlePost(){
            this.$http({
                url:"/goods/postGoodsOrder",
                method: 'post',
                data:{
                    goodsAllCount: this.goodsCounts,
                    goodsAllPrice: this.goodsPrices,
                    goodsOrderDate: this.value1,
                    goodsOderAdderss: this.value4,
                    goodsOderDetails:this.tableData
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.code === 200){
                    
                }
            })
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