<template>
  <div class="step-three">
    <div class="choose-time-header">
      <p>3.</p>
      <p>选择用餐时段</p>
    </div>
    <div class="choose-time-content">
      <div class="choose-time-content-item">
        <img class="img-1" src="@/assets/day.png" alt="" />
        <span>午餐</span>
      </div>
      <div class="choose-time-content-item">
        <img class="img-2" src="@/assets/night.png" alt="" />
        <span>晚餐</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'StepThree'
})
</script>
<style scoped lang="less">
.step-three {
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
      .img-1 {
        width: 53px;
        height: 53px;
      }
      .img-2 {
        width: 28px;
        height: 41px;
      }
      span {
        margin-top: 20px;
        width: 100px;
        font-weight: 500;
        text-align: center;
        font-size: 19px;
        color: #000000;
        display: block;
        background: #ffffff;
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        border-radius: 5px 5px 5px 5px;
        border: 1px solid #e8e8e8;
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
