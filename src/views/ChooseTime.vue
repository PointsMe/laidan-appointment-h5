<template>
  <div class="choose-time">
    <router-view />
    <div class="choose-time-footer">
      <div class="choose-time-footer-left" @click="handleBack">
        <img src="@/assets/step.png" alt="">
        <span>上一步</span>
      </div>
      <div class="choose-time-footer-right" @click="handleNext">
        <span>下一步</span>
        <img src="@/assets/next.png" alt="">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
defineOptions({
  name: 'ChooseTimeView'
})
const handleNext = () => {
  router.push('/chooseTime/stepTwo')
}
const handleBack = () => {
  router.back()
}
</script>
<style scoped lang="less">
.choose-time {
  width: 100%;
  height: 100vh;
  background-color: rgb(250, 250, 250);
  p {
    padding: 0;
    margin: 0;
  }
  .choose-time-footer {
    width: 100%;
    height: 45px;
    text-align: center;
    background-color: rgb(250, 250, 250);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding-bottom: 38px;
    .choose-time-footer-left {
      width: 30%;   
      height: 45px;
      margin-left: 5%;
      background-color: #EC6E38;
      text-align: center;
      border-radius: 23px 23px 23px 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 8px;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    .choose-time-footer-right {
      width: 30%;
      height: 45px;
      margin-right: 5%;
      background-color: #EC6E38;
      text-align: center;
      border-radius: 23px 23px 23px 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 8px;
      img {
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
}
</style>
