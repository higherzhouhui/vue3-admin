<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      :rules="rules"
      class="demo-form-inline"
    >
      <el-form-item
        label="角色名称"
        prop="user"
      >
        <el-input
          v-model="formInline.user"
          placeholder="请输入角色名称"
        />
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select
          v-model="formInline.region"
          placeholder="请选择部门"
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
        <el-button
          type="primary"
          @click="onSubmit"
        >新增</el-button>
      </el-form-item>
    </el-form>
    <div class="role-wrap">
      <div class="role-wrap-one">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >用户管理</el-checkbox>
      </div>
      <div class="role-wrap-two">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >用户列表</el-checkbox>
        <el-checkbox-group
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox
            v-for="city in cities"
            :key="city"
            :label="city"
          >{{
      city
    }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRequest } from 'ahooks-vue'
import { systemrole } from '@/api/SystemManagement'

const formInline = reactive({
  user: '',
  region: ''
})
const rules = reactive({
  user: [{ required: true, message: '请输入角色名称' }]
})

const onSubmit = () => {
  console.log('submit!')
}

const checkedCities = ref([])
const cities = ['用户查询', '用户审核', '用户导出', '账号状态开关', '用户详情']

function handleCheckedCitiesChange() { }

</script>

<style lang='scss' scoped>
.role-wrap {
  border: 1px solid var(--border-color);

  &-one {
    height: 50px;
    background: #f6f8fb;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  &-two {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    > :deep(.el-checkbox) {
      width: 15%;
    }

    :deep(.el-checkbox-group) {
      flex: 1;

      .el-checkbox {
        width: 130px;
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
  }
}
</style>
