<template>
  <div class="reservation-information">
    <!-- 顶部图标与标题 -->
    <div class="top-section">
      <img src="@/assets/date-1.png" alt="预约图标" class="icon-calendar" />
      <div class="title">确认预约信息</div>
    </div>

    <!-- 预约信息展示区 -->
    <div class="info-section">
      <div class="info-row">
        <img src="@/assets/date.png" class="info-icon" />
        <span class="info-label">{{ pageParams.weekDay }}</span>
        <span class="info-value">{{ pageParams.date }}</span>
      </div>
      <div class="info-row">
        <img src="@/assets/clock.png" class="info-icon" />
        <span class="info-label">
          <label v-if="pageParams.lunchActive === 101"> 午餐 </label>
          <label v-else-if="pageParams.lunchActive === 102"> 晚餐 </label>
        </span>
        <span class="info-value">19:30 - 22:00</span>
      </div>
      <div class="info-row people-row">
        <div class="people-block">
          <img src="@/assets/parents.png" class="people-icon" />
          <div>{{ pageParams.adultCount }} 大人</div>
        </div>
        <div class="people-block">
          <img src="@/assets/children.png" class="people-icon" />
          <div>{{ pageParams.childCount }} 儿童</div>
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
        <el-input v-model="formModal.allergen" placeholder="请输入特殊需求" />
      </el-form-item>
      <el-form-item label="特殊情况（非必填）" v-show="showSpecial">
        <el-input v-model="formModal.exceptionalCase" placeholder="请输入特殊需求" />
      </el-form-item>
      <el-form-item label="儿童座椅（非必填）" v-show="showSpecial">
        <el-input type="number" v-model="formModal.childSeatCount" placeholder="请输入特殊需求" />
      </el-form-item>
      <el-form-item label="残疾人座位（非必填）" v-show="showSpecial">
        <el-input
          type="number"
          v-model="formModal.disabledSeatCount"
          placeholder="请输入特殊需求"
        />
      </el-form-item>
      <el-form-item label="其他需求（非必填）" v-show="showSpecial">
        <el-input
          type="textarea"
          v-model="formModal.otherRequirements"
          placeholder="请输入特殊需求"
          rows="2"
        />
      </el-form-item>
      <!-- 基本信息 -->
      <div class="form-section-title">基本信息</div>
      <el-form-item prop="username">
        <el-input v-model="formModal.username" placeholder="输入姓名" />
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="formModal.mobile" type="number" placeholder="输入电话">
          <template #prepend>
            <AllCountryView @changeCountry="changeCountry" />
          </template>
        </el-input>
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
          我接受 <a href="#" target="_blank" class="agree-link">使用条款</a> 与
          <a href="#" target="_blank" class="agree-link">隐私信息</a>
        </el-checkbox>
      </el-form-item>
      <el-form-item class="agree-item">
        <el-checkbox v-model="formModal.promoted" :true-label="true" :false-label="false">
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
  <van-popup v-model:show="showBottom" position="bottom" :close-on-click-overlay="false">
    <div class="popup-content">
      <div class="title-text">请输入验证码</div>
      <div class="content-text">
        <span> 亲的顾客，我们已经向手机号 </span>
        <span> {{ country }} {{ formModal.mobile }} </span>
        <span> 发送了验证码 </span>
      </div>
      <div class="input-box">
        <span class="input-label">验证码：</span>
        <el-input type="number" v-model="code" placeholder="请输入验证码" />
      </div>
      <div class="bottom-btns">
        <van-button size="small" class="re-send" type="primary" @click="sendCode">
          <span v-if="num > 0">({{ num }}s)</span>
          <span v-else>重新发送</span>
        </van-button>
        <van-button size="small" class="confirm-btn" type="primary" @click="validateCode"
          >确定</van-button
        >
      </div>
    </div>
  </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ElMessage, ElLoading } from 'element-plus'
import { useRouteStore } from '@/stores/modules/routeStore'
import AllCountryView from '@/components/AllCountryView.vue'
import { useRouter } from 'vue-router'
import { checkCodeApi, createReservationApi, getVerificationCodeApi,updateReservationApi } from '@/apis/common'
import { convertISOToTimezoneFormat } from '@/utils/time'
const routeStore = useRouteStore()
const router = useRouter()
const showBottom = ref(false)
const pageParams = computed(() => {
  return {
    ...routeStore.requestParams,
    date: routeStore.requestParams.date
      ? new Date(routeStore.requestParams.date).toLocaleDateString()
      : new Date().toLocaleDateString(),
    // 根据日期获取周几
    weekDay: routeStore.requestParams.date
      ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][
          new Date(routeStore.requestParams.date).getDay()
        ]
      : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date().getDay()]
  }
})
const country = ref(routeStore.requestParams.country || '+86')
const code = ref('')
const num = ref(0)
const timer = ref()
// 表单数据
const formModal = ref({
  username: routeStore.requestParams.username,
  mobile: routeStore.requestParams.mobile,
  email: routeStore.requestParams.email,
  allergen: routeStore.requestParams.allergen,
  exceptionalCase: routeStore.requestParams.exceptionalCase,
  childSeatCount: routeStore.requestParams.childSeatCount,
  disabledSeatCount: routeStore.requestParams.disabledSeatCount,
  otherRequirements: routeStore.requestParams.otherRequirements,
  remark: routeStore.requestParams.remark,
  agree: false,
  promoted: routeStore.requestParams.promoted || false,
  saveInfo: false
})

