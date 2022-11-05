<template>
  <div class="transfer-condition-wrap">
    <div class="">
      <el-button
        type="primary"
        @click="checkDia = true"
        icon="Plus"
      >
        新增转账条件
      </el-button>
      <el-button
        type="primary"
        icon="Document"
      >
        操作日志
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
          icon="Document"
        >
          修改
        </el-button>
        <el-button
          type="primary"
          size="small"
          plain
          icon="Delete"
          @click="deleteAddress(row)"
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
      <TransferForm @cancel="cancel" />
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Table from '@/components/ProTable/index.vue'
import TransferForm from './components/TransferForm.vue'

const state = reactive({
  recordList: [
    { id: 12, account: 'fhjdf', level: 2, name: 'sdfdf', mobile: '21334324324', email: '23434354@45', nick: 'aaa', type: '普通用户', authLevel: 1, checkStatus: '已认证', status: true }
  ],
  columns: [
    { type: 'index', label: '序号', width: 120 },
    { prop: 'account', label: '转账层级' },
    { prop: 'level', label: '条件' },
    { prop: 'name', label: '转账限制' },
    { label: '操作', slot: 'action', width: 180 }
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
  }
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

function deleteAddress(row) {
  handleClose()
}
const handleClose = (done) => {
  ElMessageBox.confirm('确定更新该条数据？')
    .then(() => {
      ElMessage.success('删除成功')
      done()
    })
    .catch(() => {
      // catch error
    })
}

function cancel() { }

</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
