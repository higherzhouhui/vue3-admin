<template>
  <div class="user-list-wrap">
    <ProForm
      ref="formRef"
      :inline="true"
      :columns="state.formColumns"
    >
      <template #submitSlot>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
            :loading="listLoading"
          >查询</el-button>
        </el-form-item>
      </template>
    </ProForm>
    <div class="">
      <el-button
        type="primary"
        @click="checkDia = true;checkDiaType = 'add'"
      >
        <el-icon>
          <CirclePlus />
        </el-icon>
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
        <el-switch v-model="row.status" />
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
      center
      v-model="checkDia"
      :title="checkDiaType==='add'?'添加':(checkDiaType==='show'?'查看':'修改')"
      width="600px"
    >
      <ProForm
        ref="addFormRef"
        :columns="state.addFormColumns"
        label-width="80px"
      >
        <template #submitSlot>
          <el-form-item>
            <el-button
              size="medium"
              @click="cancelDia"
            >取消</el-button>
            <el-button
              type="primary"
              size="medium"
              @click="addForm"
            >保存</el-button>
          </el-form-item>
        </template>
      </ProForm>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { useRequest } from 'ahooks-vue'
import Table from '@/components/ProTable/index.vue'
import ProForm from '@/components/ProForm/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { conditionpage, conditionadd } from '@/api/RiskManagement'
import { formatTime } from '@/utils/index'

const codeType = {
  1: '>',
  2: '=',
  3: '>=',
  4: '<'
}

const state = reactive({
  formRef: null,
  formColumns: [
    {
      type: 'input',
      prop: 'name',
      label: '名称',
      placeholder: '请输入名称'
    },
    {
      type: 'input',
      prop: 'value',
      label: '值',
      placeholder: '请输入值'
    },
    {
      type: 'select',
      prop: 'code',
      label: '运算符',
      list: [{ value: 1, label: '>' }, { value: 2, label: '=' }, { value: 3, label: '>=' }, { value: 4, label: '<' }],
      defaultValue: 0,
      placeholder: '请选择'
    },
    {
      slot: 'submitSlot'
    }
  ],
  recordList: [],
  columns: [
    { type: 'selection' },
    { prop: 'name', label: '名称' },
    { prop: 'code', label: '运算符', formatter: row => codeType[row.code] },
    { prop: 'value', label: '值' },
    { prop: 'remarks', label: '备注' },
    { prop: 'createTime', label: '创建时间', width: 180, formatter: (row) => formatTime(row.createTime) ?? '' },
    { prop: 'operator', label: '修改人' },
    { prop: 'updateTime', label: '修改时间', width: 180, formatter: (row) => row.updateTime ? formatTime(row.updateTime) : '' },
    { label: '操作', field: 'right', slot: 'action', width: 250 }
  ],
  total: 30,
  query: {
    limit: 10,
    page: 1
  },
  checkDiaType: '',
  checkDia: false,
  checkFormRef: null,
  checkForm: {
    account: ''
  },
  addFormColumns: [
    {
      type: 'input',
      prop: 'name',
      label: '名称',
      placeholder: '请输入名称',
      rule: [{ required: true, message: '请输入名称' }]
    },
    {
      type: 'select',
      prop: 'code',
      label: '运算符',
      list: [{ value: 0, label: '全部' }, { value: 1, label: '>' }, { value: 2, label: '=' }, { value: 3, label: '>=' }, { value: 4, label: '<' }],
      defaultValue: 0,
      placeholder: '请选择',
      rule: [{ required: true, message: '请选择运算符' }]
    },
    {
      type: 'input',
      prop: 'value',
      label: '值',
      placeholder: '请输入值',
      rule: [{ required: true, message: '请输入名请输入值称' }]
    },
    {
      type: 'textarea',
      prop: 'remarks',
      label: '备注',
      placeholder: '请输入备注'
    },
    {
      slot: 'submitSlot'
    }
  ],
  addFormRef: null
})
const { formRef, checkDia, checkForm, checkFormRef, checkDiaType, addFormRef } = toRefs(state)

const { run: listRun, loading: listLoading } = useRequest(() => conditionpage(state.query), {
  onSuccess(res) {
    state.recordList = res.list
    state.total = res.total
  }
})

function pageUpdate(val) {
  state.query.page = val
  listRun()
}
function sizeUpdate(val) {
  state.query.limit = val
  listRun()
}

function search() {
  state.query.name = formRef.value.data.name
  state.query.value = formRef.value.data.value
  if (!formRef.value.data.status) {
    delete state.query.code
  } else {
    state.query.code = formRef.value.data.status
  }
  state.query.page = 1
  listRun()
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

// 新增
const { run: addRun } = useRequest(conditionadd, {
  manual: true,
  onSuccess() {
    ElMessage.success('新增成功')
    state.checkDia = false
    state.query.page = 1
    listRun()
  }
})
function addForm() {
  addFormRef.value.form.validate(valid => {
    if (valid) {
      addRun(addFormRef.value.data)
    }
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
