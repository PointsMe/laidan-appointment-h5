<template>
  <div class="step-one">
    <div class="choose-time-header">
      <p>1.</p>
      <p>选择日期</p>
    </div>
    <div class="choose-time-content">
      <van-calendar
        v-model="date"
        title=""
        :default-date="date"
        :show-title="false"
        :switch-mode="'year-month'"
        :poppable="false"
        :show-confirm="false"
        @select="handleClick"
        :style="{ height: '450px',width: '92%',margin: 'auto',borderRadius: '10px',boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouteStore } from '@/stores/modules/routeStore'
defineOptions({
  name: 'StepOne'
})
const routeStore = useRouteStore()
const date = ref(routeStore.requestParams.date ? new Date(routeStore.requestParams.date) : new Date())
const handleClick = (value: any)=>{
  console.log(value)
  routeStore.setRequestParamsFn({
    ...routeStore.requestParams,
    date: value
  })
}
onMounted(()=>{
  date.value = routeStore.requestParams.date ? new Date(routeStore.requestParams.date) : new Date()
})
</script>
<style scoped lang="less">
.step-one {
  width: 100%;
  height: 100%;
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