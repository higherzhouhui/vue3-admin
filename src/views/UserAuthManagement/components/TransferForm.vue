<template>
  <el-form
    ref="formRef"
    label-position="left"
    :model="formColumns"
  >
    <p class="title">转账层级</p>
    <el-form-item label="转账层级">
      <el-input
        v-model="formColumns.name"
        placeholder="请输入层级 (正整数)"
      />
    </el-form-item>
    <p class="title">层级条件 <span>勾选该层级所需的条件，各个可勾选条件之间是且的关系</span></p>
    <el-form-item>
      <el-checkbox-group v-model="formColumns.checkList">
        <el-checkbox label="绑定姓名" />
        <el-checkbox label="绑定身份证号" />
        <el-checkbox label="绑定手机号" />
        <el-checkbox label="绑定银行卡" />
        <el-checkbox label="绑定邮箱" />
        <el-checkbox label="绑定谷歌验证" />
        <el-checkbox label="通过身份认证" />
      </el-checkbox-group>
    </el-form-item>
    <p class="title">每日转账限额 <span>不填表示不限制</span></p>
    <el-form-item label="转账次数">
      <el-input
        v-model="formColumns.name"
        placeholder="请输入每日可用转账次数 (正整数)"
      />
    </el-form-item>
    <el-form-item label="出售次数">
      <el-input
        v-model="formColumns.name"
        placeholder="请输入每日出售次数 (正整数)"
      />
    </el-form-item>
    <el-form-item label="转账限额">
      <el-input
        v-model="formColumns.name"
        placeholder="请输入每日转账限额上线 (正整数)"
      />
    </el-form-item>
    <p class="title">修改或添加原因 <span>必填</span></p>
    <el-form-item label="转账原因">
      <el-input
        v-model="formColumns.name"
        placeholder="请输入添加原因"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
      />
    </el-form-item>
    <el-form-item style="padding-left: 70px;">
      <el-button
        type="primary"
        @click="submitForm"
      >确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { toRefs, reactive } from 'vue'
import ProForm from '@/components/ProForm/index.vue'

const state = reactive({
  formRef: null,
  formColumns: {
    name: '',
    checkList: []
  },
  fileList: []
})
const { formColumns, fileList, formRef
} = toRefs(state)

function handleChange() { }

const $emit = defineEmits(['cancel'])
function cancleDia() {
  formRef.value.form.resetFields()
  $emit('cancel', true)
}

function submitForm() {
  console.log(formRef.value)
  formRef.value.validate(valid => {
    if (valid) {
      console.log(formRef.value)
      cancleDia()
    }
  })
}

</script>

<style lang='scss' scoped>
.title {
  font-size: 14px;
  font-weight: 500;
  color: #1f2028;
  line-height: 20px;
  margin-bottom: 16px;
  position: relative;
  padding-left: 7px;

  span {
    color: #9da5c0;
    font-weight: normal;
  }

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 12px;
    background: #178aff;
    left: 0;
    top: 50%;
    margin-top: -6px;
  }
}
</style>
