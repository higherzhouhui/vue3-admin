<template>
  <ProForm ref="formRef" :columns="formColumns" label-width="110px" :disabled="isView">
    <template #submitSlot>
      <el-form-item>
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-form-item>
    </template>
  </ProForm>
</template>

<script setup>
import { toRefs, reactive, defineProps, watchEffect } from 'vue'
import { useRequest } from 'ahooks-vue'
import ProForm from '@/components/ProForm/index.vue'
import { systemdeptlist, systemuseradd, systemrole, systemuseredit } from '@/api/SystemManagement'
import { ElMessage } from 'element-plus'

const props = defineProps({
  type: {
    type: String,
    default: 'add',
  },
  isAdd: {
    type: Boolean,
    default: false,
  },
  isView: {
    type: Boolean,
    default: false,
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
  itemData: {
    type: Object,
    default: {},
  },
})

const state = reactive({
  formRef: null,
  formColumns: [
    {
      type: 'input',
      prop: 'username',
      label: '用户账号',
      width: '100%',
      rule: [{ required: true, message: '请输入用户账号' }],
    },
    //  {
    //   type: 'input',
    //   prop: 'username',
    //   label: '确认密码',
    //   width: '100%',
    //   rule: [{ required: true, message: '请输入确认密码' }]
    // },
    // {
    //   type: 'radio',
    //   prop: 'ssex',
    //   label: '性别',
    //   width: '100%',
    //   list: [{ label: '男', value: '男' }, { label: '女', value: '女' }],
    //   rule: [{ required: true, message: '请输入用户账号' }]
    // },
    {
      type: 'input',
      prop: 'password',
      label: '密码',
      rule: [{ required: true, message: '请输入密码' }],
    },
    {
      type: 'input',
      prop: 'repassword',
      label: '确认密码',
      rule: [
        { required: true, message: '请输入确认密码' },
        {
          validator: (rule, value, callback) => {
            if (state.formColumns.password !== state.formColumns.repassword) {
              callback(new Error('两次密码输入不一致'))
            }
            callback()
          },
        },
      ],
    },
    // {
    //   type: 'input',
    //   prop: 'mobile',
    //   label: '手机号',
    //   placeholder: '请填写手机号',
    //   width: '100%',
    //   rule: [{ required: true, message: '请填写手机号' }],
    // },
    {
      type: 'select',
      prop: 'deptId',
      label: '所属部门',
      placeholder: '请选择部门',
      width: '100%',
      optionLabel: 'deptName',
      value: 'deptId',
      list: [],
      rule: [{ required: true, message: '请选择部门' }],
    },
    {
      type: 'select',
      multiple: true,
      prop: 'roleId',
      label: '用户角色',
      placeholder: '请选择角色',
      width: '100%',
      optionLabel: 'roleName',
      value: 'roleId',
      list: [],
      rule: [{ required: true, message: '请选择角色' }],
    },
    {
      type: 'input',
      prop: 'email',
      label: '电子邮箱',
    },
    {
      slot: 'submitSlot',
    },
  ],
  fileList: [],
})
const { formColumns, fileList, formRef } = toRefs(state)

const validatePass = () => {
  console.log(formRef.value)
  return true
}

// 部门列表
const { run: deptRun } = useRequest(systemdeptlist, {
  onSuccess(res) {
    const deptIndex = state.formColumns.findIndex(item => item.prop === 'deptId')
    state.formColumns[deptIndex].list = res
  },
})

// 角色列表
const { run: listRun, loading: listLoading } = useRequest(() => systemrole({ limit: 9999, page: 1 }), {
  onSuccess(res) {
    const roleIndex = state.formColumns.findIndex(item => item.prop === 'roleId')
    state.formColumns[roleIndex].list = res.list
  },
})

watchEffect(() => {
  if (props?.isAdd && state.formColumns[2].prop === 'password') {
    state.formColumns.splice(2, 2)
  }
  if (props?.isClosed) {
    formRef.value.data.deptId = ''
    formRef.value.data.email = ''
    formRef.value.data.mobile = ''
    formRef.value.data.ssex = ''
    formRef.value.data.username = ''
    formRef.value.data.roleId = []
  }
  if (props.type !== 'add' && formRef.value?.data && props.itemData) {
    console.log(1)
    formRef.value.data.deptId = props.itemData.deptId
    formRef.value.data.email = props.itemData.email
    formRef.value.data.mobile = props.itemData.mobile
    formRef.value.data.ssex = props.itemData.ssex
    formRef.value.data.username = props.itemData.username

    var reg = /^.*[\,，].*$/
    if (reg.test(formRef.value.data.roleId)) {
      formRef.value.data.roleId = props.itemData.roleId.split(',')
    } else {
      formRef.value.data.roleId[0] = props.itemData.roleId * 1
    }
    console.log(formRef.value.data.roleId)
  }
})

const $emit = defineEmits(['cancle'])
function cancle() {
  formRef.value.form.resetFields()
  $emit('cancle', true)
}

const { run: submitRun } = useRequest(systemuseradd, {
  manual: true,
  onSuccess() {
    ElMessage({
      message: '用户新增成功',
      type: 'success',
    })
    formRef.value.form.resetFields()
    $emit('success', true)
  },
})

const { run: editRun } = useRequest(systemuseredit, {
  manual: true,
  onSuccess() {
    ElMessage({
      message: '用户修改成功',
      type: 'success',
    })
    formRef.value.form.resetFields()
    $emit('success', true)
  },
})

function submitForm() {
  formRef.value.form.validate(valid => {
    if (valid) {
      if (props.isAdd && !props.isView) {
        const { username, deptId, roleId, userId, ssex, email } = formRef.value.data
        editRun({ username, deptId, roleId: roleId.join(','), userId, ssex, email })
      } else {
        submitRun(formRef.value.data)
      }
    }
  })
}
</script>

<style lang='scss' scoped>
</style>