// 校验规则
const rules = {
  username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }],
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
  routeStore.resetRequestParamsFn()
  routeStore.resetCurrentStepFn()
  router.push('/')
}
async function createReservation() {
  console.log('pageParams==>', pageParams.value, country.value)
  const date = `${dayjs(pageParams.value.date).format('YYYY-MM-DD')} ${pageParams.value.reservationTime}`
  const date1 = dayjs(date)
  const date2 = convertISOToTimezoneFormat(date1)
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  routeStore.setRequestParamsFn({
    ...pageParams.value,
    ...formModal.value,
    country: country.value
  })
  let res = null
  const params = {
    customerId: routeStore.requestParams.customerId,
    username: formModal.value.username,
    mobile: `${country.value.replace('+', '')}-${formModal.value.mobile}`,
    startedAt: date2,
    zoneId: pageParams.value.reservationZoneId,
    dinerCount: Number(pageParams.value.adultCount) + Number(pageParams.value.childCount),
    adultCount: Number(pageParams.value.adultCount),
    childCount: Number(pageParams.value.childCount),
    // "tableIds": [
    //     "232173029940531202"
    // ],
    promoted: formModal.value.promoted,
    specialNeeds: {
      // "id": "tyui",
      allergen: formModal.value.allergen,
      exceptionalCase: formModal.value.exceptionalCase,
      childSeatCount: formModal.value.childSeatCount,
      disabledSeatCount: formModal.value.disabledSeatCount,
      otherRequirements: formModal.value.otherRequirements
    },
    diningPeriod: pageParams.value.lunchActive
  }
  try {
    if (routeStore.requestParams.id) {
      res = await updateReservationApi({
        ...params,
        id: routeStore.requestParams.id
      })
    } else {
      res = await createReservationApi(params)
    }
    if (res && res.code === 20000) {
      routeStore.setRequestParamsFn({
        ...pageParams.value,
        ...routeStore.requestParams,
        id: res.data.id
      })
      ElMessage.success('预约成功')
      router.push('/sureInformation')
      loading.close()
    } else {
      ElMessage.error('预约失败')
      loading.close()
    }
  } catch (error) {
    loading.close()
  } finally {
    loading.close()
  }
}
function onSubmit() {
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    console.log('预约信息已提交==>', formModal.value, country.value)
    if (
      routeStore.requestParams.customerId &&
      formModal.value.mobile === routeStore.requestParams.mobile
    ) {
      if (!formModal.value.agree) {
        ElMessage.error('请先同意使用条款和隐私信息')
        return false
      }
      createReservation()
    } else {
      sendCode()
    }
  })
}
const changeCountry = (value: string) => {
  console.log('国家已切换==>', value)
  country.value = value
}
const sendCode = async () => {
  console.log('发送验证码==>', formModal.value, country.value)
  if (num.value > 0) {
    return false
  }
  routeStore.setRequestParamsFn({
    ...pageParams.value,
    ...formModal.value,
    country: country.value
  })
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  try {
    const res = await getVerificationCodeApi({
      mobile: `${country.value.replace('+', '')}-${formModal.value.mobile}`
    })
    if (res && res.code === 20000) {
      ElMessage.success('发送验证码成功')
      loading.close()
      showBottom.value = true
    } else {
      ElMessage.error('发送验证码失败')
    }
    console.log('发送验证码==>', res)
  } catch (error) {
    loading.close()
  } finally {
    num.value = 0
  }
}
const validateCode = async () => {
  console.log('发送验证码==>', formModal.value, country.value)
  if (!code.value) {
    ElMessage.error('请输入验证码')
    return false
  }
  const res = await checkCodeApi({
    mobile: `${country.value.replace('+', '')}-${formModal.value.mobile}`,
    verificationCode: code.value
  })
  if (res && res.code === 20000) {
    formModal.value.promoted = res.data.promoted
    routeStore.setRequestParamsFn({
      ...pageParams.value,
      ...formModal.value,
      country: country.value,
      customerId: res.data.id
    })

    showBottom.value = false
    ElMessage.success('验证码正确')
  } else {
    ElMessage.error('验证码错误')
  }
}
watch(
  () => showBottom.value,
  (newVal) => {
    if (newVal) {
      num.value = 60
      timer.value = setInterval(() => {
        if (num.value) {
          num.value = num.value - 1
        } else {
          clearInterval(timer.value)
        }
      }, 1000)
    } else {
      num.value = 0
      if (timer.value) {
        clearInterval(timer.value)
      }
    }
  },
  {
    immediate: true
  }
)
onMounted(() => {})
</script>

<style scoped lang="less">
.popup-content {
  .title-text {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding: 20px 0;
  }
  .input-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    margin-bottom: 40px;
    .input-label {
      width: 70px;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .bottom-btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    margin-bottom: 20px;
    .re-send {
      width: 120px;
      background: #fff;
      color: #000;
      border: 1px solid #707070;
    }
    .confirm-btn {
      width: 120px;
      background: #ec6e38;
      color: #fff;
      border: none;
    }
  }
  .content-text {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    > span:nth-child(2) {
      color: #000;
      font-weight: bold;
    }
  }
}
.reservation-information {
  width: 100vw;
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 32px;
  :deep(.el-input-group__prepend) {
    background: #fff !important;
  }
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
    color: #ec6e38 !important;
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
    // justify-content: center;
    font-size: 16px;
    margin-bottom: 12px;
    // width: 200px;
    // margin: auto;
    // text-align: left;
    justify-content: flex-start;
    margin-left: 25%;
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
  font-size: 16px !important;
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
  .agree-link {
    color: #000 !important;
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
