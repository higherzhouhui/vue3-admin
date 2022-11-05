<template>
  <div class="user-detail-wrap">
    <div class="block">

      <Table
        class="mt-20"
        :data="state.recordList"
        :columns="state.columns"
      ></Table>

      <h2 style="margin-top: 40px;">
        <svg-icon icon-class="com_title_ic_line"></svg-icon>
        <span>转账者基本信息</span>
      </h2>
      <el-row :gutter="80">
        <el-col :span="16">
          <table>
            <tr>
              <th>姓名</th>
              <td>张德帅</td>
              <th>用户层级</th>
              <td></td>
              <th>邮箱</th>
              <td></td>
            </tr>
            <tr>
              <th>证件类型</th>
              <td></td>
              <th>昵称</th>
              <td></td>
              <th></th>
              <td></td>
            </tr>
            <tr>
              <th>证件号码</th>
              <td></td>
              <th>手机号</th>
              <td></td>
              <th></th>
              <td></td>
            </tr>
          </table>
        </el-col>
        <el-col :span="8">
          <el-row class="transfer-record-count">
            <el-col :span="12">
              <div class="transfer-record-count-item">
                <p>890</p>
                <p>总成交单</p>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="transfer-record-count-item">
                <p>95%</p>
                <p>成交率</p>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <h2>
        <svg-icon icon-class="com_title_ic_line"></svg-icon>
        <span>风控审核资料</span>
      </h2>
      <div class="transfer-record-list">
        <span>风控类型</span>
        <p>资金审核</p>
      </div>
      <div class="transfer-record-list">
        <span>风控原因</span>
        <p>资金审核</p>
      </div>
      <div class="transfer-record-list">
        <span>审核文件</span>
        <p>资金审核</p>
      </div>
    </div>
    <div class="block">
      <h2>
        <svg-icon icon-class="com_title_ic_line"></svg-icon>
        <span>风控审核结果</span>
      </h2>
      <el-form
        class="mt-20"
        :model="checkForm"
        ref="checkFormRef"
      >
        <el-form-item prop="reason">
          <el-input
            v-model="checkForm.reason"
            :rows="2"
            type="textarea"
            placeholder="请输入原因"
            style="width: 560px;"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="submitForm"
          >审核通过</el-button>
          <el-button
            size="medium"
            @click="submitForm"
          >审核失败</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import Table from '@/components/ProTable/index.vue'

const state = reactive({
  checkForm: {
    isChecked: false,
    reason: ''
  },
  srcList: ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'],
  recordList: [
    { id: 12, account: 'fhjdf', level: 2, name: 'sdfdf', mobile: '21334324324', email: '23434354@45', nick: 'aaa', type: '普通用户', authLevel: 1, checkStatus: '已认证', status: true }
  ],
  columns: [
    { prop: 'account', label: '用户账号' },
    { prop: 'level', label: '姓名' },
    { prop: 'name', label: '交易流水号' },
    { prop: 'mobile', label: '币种名称', width: 200, showOverflowTooltip: true },
    { prop: 'email', label: '钱包协议' },
    { prop: 'email', label: '转账个数' },
    { prop: 'type', label: '发送地址(钱包地址)', width: 200, showOverflowTooltip: true },
    { prop: 'authLevel', label: '接收地址', width: 200, showOverflowTooltip: true },
    { prop: 'type', label: '到账时间' }
  ],
  total: 30,
  pageSize: 15,
  current: 1
})

const { checkForm } = toRefs(state)

function submitForm() { }

</script>

<style lang='scss' scoped>
.user-detail-wrap {
  .block {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
    margin-bottom: 40px;

    &:last-child {
      border-bottom: 0;
    }

    &:first-child h2 {
      margin-top: 0;
    }
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-top: 20px;

    // &:first-child {
    //   margin-top: 0;
    // }

    span {
      margin: 0 10px 0 4px;
    }

    .svg-icon {
      width: 12px;
      height: 12px;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #ebeef3;
    font-size: 14px;
    margin-top: 20px;

    th,
    td {
      border: 1px solid #ebeef3;
      height: 44px;
    }

    td {
      padding-left: 20px;
    }

    th {
      font-weight: normal;
      text-align: center;
      background: #f6f8fb;
      width: 100px;
    }
  }

  .user-detail-tip {
    font-size: 14px;
    color: #9da5c0;
    // margin-top: -15px;
  }

  .user-detail-pics {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    color: #4c4d53;
    margin-top: 30px;

    .el-image {
      border-radius: 4px;
      margin-left: 20px;
    }
  }
}

.transfer-record-count {
  height: 100%;

  &-item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    color: #4c4d53;

    p:first-child {
      font-weight: bold;
      color: var(--el-color-primary);
      font-size: 26px;
      margin-bottom: 20px;
    }
  }
}

.transfer-record-list {
  display: flex;
  align-self: center;
  font-size: 14px;
  color: #4c4d53;
  margin-top: 16px;

  p {
    color: #1f2028;
    margin-left: 16px;
  }
}
</style>
