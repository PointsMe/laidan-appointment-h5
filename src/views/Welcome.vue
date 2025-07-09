<template>
  <div class="welcome">
    <img src="@/assets/welcome.jpg" alt="">
  </div>
  <div class="welcome-text">
    <span @click="handleClick">立即预订</span>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useRouteStore } from '@/stores/modules/routeStore'
const router = useRouter();
const routeStore = useRouteStore()
defineOptions({
  name: "WelcomeView"
})
const handleClick = () => {
  router.push('/chooseTime/stepOne')
}
onMounted(()=>{
  const shopId = router.currentRoute.value?.query?.shopId as string
  const merchantId = router.currentRoute.value?.query?.merchantId as string
  if(shopId && merchantId){
    routeStore.setShopIdFn(shopId)
    routeStore.setMerchantIdFn(merchantId)
  }
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
    font-size: 20px;
    padding: 10px 20px;
    background: #EC6E38;
    border-radius: 5px 5px 5px 5px;
    color: #fff;
  }
}
</style>
