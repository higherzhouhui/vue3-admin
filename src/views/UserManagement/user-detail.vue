<template>
  <div class="user-detail-wrap">
    <div class="block">
      <h2>
        <svg-icon icon-class="com_title_ic_line"></svg-icon>
        <span>用户基本信息</span>
      </h2>
      <el-row :gutter="40">
        <el-col :sm="24" :xl="16">
          <table>
            <tr>
              <th>姓名</th>
              <td>张德帅</td>
              <th>用户层级</th>
              <td></td>
              <th>手机号</th>
              <td></td>
            </tr>
            <tr>
              <th>证件类型</th>
              <td>张德帅</td>
              <th>证件号码</th>
              <td></td>
              <th>邮箱</th>
              <td></td>
            </tr>
            <tr>
              <th>用户账号</th>
              <td>张德帅</td>
              <th>昵称</th>
              <td></td>
              <th>注册时间</th>
              <td></td>
            </tr>
          </table>
        </el-col>
        <el-col :sm="24" :xl="8">
          <table>
            <tr>
              <th>总成交单</th>
              <td>88</td>
              <th>成交率</th>
              <td>95%</td>
              <th>平均成交时间</th>
              <td>6分钟</td>
              <th>平均放币时间</th>
              <td>2分钟</td>
            </tr>
          </table>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <el-row :gutter="80">
        <el-col :sm="24" :xl="8">
          <h2>
            <svg-icon icon-class="com_title_ic_line"></svg-icon>
            <span>基础认证信息</span>
            <el-tag class="ml-2" type="success" round>
              <svg-icon icon-class="com_btn_ic_authentication" style="width: 14px; height: 14px"></svg-icon>
              已认证
            </el-tag>
          </h2>
          <table>
            <tr>
              <th>国家</th>
              <td>张德帅</td>
            </tr>
            <tr>
              <th>邮箱</th>
              <td>张德帅</td>
            </tr>
            <tr>
              <th>身份证号</th>
              <td>张德帅</td>
            </tr>
          </table>
        </el-col>
        <el-col :sm="24" :xl="16">
          <h2>
            <svg-icon icon-class="com_title_ic_line"></svg-icon>
            <span>高级认证信息</span>
          </h2>
          <p class="user-detail-tip">点击即可放大查看原图</p>
          <el-row>
            <el-col :span="8">
              <div class="user-detail-pics">
                <span>身份证正面</span>
                <el-image
                  style="width: 100px; height: 100px"
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  :preview-src-list="state.srcList"
                  :initial-index="0"
                  fit="cover"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="user-detail-pics">
                <span>身份证正面</span>
                <el-image
                  style="width: 100px; height: 100px"
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  :preview-src-list="state.srcList"
                  :initial-index="0"
                  fit="cover"
                />
              </div>
            </el-col>
            <el-col :span="8">
              <div class="user-detail-pics">
                <span>身份证正面</span>
                <el-image
                  style="width: 100px; height: 100px"
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  :preview-src-list="state.srcList"
                  :initial-index="0"
                  fit="cover"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <h2>
        <svg-icon icon-class="com_title_ic_line"></svg-icon>
        <span>审核</span>
      </h2>
      <el-form :model="checkForm" ref="checkFormRef">
        <el-form-item>
          <el-radio-group v-model="checkForm.isChecked" prop="isChecked">
            <el-radio label="审核通过" />
            <el-radio label="审核失败" />
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="reason">
          <el-input
            v-model="checkForm.reason"
            :rows="2"
            type="textarea"
            placeholder="请输入原因"
            style="width: 560px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="submitForm">确认审核</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive({
  checkForm: {
    isChecked: false,
    reason: '',
  },
  srcList: ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'],
})

const { checkForm } = toRefs(state)

function submitForm() {}
</script>

<style lang='scss' scoped>
.user-detail-wrap {
  .block {
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
    margin-bottom: 20px;

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
</style>
