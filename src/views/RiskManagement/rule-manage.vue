<template>
  <div class="user-list-wrap">
    <!-- <yu-layout>
      <template #head> -->
    <el-form
      :inline="true"
      :model="state.formInline"
      class="demo-form-inline"
    >
      <el-form-item label="名称">
        <el-input
          v-model="state.formInline.user"
          placeholder="请输入名称"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="state.formInline.user"
          placeholder="请选择状态"
        >
          <el-option
            label="Zone one"
            value="shanghai"
          />
          <el-option
            label="Zone two"
            value="beijing"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关系">
        <el-select
          v-model="state.formInline.user"
          placeholder="请选择关系"
        >
          <el-option
            label="Zone one"
            value="shanghai"
          />
          <el-option
            label="Zone two"
            value="beijing"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="">

      <el-button
        type="primary"
        @click="checkDia = true;checkDiaType = 'add'"
      >
        <el-icon><CirclePlus /></el-icon>
        添加
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
        <el-switch v-model="row.status" :before-change="changeStatus.bind(this, row)"/>
      </template>
      <template #action="{ row }">
        <el-button
          type="primary"
          size="small"
          plain
          icon="Document"
          @click="checkDia = true;checkDiaType = 'show'"
        >
          查看
        </el-button>
        <el-button
          type="primary"
          size="small"
          plain
          icon="Edit"
          @click="checkDia = true;checkDiaType = 'edit'"
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
      :title="checkDiaType==='add'?'添加':(checkDiaType==='show'?'查看':'修改')"
      width="35%"
    >
      <el-form
        :model="checkForm"
        ref="checkFormRef"
        label-width="60px"
        :disabled="checkDiaType === 'show'"
      >
        <el-form-item prop="account" label="名称">
          <el-input
            v-model="checkForm.account"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item prop="user" label="运算符" v-for="(item, index) in checkForm.rules" :key="index">
            <el-select
                v-model="checkForm.user"
                placeholder="请选择运算符"
                >
                <el-option
                    label="Zone one"
                    value="shanghai"
                />
                <el-option
                    label="Zone two"
                    value="beijing"
                />
            </el-select>
            <el-button @click="addRules" circle size="small" v-if="index == (checkForm.rules.length-1)" style="margin-left:25px"><el-icon><Plus /></el-icon></el-button>
        </el-form-item>
        <el-form-item prop="reason" label="关系">
            <el-select
                v-model="checkForm.user"
                placeholder="请选择关系"
                >
                <el-option
                    label="Zone one"
                    value="shanghai"
                />
                <el-option
                    label="Zone two"
                    value="beijing"
                />
            </el-select>
        </el-form-item>
        <el-form-item v-if="checkDiaType!=='show'">
          <el-button
            size="medium"
            @click="cancelDia"
          >取消</el-button>
          <el-button
            type="primary"
            size="medium"
            @click="submitForm"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
// import { el } from 'element-plus/es/locale'
import { reactive, toRefs } from 'vue'
import Table from '@/components/ProTable/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// import YuLayout from '@/components/YuLayout'

const state = reactive({
  recordList: [
    { id: 12, account: 'fhjdf', level: 2, name: 'sdfdf', mobile: '21334324324', email: '23434354@45', nick: 'aaa', type: '普通用户', authLevel: 1, checkStatus: '已认证', status: true }
  ],
  columns: [
    { type: 'selection' },
    { prop: 'account', label: '名称' },
    { prop: 'level', label: '包含条件' },
    { prop: 'level', label: '关系' },
    { prop: 'type', label: '创建时间' },
    { prop: 'authLevel', label: '修改人' },
    { prop: 'type', label: '修改时间' },
    { prop: 'name', label: '审核模式' },
    { prop: 'name', label: '当天触发' },
    { prop: 'name', label: '近7天触发', width: 100 },
    { label: '状态', slot: 'status' },
    { label: '操作', field: 'right', slot: 'action', width: 250 }
  ],
  total: 30,
  pageSize: 15,
  current: 1,
  formInline: {
    user: '',
    region: ''
  },
  checkDiaType: '',
  checkDia: false,
  checkFormRef: null,
  checkForm: {
    account: '',
    rules: [
      { value: 'selection' }
    ]
  }
})
const { checkDia, checkForm, checkFormRef, checkDiaType } = toRefs(state)

function pageUpdate(val) {

}
function sizeUpdate(val) {

}

function addRules() {
  console.log(checkForm.value.rules)
  checkForm.value.rules = [...checkForm.value.rules, [{ value: 'selection' }]]
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
    if (checkDiaType.value === 'add') {
      ElMessage.success('新增成功')
    } else if (checkDiaType.value === 'edit') {
      ElMessage.success('修改成功')
    }
    cancelDia()
  })
}

const changeStatus = (row) => {
  console.log(row)
  return new Promise((resolve, reject) => {
    const txt = row.status ? '确定禁用该条规则？' : '确定启用该条规则？'
    ElMessageBox.confirm(txt).then(() => {
      ElMessage.success('操作成功')
      // done()
      return resolve(true)
    }).catch(() => {
      return reject(new Error('Error'))
      // catch error
    })
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
</script>

<style lang='scss' scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>
