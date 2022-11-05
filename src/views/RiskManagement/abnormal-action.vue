<template>
  <div>
    <ProForm
      ref="formRef"
      :inline="true"
      :columns="state.formInline"
    >
      <template #submitSlot>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
          >查询</el-button>
          <el-button
            type="primary"
            @click="search"
          >导出记录</el-button>
        </el-form-item>
      </template>
    </ProForm>
    <el-button
      type="primary"
      @click="state.checkDia = true"
      icon="Plus"
    >
      添加新卡号
    </el-button>
    <Table
      class="mt-20"
      :data="state.recordList"
      :columns="state.columns"
      :total="state.total"
      :pageSize="state.pageSize"
      :current="state.current"
      :pageUpdate="pageUpdate"
      :sizeUpdate="sizeUpdate"
    >
      <template #status="{ row }">
        <el-switch v-model="row.status" />
      </template>
      <template #action="{ row }">
        <el-button
          type="primary"
          size="small"
          plain
          icon="Edit"
          @click="checkDia = true"
        >
          修改
        </el-button>
      </template>
    </Table>

    <el-dialog
      v-model="state.checkDia"
      title="添加黑名单"
      center
      width="600px"
    >
      <ProForm
        ref="blackFormRef"
        :columns="state.blackColumns"
        label-width="100px"
        label-position="left"
      >
        <template #submitSlot>
          <el-form-item>
            <el-button
              type="primary"
              @click="addAccount"
            >确认</el-button>
          </el-form-item>
        </template>
      </ProForm>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Table from '@/components/ProTable/index.vue'
import ProForm from '@/components/ProForm/index.vue'

const state = reactive({
  recordList: [
    { id: 12, account: 'fhjdf', level: 2, name: 'sdfdf', mobile: '21334324324', email: '23434354@45', nick: 'aaa', type: '普通用户', authLevel: 1, checkStatus: '已认证', status: true }
  ],
  columns: [
    { prop: 'index', label: '序号' },
    { prop: 'account', label: '帐号' },
    { prop: 'level', label: '时间' },
    { prop: 'level', label: '异常行为信息' }
  ],
  formInline: [
    {
      type: 'input',
      prop: 'username',
      label: '搜索账号',
      width: '200px',
      placeholder: '请输入您要搜索的账号'
    },
    {
      slot: 'submitSlot'
    }
  ],
  checkDia: false,
  blackColumns: [
    {
      type: 'input',
      prop: 'username',
      label: '黑名单账号',
      placeholder: '请输入需要加入黑名单的卡号'
    },
    {
      type: 'textarea',
      prop: 'username',
      rows: 4,
      label: '添加原因',
      placeholder: '请输入添加原因'
    },
    {
      slot: 'submitSlot'
    }
  ]
})
const formRef = ref(null)
const blackFormRef = ref(null)

function search() {
  console.log(formRef.value.data)
}

function addAccount() { }

</script>

<style lang='scss' scoped>
</style>
