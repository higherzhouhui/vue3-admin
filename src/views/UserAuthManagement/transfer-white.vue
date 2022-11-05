<template>
  <div class="user-list-wrap">
    <el-form
      :inline="true"
      :model="state.formInline"
      class="demo-form-inline"
    >
      <el-form-item label="搜索账号">
        <el-input
          v-model="state.formInline.user"
          placeholder=" 请输入您要搜索的卡号"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">操作日志</el-button>
      </el-form-item>
    </el-form>
    <div class="">
      <el-button
        type="primary"
        :icon="Plus"
        @click="checkDia=true"
      >
        添加新账号
      </el-button>
    </div>
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
          icon="Delete"
          @click="delItem(row)"
        >
          删除
        </el-button>
      </template>
    </Table>

    <el-dialog
      v-model="checkDia"
      title="审核信息"
      center
      width="600px"
    >
      <ProForm
        ref="formRef"
        :columns="state.formColumns"
        label-width="100px"
        label-position="left"
      >
        <template #submitSlot>
          <el-form-item>
            <el-button
              type="primary"
              @click="search"
            >确认</el-button>
          </el-form-item>
        </template>
      </ProForm>
    </el-dialog>

  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Table from '@/components/ProTable/index.vue'
import ProForm from '@/components/ProForm/index.vue'

const state = reactive({
  recordList: [
    { id: 12, account: 'fhjdf', level: 2, name: 'sdfdf', mobile: '21334324324', email: '23434354@45', nick: 'aaa', type: '普通用户', authLevel: 1, checkStatus: '已认证', status: true }
  ],
  columns: [
    { prop: 'id', label: '序号' },
    { prop: 'account', label: '用户账号' },
    { prop: 'level', label: '用户层级' },
    { prop: 'name', label: '姓名' },
    { prop: 'mobile', label: '币种', width: 340, showOverflowTooltip: true },
    { prop: 'email', label: '总量', width: 180, showOverflowTooltip: true },
    { prop: 'nick', label: '可用数量', width: 180, showOverflowTooltip: true },
    { prop: 'type', label: '冻结数量', width: 180, showOverflowTooltip: true },
    { prop: 'type', label: '地址', width: 180, showOverflowTooltip: true },
    { label: '操作', slot: 'action', fixed: 'right' }
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    user: '',
    region: ''
  },
  checkDia: false,
  checkFormRef: null,
  checkForm: {
    isChecked: false,
    reason: ''
  },
  formColumns: [
    {
      type: 'input',
      prop: 'username',
      label: '白名单账号',
      placeholder: '请输入需要加入白名单的账号'
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
  ],
  delDia: false
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

function pageUpdate(val) {

}
function sizeUpdate(val) {

}

function resetForm() {
  console.log(checkFormRef.value)
  checkFormRef.value.resetFields()
}

function cancelDia() {
  resetForm()
  checkDia.value = false
}

function submitForm() {
  checkFormRef.value.validate((valid) => {
    console.log(valid)
  })
}

function delItem(row) {
  ElMessageBox.prompt('', '删除转账白名单', {
    confirmButtonText: '确认',
    center: true,
    inputType: 'textarea',
    inputPlaceholder: '请输入删除原因',
    inputErrorMessage: '请输入删除原因'
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled'
      })
    })
}

</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
