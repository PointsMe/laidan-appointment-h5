<template>
  <div class="step-four">
    <div class="choose-time-header">
      <p>4.</p>
      <p>选择用餐区域与时间</p>
    </div>
    <div class="choose-time-content">
      <div class="choose-time-content-item">
        <div class="choose-time-content-item-content">
          <span>室外花园</span>
          <img src="@/assets/time-bg.jpg" alt="" />
          <span>商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述。</span>
        </div>
        <div class="choose-time-content-item-time">
          <span>19:00</span>
          <span>21:00</span>
          <span>23:00</span>  
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
        </div>
      </div>
      <div class="choose-time-content-item">
        <div class="choose-time-content-item-content">
          <span>室外大堂</span>
          <img src="@/assets/time-bg.jpg" alt="" />
          <span>商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述，商家对用餐区域的描述描述。</span>
        </div>
        <div class="choose-time-content-item-time">
          <span>19:00</span>
          <span>21:00</span>
          <span>23:00</span>  
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
          <span>21:00</span>
        </div>
      </div>
    </div>
    <div class="null-div"></div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: 'StepFour'
})
</script>
<style scoped lang="less">
.step-four {
  width: 100%;
  height: 100%;
  .null-div{
    margin-top: 20px;
    width: 100%;
    height: 140px;
    background-color: rgb(250, 250, 250);
  }
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
      .choose-time-content-item-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        span {
          font-weight: 500;
          font-size: 19px;
          color: #000000;
        }
        >span:first-child{
          margin-bottom: 10px;
          margin-top: 10px;
        }
        img {
          width: 100%;
          height: 100%;
          margin-bottom: 10px;
        }
      }
      .choose-time-content-item-time {
        width: 100%;
        margin-top: 10px;
        span {
          display: inline-block;
          padding: 5px 8px;
          font-weight: 500;
          font-size: 19px;
          color: #000000;
          background: #FFFFFF;
          border-radius: 5px 5px 5px 5px;
          border: 1px solid #707070;
          margin-right: 11px;
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
