<template>
  <div class="dashboard-editor-container">
    <el-tabs
      v-model="state.activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="当天实时数据"
        name="today"
      >
        <todayData />
      </el-tab-pane>
      <el-tab-pane
        label="历史数据"
        name="history"
      >
        <historyData />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

import todayData from './components/todayData.vue'
import historyData from './components/historyData.vue'

const state = reactive({
  activeName: 'today'
})

function handleClick() { }

</script>

<style lang="scss" scoped>
.dashboard-editor-container {
}
</style>
