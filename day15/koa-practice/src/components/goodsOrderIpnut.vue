<template>
    <div style="text-align:center;width: 100%;">
        <el-main>
            <div class="block">
                <el-row>
                    <el-col :span="7">
                        <span class="demonstration">肉类货名选择</span>
                        <el-cascader style="width:60%" expand-trigger="hover" :options="options" v-model="selectedOptions2"></el-cascader>
                    </el-col>
                    <el-col :span="7">
                        <span class="demonstration">重量(千克)</span>
                        <el-input style="width:50%" type="number" placeholder="请输入重量单位千克" v-model="input9"></el-input>
                    </el-col>
                    <el-col :span="7"> 
                        <span class="demonstration">单价(/千克)</span>
                        <el-input style="width:50%" type="number" placeholder="请输入单价/kg" v-model="input10"></el-input>
                    </el-col>
                    <el-col :span="3">
                        <span class="demonstration">添加</span>
                        <el-button type="success" icon="el-icon-plus" size="small" @click="goodAdd()"></el-button>
                    </el-col>
                </el-row>
            </div>

            <el-table :data="tableData" style="width: 80%;margin-top:48px;">
                <el-table-column align="center" header-align="center" prop="goodsType" label="类别" width="180"></el-table-column>
                <el-table-column align="center" header-align="center" prop="goodsName" label="产品名称" width="180"></el-table-column>
                <el-table-column align="center" header-align="center" prop="goodsNumber" label="重量(kg)"></el-table-column>
                <el-table-column align="center" header-align="center" prop="goodsPrice" label="单价(元/kg)"></el-table-column>
                <el-table-column align="center" header-align="center" prop="goodsAllPrice" label="总价(元)"></el-table-column>
                <el-table-column align="center" header-align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, tableData)">删除</el-button>
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
                <el-button type="primary" @click="handlePost()" :loading="buttonLoading">提交</el-button>
            </div>
        </el-main>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
                value4: '',
                buttonLoading:false
            }
        },
        created(){
            this.goodsTypeInit();
        },
        methods: {
            goodAdd(){
                if(this.addBtnState === 0) return false;
                let tableList = {
                    goodsType: this.selectedOptions2[0],
                    goodsName: this.selectedOptions2[1],
                    goodsNumber:this.input9,
                    goodsPrice: this.input10,
                    goodsAllPrice:  (Number(this.input9)* Number(this.input10)).toFixed(2)
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
                console.log(this.postBtnState);
                if(this.postBtnState === 0) return false;
                this.buttonLoading = true;
                this.$http({
                    url:"/goods/postGoodsOrder",
                    method: 'post',
                    data:{
                        goodsAllCount: this.goodsCounts,
                        goodsAllPrice: this.goodsPrices,
                        goodsOrderDate: this.value1,
                        goodsOrderAdderss: this.value4,
                        goodsOrderDetails:this.tableData
                    },
                    iResType:1
                }).then((res)=>{
                    this.buttonLoading = false;
                    console.log(res);
                    if(res.data.code === 200){
                        this.$message({
                            message: '恭喜你，提交成功~~~',
                            type: 'success',
                            onClose: () => {
                                this.tableData = [];
                                this.goodsCounts = this.goodsPrices = '0';
                                this.value1 = this.value4 = '';
                            }
                        });
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                }).catch((error) =>{
                    this.buttonLoading = false;
                    this.$message({
                        message: '提交失败，请稍后再试~~~',
                        type: 'error'
                    });
                })
            }
        },
        computed: {
            addBtnState() {
                if(this.selectedOptions2.length > 0 && this.input9 !== '' && this.input10 !== ''){
                    return 1
                }else{
                    return 0 
                }
            },
            postBtnState(){
                if(Number(this.goodsCounts) > 0 && Number(this.goodsPrices) > 0 && this.value1 !== '' && this.value4.length > 0){
                    return 1
                }else{
                    return 0
                }
            }
        },
    }
</script>

<style scoped>

</style>