<template>
    <div class="login container">
        <div class="panel">
            <div class="head">登 录</div>
            <div class="body">
                <el-form class="login-form" ref="form" :model="form" @keyup.enter.native="submit">
                    <el-form-item>
                        <el-input placeholder="用户名" v-model="form.username"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
                    </el-form-item>

                    <el-form-item style="text-align:center">
                        <el-button type="text" @click="submit">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { setToken } from '@/utils/auth'

export default {
    title: '登录',
    data () {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async submit () {
            const { token } = await this.$http.post('user/login', this.form)
            if (token) {
                setToken(token)
                // 跳转
                const { redirect } = this.$route.query
                if (redirect) {
                    return this.$router.replace({ path: redirect })
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    align-items: center;
    justify-content: center;
    display: flex;
    height: 100%;
}
.panel {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 300px;
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    border-radius: 6px;
}
.head {
    // position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4caf50;
    width: 360px;
    height: 120px;
    border-radius: 4px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
        0 7px 10px -5px rgba(76, 175, 80, 0.4);
    // left: 20px;
    // top: -20px;
    color: #ffffff;
    font-size: 20px;
    margin-top: -20px;
}
.body {
    width: 100%;
    flex: 1;
    padding: 20px;
}
.login-form {
    display: flex;
    flex-direction: column;
    // align-items: stretch;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
