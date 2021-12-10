<template>
  <div id="top" class="all_width">
    <div id="top_menu">
      <div id="top_menu_right" class="top_menu_right_a">
        <div>
        </div>
        <div>
          <a
            href='/user/cart'
            class="buy_car"
            v-if="loginFlag == true"
            >购物车</a>
        </div>
        <div><a v-if="loginFlag" @click="logout">注销</a></div>
        <div >
          <span id="uname">{{ loginName }}</span>
        </div>
        <div><a href="/register" v-if="!loginFlag">注册</a></div>
        <div><a href="/login" v-if="!loginFlag">登录</a></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "CustomHead",
  data() {
    return {
      avatar: false,
      loginFlag: sessionStorage.getItem("token") != null,
      loginName: "",
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  methods: {
    logout() {
        sessionStorage.removeItem("token");
        axios.get(this.$store.state.baseUrl+"/logout", {
          headers:{
              'statoken':sessionStorage.getItem("token")
          }
        })
        sessionStorage.setItem("loginCallback", "/index")
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('role', '');
        sessionStorage.setItem('loginName', '');
        this.loginName = "";
        this.$router.push("/login");
    },
  },
  beforeMount() {
    if (this.loginFlag) {
      this.loginName = sessionStorage.getItem("loginName");
    }
  },
  mounted() {},
};
</script>


<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
}

a {
  color: #757575;
  text-decoration: none;
}

span {
    color: azure;
}

.all_width {
  width: 100%;
  margin: 20px auto;
  background: #fff;
}



#top {
  
  height: 40px;
  margin: 0;
  background:#333;
}

#top_menu {
 
  width: 1230px;
  height: 40px;
  margin: 0 auto;
}

#top_menu_left {
  float: left;
  width: 850px;
  height: 40px;
}


#top_menu_right {
  float: right;
  width: 380px;
  height: 40px;
}

.top_menu_right_a div {
  font-size: 12px;
  color: gray;
  float: right;
  margin-left: 20px;
  line-height: 40px;
}

.top_menu_right_a div a {
  display: inline-block;
  color: #b0b0b0;
}

.top_menu_right_a div a:hover {
  color: #fff;
}
.buy_car {
  background-color: #5d5d5d;
  width: 80px;
  text-align: center;
}

#uname{
  color: whitesmoke;
}

</style>