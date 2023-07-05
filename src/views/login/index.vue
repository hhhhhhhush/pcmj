<template>
    <div class="login-page">
        <!-- 
        修改组件样式
        1.给它添加类名，这个类名会自动添加到组件的根元素上
        2.所有的组件都会严格按照规范，有一个自带的类名：组件名
        -->
        <el-card>
            <!-- 具名插槽 -->
            <template #header>
                黑马面经运营后台
            </template>
            <!-- 
                el-form:表示整个表单区域
                el-form-item:表示一行表单内容
                el-input:文本框
             -->

            <!-- 

                
              -->
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="tc">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
export default {
    name: 'LoginIndex',

    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            //校验规则
            rules: {
                // username 是 prop 指定的名字，一般情况下建议：
                // 数据 -prop - 规则名三者保持一致  
                username: [
                    // required：必填项
                    // message：提示信息
                    // tigger:触发时机 blur：失去焦点事件
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    // required：必填项
                    // message：提示信息
                    // tigger:触发时机 blur：失去焦点事件
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^\w{5,10}$/, message: '长度在 5 到 11 个字符', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        login() {
            // 兜底校验，校验整个表单是否通过验证，通过验证才允许发送请求
            this.$refs.form.validate(async (valid) => {
                if (!valid) return;
                // try {
                    // console.log("登录")
                    // 注意：dispatch触发actions的执行，由于actions中做的是异步任务，所以无法立刻获取结果
                    // 一定要用 await 或者 .then()拿结果
                    await this.$store.dispatch('user/loginAction', this.form)
                    // console.log('跳转到首页')
                    this.$router.push('/')
                    this.$message.success('登录成功')
                // } catch (e) {
                //     console.log(e)
                //     this.$message.error(e.response.data.message)
                // }
            })

        },
        reset() {
            // console.log('重置')
            this.$refs.form.resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
//scoped 只能给当前组件内的所有标签添加 data-v-hash
//但是，el-card里面的元素没有scope添加的属性,所以直接设置样式无法生效

//解决方案：深度作用选择器
//less: 在选择器前面添加 /deep/
///scss: 在选择器前面添加 ::v-deep

.login-page {
    min-height: 100vh;
    //background: url(@/assets/login-bg) no-repeat center / cover;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .el-card {
        width: 420px;

        ::v-deep .el-card__header {
            height: 80px;
            background-color: rgba(114, 124, 245, 1);
            text-align: center;
            line-height: 40px;
            color: white;
            font-size: 18px;
        }
    }

    .el-form {
        padding: 0 20px;
    }

    .tc {
        text-align: center;
    }
}
</style>