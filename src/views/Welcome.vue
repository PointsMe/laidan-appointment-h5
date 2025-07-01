<template>
  <div class="welcome">
    <img src="@/assets/welcome.jpg" alt="">
  </div>
  <div class="welcome-text">
    <span>立即预订</span>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
defineOptions({
  name: "WelcomeView"
})
</script>
<style scoped lang="less">
.welcome{
  width: 100%;
  height: 100vh;
  background-color: rgb(250, 250, 250);
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 90%;
    height: 70%;
  }
}
.welcome-text{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40%;
  margin: auto;
  height: 100px;
  text-align: center;
  background-color: #fff;
  left: 50%;
  transform: translateX(-50%);
  >span{
    width: auto;
    display: block;
    font-size: 24px;
    padding: 10px 20px;
    font-weight: bold;
    background: #EC6E38;
    border-radius: 5px 5px 5px 5px;
    color: #fff;
  }
}
</style>
