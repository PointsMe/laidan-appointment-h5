<template>
  <div class="sure-evaluation">
    <div class="eva-title">感谢你对此次用餐做出评价！</div>
    <div class="eva-questions">
      <div class="eva-row">
        <div class="eva-item">
          <div class="eva-label">整体体验</div>
          <div class="eva-icons">
            <img
              :class="{ selected: answers.exp === 1 }"
              src="@/assets/hight.png"
              @click="select('exp', 1)"
              alt="好"
            />
          </div>
        </div>
        <div class="eva-item">
          <div class="eva-label">菜品质量</div>
          <div class="eva-icons">
            <img
              :class="{ selected: answers.food === 2 }"
              src="@/assets/midle.png"
              @click="select('food', 2)"
              alt="一般"
            />
          </div>
        </div>
        <div class="eva-item">
          <div class="eva-label">服务质量</div>
          <div class="eva-icons">
            <img
              :class="{ selected: answers.service === 1 }"
              src="@/assets/hight.png"
              @click="select('service', 1)"
              alt="好"
            />
          </div>
        </div>
      </div>
      <div class="eva-row">
        <div class="eva-item">
          <div class="eva-label">环境卫生</div>
          <div class="eva-icons">
            <img
              :class="{ selected: answers.env === 3 }"
              src="@/assets/low.png"
              @click="select('env', 3)"
              alt="差"
            />
          </div>
        </div>
        <div class="eva-item">
          <div class="eva-label">是否愿意推荐给朋友</div>
          <div class="eva-icons">
            <img
              :class="{ selected: answers.recommend === 1 }"
              src="@/assets/hight.png"
              @click="select('recommend', 1)"
              alt="好"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="eva-share-box">
      <div class="eva-share-title">分享到我的Instagram Story?</div>
      <van-field v-model="shareText" class="eva-textarea" placeholder="输入内容" type="textarea" />
      <div class="eva-share-bottom">
        <van-icon name="photo-o" size="20" class="eva-file-icon" />
        <van-uploader>
          <van-button type="primary" size="small" class="eva-file-label"
            >选择文件</van-button
          >
        </van-uploader>
      </div>
    </div>
    <div class="eva-btns">
      <van-button type="primary" @click="onCancel" class="eva-cancel">取消</van-button>
      <van-button type="primary" @click="onSubmit" class="eva-submit">发送</van-button>
    </div>
    <div class="eva-footer">
      <img src="@/assets/bottom-logo.png" alt="Laidan" class="eva-logo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

const answers = reactive({
  exp: 1,
  food: 2,
  service: 1,
  env: 3,
  recommend: 1
})
const shareText = ref('')
const file = ref<File | null>(null)

function select(key: keyof typeof answers, value: number) {
  answers[key] = value
}
function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}
function onCancel() {
  // 可根据实际需求返回上一页或清空表单
  window.history.back()
}
function onSubmit() {
  // 这里可添加表单校验和提交逻辑
  alert('感谢您的评价！')
}
</script>
<style scoped lang="less">
.sure-evaluation {
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 32px;
  box-sizing: border-box;
}
.eva-title {
  margin-top: 90px;
  font-size: 16px;
  color: #222;
  font-weight: 500;
  text-align: center;
  margin-bottom: 50px;
}
.eva-questions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}
.eva-row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
}
.eva-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}
.eva-label {
  font-size: 16px;
  color: #222;
  margin-bottom: 5px;
  text-align: center;
}
.eva-icons img {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  border: 4px solid transparent;
  transition: border 0.2s;
}
.eva-icons img.selected {
  border: 4px solid #ec6e38;
  background: #f7e7de;
}
.eva-share-box {
  width: 92%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 32px 24px 16px 24px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.eva-share-title {
  font-size: 16px;
  color: #222;
  margin-bottom: 5px;
}
.eva-textarea {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  padding: 12px;
}
.eva-share-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  font-size: 16px !important;
  .eva-file-icon {
    // justify-content: flex-start;
    // float: left;
  }
  .eva-file-label {
    background: #fff;
    border: 1px solid #888;
    border-radius: 5px;
    // padding: 5px 10px;
    font-size: 14px;
    color: #222;
    cursor: pointer;
  }
}
.eva-hash {
  width: 60px;
  height: 40px;
  background: #888;
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 24px;
  margin-right: 16px;
  cursor: pointer;
}
.eva-file {
  display: none;
}
.eva-btns {
  width: 75%;
  margin: auto;
  height: 40px;
  margin-bottom: 30px;
  .eva-cancel {
    float: left;
    width: 35%;
    height: 40px;
    background: #fff;
    color: #888;
    border: 1px solid #888;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  .eva-submit {
    float: right;
    width: 35%;
    height: 40px;
    background: #ec6e38;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
}

.eva-footer {
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ec6e38;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
}
.eva-logo {
  height: 13px;
}
</style>
