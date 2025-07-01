<template>
  <div class="reservation-information">
    <!-- 顶部图标与标题 -->
    <div class="top-section">
      <img src="@/assets/succ.png" alt="预约图标" class="icon-calendar" />
      <div class="title">感谢，您的预约已发送！</div>
    </div>

    <!-- 预约信息展示区 -->
    <div class="info-section">
      <div class="info-row">
        <img src="@/assets/date.png" class="info-icon" />
        <span class="info-label">周四</span>
        <span class="info-value">02 | 01 | 2025</span>
      </div>
      <div class="info-row">
        <img src="@/assets/clock.png" class="info-icon" />
        <span class="info-label">晚餐</span>
        <span class="info-value">19:30 - 22:00</span>
      </div>
      <div class="info-row people-row">
        <div class="people-block">
          <img src="@/assets/parents.png" class="people-icon" />
          <div>2 大人</div>
        </div>
        <div class="people-block">
          <img src="@/assets/children.png" class="people-icon" />
          <div>2 儿童</div>
        </div>
      </div>
    </div>
    <div class="info-section-btns">
      <van-button type="primary" class="submit-btn">发送预约信息给...</van-button>
      <van-button type="primary" class="submit-btn">打开地图</van-button>
      <van-button type="primary" class="submit-btn">添加到我的日历</van-button>
      <van-button type="primary" class="submit-btn">将餐馆添加到我的联系人</van-button>
      <van-button type="primary" class="submit-btn another-color">编辑预约</van-button>
      <van-button type="primary" class="submit-btn another-color">取消预约</van-button>
    </div>
    <!-- 商家提示 -->
    <div class="merchant-tip">
      <div class="tip-title">退改建议</div>
      <div class="tip-content">如若出于某种原因无法到场，请尽早取消
        或修改您的预约信息</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SureInformationView'
})
</script>

<style scoped lang="less">
.reservation-information {
  width: 100vw;
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 32px;
}
.top-section {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-calendar {
    width: 30px;
    height: 30px;
    margin-bottom: 16px;
    color: #ec6e38;
  }
  .title {
    font-weight: 400;
    font-size: 16px;
    color: #797979;
  }
}
.info-section-btns{
  width: 92vw;
  margin: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  .submit-btn{
    width: 100%;
    height: 40px;
    background: #000000;
    border-radius: 8px;
    border: none;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
  } 
  .another-color{
    background: #fff !important;
    border: 1px solid #707070 !important;
    color: #000000 !important;
  }
}
.info-section {
  width: 92vw;
  margin: auto;
  border-radius: 5px;
  margin-bottom: 16px;
  padding: 24px 16px 8px 16px;
  .info-row {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-bottom: 12px;
    .info-icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    .info-label {
      color: #222;
      margin-right: 12px;
      border-bottom: 2px solid #ec6e38;
    }
    .info-value {
      color: #222;
      font-weight: bold;
      border-bottom: 2px solid #ec6e38;
    }
  }
  .people-row {
    margin-top: 10px;
    width: 60%;
    margin: auto;
    justify-content: space-around;
    .people-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      .people-icon {
        width: 30px;
        height: 30px;
        margin-bottom: 4px;
      }
    }
  }
}
.merchant-tip {
  width: 92vw;
  margin: auto;
  border-radius: 5px;
  margin-bottom: 16px;
  padding: 12px 16px;
  text-align: center;
  border: 1px solid #707070;

  .tip-title {
    color: #ec6e38;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  .tip-content {
    color: #222;
    font-size: 16px;
  }
}
.reservation-form {
  width: 90vw;
  max-width: 400px;
  background: #fff;
  border-radius: 12px;
  padding: 16px 16px 0 16px;
  margin-bottom: 16px;
  .special-need-title {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    .arrow {
      margin-left: 8px;
      transition: transform 0.2s;
      font-size: 16px;
      &.open {
        transform: rotate(180deg);
      }
    }
  }
  .form-section-title {
    font-size: 16px;
    font-weight: bold;
    margin: 12px 0 4px 0;
  }
  .agree-item {
    margin-bottom: 0px !important;
  }
}
.footer-btns {
  width: 92vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin: 32px auto 0 auto;
  .cancel-btn {
    width: 44%;
    height: 48px;
    font-size: 16px;
    background: #fff;
    color: #222;
    border: 1px solid #707070;
    border-radius: 8px;
  }
  .submit-btn {
    width: 54%;
    height: 48px;
    font-size: 16px;
    background: #ec6e38;
    color: #fff;
    border-radius: 8px;
    border: none;
  }
}
</style>
