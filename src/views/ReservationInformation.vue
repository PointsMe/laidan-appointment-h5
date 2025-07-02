<template>
  <div class="reservation-information">
    <!-- 顶部图标与标题 -->
    <div class="top-section">
      <img src="@/assets/date.png" alt="预约图标" class="icon-calendar" />
      <div class="title">确认预约信息</div>
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

    <!-- 商家提示 -->
    <div class="merchant-tip">
      <div class="tip-title">商家提示</div>
      <div class="tip-content">此时段用餐时间不超过2:30</div>
    </div>

    <!-- 表单区域 -->
    <el-form
      ref="formRef"
      :model="formModal"
      label-position="top"
      
      :rules="rules"
      class="reservation-form"
    >
      <!-- 特殊需求（可折叠） -->
      <el-form-item>
        <div class="special-need-title" @click="toggleSpecial">
          特殊需求
          <span class="arrow" :class="{ open: showSpecial }">▼</span>
        </div>
      </el-form-item>
      <el-form-item label="过敏原（非必填）" v-show="showSpecial">
        <el-input v-model="formModal.special" placeholder="请输入特殊需求" />
      </el-form-item>
      <el-form-item label="特殊情况（非必填）" v-show="showSpecial">
        <el-input v-model="formModal.special" placeholder="请输入特殊需求" />
      </el-form-item>
      <el-form-item label="儿童座椅（非必填）" v-show="showSpecial">
        <el-input v-model="formModal.special" placeholder="请输入特殊需求" />
      </el-form-item>
      <el-form-item label="残疾人座位（非必填）" v-show="showSpecial">
        <el-input v-model="formModal.special" placeholder="请输入特殊需求" />
      </el-form-item>
      <el-form-item label="其他需求（非必填）" v-show="showSpecial">
        <el-input type="textarea" v-model="formModal.special" placeholder="请输入特殊需求" rows="2" />
      </el-form-item>
      <!-- 基本信息 -->
      <div class="form-section-title">基本信息</div>
      <el-form-item prop="name">
        <el-input v-model="formModal.name" placeholder="输入姓名" />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="formModal.phone" placeholder="输入电话" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="formModal.email" placeholder="输入邮箱" />
      </el-form-item>
      <!-- 留言 -->
      <div class="form-section-title">给商家留言（非必填）</div>
      <el-form-item>
        <el-input v-model="formModal.remark" placeholder="输入留言" type="textarea" rows="2" />
      </el-form-item>
      <!-- 勾选项 -->
      <el-form-item class="agree-item">
        <el-checkbox v-model="formModal.agree" :true-label="true" :false-label="false">
          我接受 <a href="#" target="_blank">使用条款</a> 与
          <a href="#" target="_blank">隐私信息</a>
        </el-checkbox>
      </el-form-item>
      <el-form-item class="agree-item">
        <el-checkbox v-model="formModal.marketing" :true-label="true" :false-label="false">
          允许通过短信或邮件接收商家推广
        </el-checkbox>
      </el-form-item>
      <el-form-item class="agree-item">
        <el-checkbox v-model="formModal.saveInfo" :true-label="true" :false-label="false">
          记住当前信息用于下次预定
        </el-checkbox>
      </el-form-item>
    </el-form>

    <!-- 底部按钮 -->
    <div class="footer-btns">
      <el-button class="cancel-btn" @click="onCancel">取消</el-button>
      <el-button type="primary" class="submit-btn" @click="onSubmit">添加预约</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 表单数据
const formModal = ref({
  name: '',
  phone: '',
  email: '',
  special: '',
  remark: '',
  agree: true,
  marketing: false,
  saveInfo: false
})

// 校验规则
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

const formRef = ref()
const showSpecial = ref(false)
const toggleSpecial = () => {
  showSpecial.value = !showSpecial.value
}
function onCancel() {
  ElMessage.info('已取消预约')
}
function onSubmit() {
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    ElMessage.success('预约信息已提交')
  })
}
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
  margin-top: 60px;
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
    margin-bottom: 32px;
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
