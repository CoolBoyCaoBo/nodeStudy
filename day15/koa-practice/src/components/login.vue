<template>
    <div>
        <el-container>
            <el-header style="height:60px;line-height:60px;color:#409EFF;font-size:24px;">世纪宏达经营报表系统</el-header>
            <div class="index-el-main-style">
                <div class="index-ipt-style">
                    <div class="index-ipt-title">密码登录</div>
                    <el-input placeholder="请输登录手机号" v-model="phoneNumber" clearable maxlength=11 type="tel" style="margin-top:16px;" prefix-icon="el-icon-mobile-phone"></el-input>
                    <el-input placeholder="请输入密码" v-model="password" clearable minlength=6 type="password" style="margin-top:16px;" prefix-icon="el-icon-printer"></el-input>
                    <el-button type="primary" style="width:100%;margin-top:16px;" @click="loginButton" :loading="buttonLoading">登录</el-button>
                    <div class="login-links">
                        <div class="login-link-tips">忘记密码</div>
                        <!-- <router-link to="/register">
                            <div class="login-link-tips">注册</div>
                        </router-link> -->
                    </div>
                </div>
            </div>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                phoneNumber:'',
                password:'',
                buttonLoading:false
            }
        },
        methods: {
            loginButton(){
                this.buttonLoading = true;
                this.loginAjax();
            },
            loginAjax() {
                this.$http({
                    url:"user/login",
                    iResType:1,
                    data:{
                        phoneNumber:this.phoneNumber,
                        password:this.password
                    }
                }).then((res)=>{
                    this.buttonLoading = false;
                    console.log(res);
                    if(res.data.code === 200){
                        this.$message({
                            message: '恭喜你，登录成功，正在进入系统首页',
                            type: 'success',
                            onClose: () => {
                                this.$router.push({path:'/'});
                            }
                        });
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                }).catch((error)=>{
                    this.buttonLoading = false;
                    console.log(error);
                    this.$message({
                        message: "呜呜呜，登录异常请稍后再试~~~",
                        type: 'error'
                    });
                })
            }
        }
    }
</script>

<style scoped>
    .index-el-main-style{
        height: 600px;
        background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529406914906&di=00909464b80b0c5e3115f5b9c8873ebf&imgtype=0&src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F8f%2Fe5%2Ff7%2F8fe5f7a16412b3d234847311bacafa7c.jpg');
        background-size: 100% 100%;
    }
    .index-ipt-style{
        width: 320px;
        height: 350px;
        background-color: #fff;
        border-radius: 5px; 
        position: relative;
        top: 100px;
        float: right;
        right: 100px;
        padding: 12px
    }
    .index-ipt-title{
        width: 100%;
        height: 18px;
        line-height: 18px;
        font-size: 16px;
        color: #3c3c3c;
        margin-top: 9px;
        padding-bottom: 8px;
        font-weight: 700;
    }
    .login-links{
        margin-top: 25px;
        overflow: hidden;
        text-align: right;
    }
    .login-link-tips{
        color: #6c6c6c;
        font-size: 12px;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer;
    }
    .login-link-tips:hover{
        color: #409EFF
    }
</style>
