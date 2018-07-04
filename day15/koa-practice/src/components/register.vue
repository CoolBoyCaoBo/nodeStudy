<template>
    <div>
        <!-- <el-container> -->
            <!-- <el-header style="height:60px;line-height:60px;color:#409EFF;font-size:24px;">世纪宏达经营报表系统注册流程</el-header> -->
            <el-steps :active="active" style="padding-top:60px" align-center>
                <el-step title="步骤1" description="输入注册手机号码"></el-step>
                <el-step title="步骤2" description="是否为管理员"></el-step>
                <el-step title="步骤3" description="输入密码"></el-step>
                <el-step title="步骤3" description="点击注册成为世纪宏达用户"></el-step>
            </el-steps>
            <el-main v-show="active===0" style="text-align:center">
                <el-input placeholder="请输入注册手机号" v-model="phoneNumber" clearable maxlength=11 type="tel" style="width:300px;margin-top:16px;" prefix-icon="el-icon-mobile-phone"></el-input>
            </el-main>
            <el-main v-show="active===1" style="text-align:center">
                <el-radio v-model="isAdminFlag" label="1" border>否</el-radio>
                <el-radio v-model="isAdminFlag" label="2" border>是</el-radio>
            </el-main>
            <el-main v-show="active===2" style="text-align:center">
                <el-input placeholder="请输入注册密码" v-model="password" clearable minlength=6 maxlength=18 type="password" style="width:300px;margin-top:16px;" prefix-icon="el-icon-printer"></el-input> <br>
                <div style="color:#EB3B3B;font-size:12px;">*密码必须为6-18位字母、数字组合</div> <br>
                <el-input placeholder="请再次输入注册密码" v-model="checkPassword" clearable minlength=6 maxlength=18 type="password" style="width:300px;" prefix-icon="el-icon-printer"></el-input>
                <div v-show="passwordCompareCheck === -1" style="color:#EB3B3B;font-size:12px;">*两次输入密码不一致请，请确认~~~</div>
            </el-main>
            <el-button style="width:50%;margin-top:16px;margin-left:25%" @click="next" :loading="loading">{{elButtonMsg}}</el-button>
        <!-- </el-container> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                isAdminFlag:'1',
                elButtonMsg:"下一步",
                phoneNumber:'',
                password:'',
                checkPassword:'',
                loading:false
            }
        },
        methods: {
            next() {
                if(this.phoneNumberCheck === 0){
                    this.$message({
                        message: '手机号码输入错误，请重新输入~~~',
                        type: 'error'
                    });
                    return false;
                }
                if((this.passwordCompareCheck === 0 || this.passwordCompareCheck === -1) && this.active === 2){
                    this.$message({
                        message: '密码格式输入错误，请重新输入~~~',
                        type: 'error'
                    });
                    return false
                }
                this.active++;
                if(this.active === 3){
                    this.elButtonMsg = "注册";
                }else if(this.active === 4){
                    //注册按钮点击
                    this.regiserAjax();
                    return false;
                }
            },
            regiserAjax(){
                this.loading = true;
                this.$http({
                    url:"user/register",
                    iResType:1,
                    data:{
                        phoneNumber:this.phoneNumber,
                        password:this.password,
                        isAdmin:this.isAdminFlag === "1" ? false : true 
                    }
                }).then((res)=>{
                    console.log(res);
                    this.loading = false;
                    if(res.data.code === 200){
                        this.elButtonMsg = '注册成功';
                        this.$alert('恭喜您，已成为世纪宏达食品有限公司用户，快去登录体验吧！！！', '注册成功', {
                            confirmButtonText: '去登录',
                            callback: action => {
                                this.$router.push({path:'/login'});
                            }
                        });
                    }else{
                        this.elButtonMsg = '注册失败';
                        this.$alert('呜呜呜~~~~注册失败了，重新去注册', '注册失败', {
                            confirmButtonText: '重新注册',
                            callback: action => {
                                this.active = 0 ;
                                this.phoneNumber = this.password = '';
                                this.elButtonMsg = '下一步';
                            }
                        });
                    }
                }).catch((err)=>{
                    this.loading = false;
                    this.$message.error('出错了哟，请稍后再试哟~~~~');
                })
            }
        },
        computed: {
            phoneNumberCheck() {
                let mPattern = /^1[3456789]\d{9}$/; 
                if(!mPattern.test(this.phoneNumber)){
                    return 0;
                }else{
                    return 1;
                }
            },
            passwordCompareCheck(){
                let pwdChek = /^[0-9A-Za-z]+$/;
                let checkState = (this.password === this.checkPassword);
                if(!checkState && this.password !=='' && this.checkPassword !==''){
                    return -1;
                }
                if(checkState && this.password.length > 5 && pwdChek.test(this.password)) {
                    return 1;
                }else{
                    return 0;
                }
                
            }
        },
    }
</script>

<style scoped>

</style>