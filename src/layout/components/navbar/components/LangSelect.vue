<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div class="disp">
      <img src="../../../../assets/imgs/zh.png" alt="" class="imgs" />
      <div>{{ language }}</div>
      <el-icon><ArrowDown /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文 </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'vi'" command="vi"> vi </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'ja'" command="ja"> ja </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'th'" command="th"> th </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/store'
import { useI18n } from 'vue-i18n'

const appStore = useAppStore()
const { locale } = useI18n()

const language = computed(() => {
  return appStore.lang
})

locale.value = language.value

const handleSetLanguage = val => {
  appStore.SET_LANG(val)
  locale.value = val

  ElMessage({
    message: '成功',
    type: 'success',
    duration: '1500',
  })
}

defineOptions({
  name: 'LangSelect',
})
</script>

<style lang="scss" scoped>
.disp {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.imgs {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin-right: 10px;
}
</style>
