<template>
  <div class="step-two">
    <div class="choose-time-header">
      <p>2.</p>
      <p>选择人数</p>
    </div>
    <div class="choose-time-content">
      <div class="choose-time-content-item">
        <img src="@/assets/parents.png" alt="" />
        <span>大人</span>
        <van-field type="number" :min="1" @change="handleChangeParent" class="choose-time-content-item" v-model="adultCount" placeholder="请输入人数" />
      </div>
      <div class="choose-time-content-item">
        <img src="@/assets/children.png" alt="" />
        <span>儿童</span>
        <van-field type="number" :min="0" @change="handleChangeChild" class="choose-time-content-item" v-model="childCount" placeholder="请输入人数" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouteStore } from '@/stores/modules/routeStore'
const routeStore = useRouteStore()
const adultCount = ref(routeStore.requestParams.adultCount || 0)
const childCount = ref(routeStore.requestParams.childCount || 0)
defineOptions({
  name: 'StepTwo'
})
const handleChangeParent = (value: any)=>{
  routeStore.setRequestParamsFn({
    ...routeStore.requestParams,
    adultCount: value.target.value
  })
}
const handleChangeChild = (value: any)=>{
  console.log(value)
  routeStore.setRequestParamsFn({
    ...routeStore.requestParams,
    childCount: value.target.value
  })
}
onMounted(()=>{
  adultCount.value = routeStore.requestParams.adultCount || 0
  childCount.value = routeStore.requestParams.childCount || 0
})
</script>
<style scoped lang="less">
.step-two {
  width: 100%;
  height: 100%;
  .choose-time-content {
    width: 92%;
    background-color: #fff;
    border-radius: 10px;
    margin: auto;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    .choose-time-content-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      padding: 20px;
      img {
        width: 35px;
        height: 42px;
      }
      span {
        font-weight: 500;
        font-size: 19px;
        color: #000000;
      }
      .van-field {
        width: 30%;
        height: 40px;
        border: 1px solid #000000;
        border-radius: 10px;
        padding: 8px 15px;
        :deep(.van-field__control) {
          text-align: center;
        }
      }
    }
  }
  .choose-time-header {
    width: 100%;
    background-color: #fff;
    text-align: center;
    background-color: rgb(250, 250, 250);
    padding-top: 40px;
    padding-bottom: 20px;
    > p:first-child {
      color: #ec6e38;
      font-weight: 600;
      font-size: 25px;
    }
    > p:last-child {
      font-size: 25px;
      color: #000000;
    }
  }
}
</style>
