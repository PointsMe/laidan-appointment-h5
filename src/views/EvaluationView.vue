<template>
  <div class="evaluation-view">
    <!-- 顶部用户与餐厅信息 -->
    <div class="eva-header">
      <div class="eva-greet">你好！{{ reservationDetail?.username }}</div>
      <div class="eva-tip">请你对此次用餐做出评价！</div>
    </div>
    <!-- 预约信息展示区 -->
    <div class="info-section">
      <div class="info-section-title">
        {{ reservationDetail?.specialNeeds?.merchantName || '餐厅名称' }}
      </div>
      <div class="info-row">
        <span class="info-label">{{ reservationDetail?.weekDay }}</span>
        <span class="info-value">{{ reservationDetail?.date }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">
          {{ reservationDetail?.diningPeriod === 101 ? '午餐' : '晚餐' }}
        </span>
        <span class="info-value">{{ reservationDetail?.time }}</span>
      </div>
    </div>
    <!-- 评分表单 -->
    <div class="eva-form">
      <div v-for="(item, idx) in questions" :key="item.key" class="eva-question">
        <div class="eva-q-title">{{ idx + 1 }}. {{ item.label }}</div>
        <div class="eva-q-options">
          <div
            v-for="opt in options"
            :key="opt.value"
            class="eva-q-option"
            :class="{ selected: answers[item.key] === opt.value }"
            @click="selectAnswer(item.key, opt.value)"
          >
            <img :src="opt.img" :alt="opt.label" />
          </div>
        </div>
      </div>
      <!-- 意见建议 -->
      <div class="eva-suggest">
        <div class="eva-suggest-label">您的意见或建议（非必填）</div>
        <van-field
          class="eva-suggest-textarea"
          v-model="suggestion"
          placeholder="输入内容"
          type="textarea"
        />
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="eva-submit-wrap">
      <button class="eva-submit" @click="handleSubmit">发送</button>
    </div>
    <!-- 底部logo -->
    <div class="eva-footer">
      <img src="@/assets/bottom-logo.png" alt="Laidan" class="eva-logo" />
    </div>
  </div>
</template>
<script setup lang="ts">
// 由于使用了unplugin-auto-import，ref和reactive会自动导入，无需手动导入
import { getReservationDetailApi, addReservationCommentApi } from '@/apis/common'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
const router = useRouter()
const reservationDetail = ref(null)

const questions = [
  { key: 'exp', label: '整体体验' },
  { key: 'food', label: '菜品质量' },
  { key: 'service', label: '服务质量' },
  { key: 'env', label: '环境卫生' },
  { key: 'recommend', label: '是否愿意推荐给朋友' }
]

const options = [
  { value: 1, label: '好', img: new URL('@/assets/hight.png', import.meta.url).href },
  { value: 2, label: '一般', img: new URL('@/assets/midle.png', import.meta.url).href },
  { value: 3, label: '差', img: new URL('@/assets/low.png', import.meta.url).href }
]

const answers = reactive<Record<string, number>>({})
const suggestion = ref('')

function selectAnswer(key: string, value: number) {
  answers[key] = value
}

async function handleSubmit() {
  // 校验（如需必填可加校验）
  // 提交逻辑
  console.log('answers==>', answers)
  console.log('suggestion==>', suggestion.value)
  // router.push({
  //   name: 'SureEvaluation',
  //   query: {
  //     id: reservationDetail.value.id,
  //     serviceQuality: answers.service,
  //     overallExperience: answers.exp,
  //     dishQuality: answers.food,
  //     environmentalSanitation: answers.env,
  //     isWillRecommendFriend: answers.recommend
  //   }
  // })
  // return false
  const res = await addReservationCommentApi({
    reservationId: reservationDetail.value.id,
    customerId: reservationDetail.value.customerId,
    serviceQuality: answers.service,
    overallExperience: answers.exp,
    dishQuality: answers.food,
    environmentalSanitation: answers.env,
    isWillRecommendFriend: answers.recommend,
    opinion: suggestion.value
  })
  if (res && res.code === 20000) {
    showToast('评价成功')
    setTimeout(() => {
      router.push({
        name: 'SureEvaluation',
        query: {
          id: reservationDetail.value.id,
          serviceQuality: answers.service,
          overallExperience: answers.exp,
          dishQuality: answers.food,
          environmentalSanitation: answers.env,
          isWillRecommendFriend: answers.recommend
        }
      })
    }, 1000)
  } else {
    showToast('评价失败')
  }
}
async function getReservationDetailFn(id) {
  const res = await getReservationDetailApi({
    id: id
  })
  if (res && res.code === 20000) {
    const obj = {
      ...res.data,
      date: res.data.startedAt
        ? new Date(res.data.startedAt).toLocaleDateString()
        : new Date().toLocaleDateString(),
      time: res.data.startedAt
        ? new Date(res.data.startedAt).toLocaleTimeString()
        : new Date().toLocaleTimeString(),
      // 根据日期获取周几
      weekDay: res.data.startedAt
        ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][
            new Date(res.data.startedAt).getDay()
          ]
        : ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date().getDay()]
    }
    reservationDetail.value = obj
  }
}
onMounted(() => {
  console.log('EvaluationView')
  const id = router.currentRoute.value?.query?.id as string
  if (id) {
    getReservationDetailFn(id)
  }
})
</script>
<style scoped lang="less">
.evaluation-view {
  min-height: 100vh;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
}
.info-section {
  width: 80%;
  margin: auto;
  border-radius: 5px;
  margin-bottom: 16px;
  padding: 24px 16px 8px 0px;
  .info-section-title {
    font-size: 20px;
    color: #000000;
    text-align: left;
  }
  .info-row {
    display: flex;
    align-items: center;
    justify-content: left;
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
}
.eva-header {
  width: 80%;
  margin: auto;
  padding: 50px 0 0 0;
  .eva-greet {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 4px;
    color: #222;
  }
  .eva-tip {
    font-size: 16px;
    color: #222;
    margin-bottom: 10px;
  }
  .eva-restaurant {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #111;
  }
  .eva-date {
    font-size: 22px;
    color: #222;
    .eva-date-main {
      font-weight: bold;
      border-bottom: 4px solid #ff8842;
      margin-right: 12px;
    }
    .eva-time {
      font-weight: bold;
      border-bottom: 4px solid #ff8842;
    }
  }
}
.eva-form {
  width: 92%;
  margin: auto;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px #0001;
  padding: 24px 16px 16px 16px;
  margin-bottom: 32px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
.eva-question {
  margin-bottom: 24px;
  .eva-q-title {
    font-size: 18px;
    color: #222;
    margin-bottom: 12px;
  }
  .eva-q-options {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .eva-q-option {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border 0.2s;
      img {
        width: 40px;
        height: 40px;
        object-fit: contain;
      }
      &.selected {
        border: 2px solid #ff8842;
        background: #fff7f0;
      }
    }
  }
}
.eva-suggest {
  margin-top: 24px;
  .eva-suggest-label {
    font-size: 16px;
    color: #222;
    margin-bottom: 8px;
  }
  .eva-suggest-textarea {
    width: 100%;
    margin-top: 4px;
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 10px;
    box-sizing: border-box;
    font-size: 16px;
    resize: none;
    background: #fafafa;
  }
}
.eva-submit-wrap {
  width: 100%;
  max-width: 480px;
  display: flex;
  justify-content: center;
  margin: 32px 0 0 0;
}
.eva-submit {
  width: 180px;
  height: 48px;
  background: #ff8842;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ff6600;
  }
}
.eva-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 36px;
  background: #ff8842;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 10;
  .eva-logo {
    height: 13px;
    vertical-align: middle;
  }
  span {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
  }
}
</style>
<style lang="less">
.evaluation-view {
  width: 100%;
  height: 100%;
}
</style>
