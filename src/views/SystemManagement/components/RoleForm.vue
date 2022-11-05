<template>
  <ProForm
    ref="formRef"
    :columns="formColumns"
    label-width="90px"
    :disabled="isView"
  >
    <template #roleTree>
      <el-form-item
        label="权限"
        prop="pics"
      >
        <el-tree
          ref="treeRef"
          :data="state.treeList"
          show-checkbox
          default-expand-all
          node-key="id"
          highlight-current
          :props="defaultProps"
        />
      </el-form-item>
    </template>
    <template #uploadPic>
      <el-form-item
        label="币种icon"
        prop="pics"
        :rules="[
        { required: true, message: '请上传图片' },
      ]"
      >
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :on-change="handleChange"
        >
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
    </template>
    <template #submitSlot>
      <el-form-item>
        <el-button @click="cancle">取消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
        >确定</el-button>
      </el-form-item>
    </template>
  </ProForm>
</template>

<script setup>
import { toRefs, reactive, defineProps } from 'vue'
import ProForm from '@/components/ProForm/index.vue'

const props = defineProps({
  isView: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  formRef: null,
  formColumns: [
    {
      type: 'input',
      prop: 'username',
      label: '角色名称',
      width: '100%',
      rule: [{ required: true, message: '请输入角色名称' }]
    },
    {
      type: 'select',
      prop: 'name',
      label: '所属部门',
      placeholder: '请选择所属部门',
      list: [{ value: 1, label: '4444' }],
      width: '100%',
      rule: [{ required: true, message: '请选择所属部门' }]
    },
    {
      slot: 'roleTree'
    },
    {
      slot: 'submitSlot'
    }
  ],
  treeRef: null,
  treeList: [{
    id: 1,
    label: '用户管理',
    children: [
      {
        id: 4,
        label: '用户列表',
        children: [
          {
            id: 9,
            label: '用户查询'
          },
          {
            id: 10,
            label: '用户审核'
          }
        ]
      }
    ]
  }]
})
const defaultProps = {
  children: 'children',
  label: 'label'
}
const { formColumns, fileList, formRef, treeRef
} = toRefs(state)

function handleChange() { }

const $emit = defineEmits(['cancle'])
function cancle() {
  formRef.value.form.resetFields()
  $emit('cancle', true)
}

function submitForm() {
  console.log(formRef.value)
  console.log(treeRef.value.getCheckedNodes())
  formRef.value.form.validate(valid => {
    if (valid) {
      console.log(formRef.value.data)
      console.log(treeRef.value.getCheckedNodes())
    }
  })
}

</script>

<style lang='scss' scoped>
</style>
