<template>
  <div class="user-list-wrap">
    <div class="titles">推广域名配置</div>
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <!-- <el-form-item label="登录名:" class="form-items-body">
        <el-input v-model="state.formInline.account" placeholder="请输入登录名" class="form-items" clearable />
      </el-form-item> -->
      <el-form-item label="代理账号:" class="form-items-body">
        <el-input v-model="state.formInline.agentAccount" placeholder="请输入代理账号" class="form-items" clearable />
      </el-form-item>
      <el-form-item label="代理级别:" class="form-items-body">
        <!-- <el-select v-model="state.formInline.agentLevel" class="m-2 form-items" placeholder="请选择代理级别" clearable>
          <el-option :value="1" label="总代"></el-option>
          <el-option :value="2" label="一级代理"></el-option>
          <el-option :value="3" label="二级代理"></el-option>
        </el-select> -->
        <el-input v-model="state.formInline.agentLevel" placeholder="请输入代理级别" class="form-items" clearable />
      </el-form-item>
      <el-form-item>
        <el-button class="buts" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="padding: 12px; background: #fafafa; border-radius: 10px">
      <Table
        :data="state.recordList"
        :columns="state.columns"
        :total="state.total"
        :pageSize="state.pageSize"
        :current="state.current"
        :pageUpdate="pageUpdate"
        :sizeUpdate="sizeUpdate"
      >
        <template #privateDomain="{ row }">
          <div v-if="row.privateDomainsDemo[0] !== undefined">
            <div v-for="item in row.privateDomainsDemo" :key="item">{{ item }}</div>
          </div>
        </template>
        <template #action="{ row }">
          <el-button type="success" size="small" plain icon="Document" @click="showDia(row)"> 绑定域名 </el-button>
          <!-- <el-button type="danger" size="small" plain icon="Document" @click="deleteAddress(row)"> 禁用 </el-button> -->
          <!-- <el-button type="warning" size="small" plain icon="Document" @click="share(row)"> 分享二维码 </el-button> -->
        </template>
      </Table>
    </div>
    <el-dialog
      v-model="checkDia"
      :before-close="cancelDia"
      :title="state.checkDiaType === '1' ? '域名绑定' : '分享二维码'"
      width="35%"
    >
      <div v-if="state.checkDiaType === '1'">
        <el-scrollbar max-height="200px">
          <el-form
            :model="checkForm"
            ref="checkFormRef"
            label-width="140px"
            label-position="left"
            style="min-height: 200px"
          >
            <el-form-item prop="cnameId" label="网关IP/cname域名">
              <div class="private">
                <el-input :value="state.cname" disabled placeholder="请输入网关IP/cname域名" clearable class="inputs" />
              </div>
            </el-form-item>
            <el-form-item prop="account1" label="绑定私有域名">
              <div class="private">
                <el-input v-model="checkForm.account1" placeholder="请输入私有域名" clearable class="inputs" />
                <el-button @click="addRules" style="margin-left: 25px; border: none; background: none"
                  ><el-icon> <img src="../../assets/imgs/sy/jia.png" alt="" class="inputs_img" /> </el-icon
                ></el-button>
              </div>
            </el-form-item>

            <el-form-item label="绑定私有域名" v-for="(item, index) in checkForm.rules" :key="item.id">
              <div class="private">
                <el-input
                  v-model="checkForm.rules[index].rules"
                  placeholder="请输入私有域名"
                  clearable
                  class="inputs"
                />
                <el-button @click="addMinus(item, index)" style="margin-left: 25px; border: none; background: none"
                  ><el-icon> <img src="../../assets/imgs/sy/jian.png" alt="" class="inputs_img" /> </el-icon
                ></el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <!-- 分享 -->
      <div v-if="state.checkDiaType === '2'" class="share">
        <div class="share_div">
          <div class="share_div2">
            <qrcode-vue :value="'私有推广链接二维码'" id="captureId" style="width: 120px; height: 120px"></qrcode-vue>
            <div>私有推广链接二维码</div>
          </div>
          <el-button round @click="createPicture('captureId')" class="share_div_but">保存</el-button>
        </div>
        <div class="share_div">
          <div class="share_div2">
            <qrcode-vue :value="'通用推广链接二维码'" id="captureId2" style="width: 120px; height: 120px"></qrcode-vue>
            <div>通用推广链接二维码</div>
          </div>
          <el-button round @click="createPicture('captureId2')" class="share_div_but">保存</el-button>
        </div>
      </div>
      <template #footer v-if="state.checkDiaType === '1'">
        <div class="but">
          <el-button size="medium" @click="cancelDia" class="buts1">取消</el-button>
          <el-button type="primary" size="medium" @click="addForm" class="buts2">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, toRefs, onMounted } from 'vue'
import Table from '@/components/ProTable/index.vue'
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'
import { list, bind } from '@/api/extension/extension'
import { ElMessage } from 'element-plus';

const state = reactive({
  recordList: [],
  columns: [
    { prop: 'agentAccount', label: '代理账号' },
    { prop: 'agentLevelType', label: '代理级别' },
    { prop: 'parentAccount', label: '上级代理' },
    { prop: 'promoteDomain', label: '通用推广链接', width: 200 },
    { prop: 'cname', label: '绑定网关IP/cname域名', width: 200 },
    { prop: 'privateDomains', label: '绑定私有域名', width: 200, slot: 'privateDomain' },
    { label: '操作', fixed: 'right', slot: 'action', width: 150 },
  ],
  levelList: [
    {label: '全部', value: ''},
    {label: '总代', value: 0},
    {label: '一级代理', value: 1},
    {label: '二级代理', value: 2},
    {label: '三级代理', value: 3},
    {label: '四级代理', value: 4},
  ],
  total: 0,
  pageSize: 10,
  current: 1,
  formInline: {},
  checkDia: false,
  checkFormRef: null,
  checkForm: {
    cnameId: '',
    account1: '',
    rules: [],
  },
  checkDiaType: '',
  agentId: '',
  domainId: '',
  cnameId: '',
  promoteDomain: '',
  cname: '',
})
const { checkDia, checkForm, checkFormRef } = toRefs(state)

onMounted(() => {
  listData()
})
const listData = () => {
  // state.formInline
  list(state.formInline).then(item => {
    if (item.code === 200) {
      item.rows.forEach((value, index) => {
        value.privateDomainsDemo = value.privateDomains.split('|')
        value.agentLevelType = state.levelList[value.agentLevel].label;
        value.parentAccount = value.parentAccount || '无';
      })
      state.recordList = item.rows
      state.total = item.total
    }
    console.log(item)
  })
}

// 查询
const query = () => {
  listData()
  console.log(state.formInline)
}

// 绑定域名
const showDia = data => {
  console.log('绑定域名', data)
  state.agentId = data.agentId
  state.cnameId = data.cnameId
  state.cname = data.cname
  state.domainId = data.domainId
  state.promoteDomain = data.promoteDomain
  state.checkDia = true
  state.checkDiaType = '1'
}
// 禁用
const deleteAddress = data => {
  console.log('禁用', data)
}

// 分享
const share = data => {
  console.log('分享', data)
  state.checkDia = true
  state.checkDiaType = '2'
}
// 保存二维码
const createPicture = ids => {
  html2canvas(document.querySelector(`#${ids}`)).then(res => {
    let imgUrl = res.toDataURL('image/png')
    // console.log('图片临时地址',imgUrl)
    let aLink = document.createElement('a')
    aLink.href = imgUrl
    aLink.download = new Date().toLocaleString() + '.png' //导出文件名，这里以时间命名
    document.body.appendChild(aLink)
    // 模拟a标签点击事件
    aLink.click()
    // 事件已经执行，删除本次操作创建的a标签对象
    document.body.removeChild(aLink)
  })
}

// 添加私有域名
const addRules = () => {
  state.checkForm.rules = [...state.checkForm.rules, { id: state.checkForm.rules.length + 1, rules: '' }]
}
// 减私有域名
const addMinus = (data, index) => {
  console.log(data, index)
  state.checkForm.rules.forEach(item => {
    if (item.id === data.id) {
      state.checkForm.rules.splice(index, 1)
    }
  })
}

const resetForm = () => {
  console.log(checkFormRef.value)
  checkFormRef.value.resetFields()
}
// 取消
const cancelDia = () => {
  checkFormRef.value !== null && checkFormRef.value.resetFields()
  checkDia.value = false
  state.checkForm.rules = []
}

// 保存
const addForm = () => {
  console.log(state.agentId, state.checkForm)
  let data = {
    agentId: state.agentId,
    cnameId: state.cnameId,
    privateDomain: '',
    domainId: state.domainId,
    promoteDomain: state.promoteDomain,
  }

  if (state.checkForm.rules[0] !== undefined) {
    let a = ''
    state.checkForm.rules.forEach((value, index) => {
      a += `,${value.rules}`
    })
    console.log(a)
    data.privateDomain = `${state.checkForm.account1}${a}`
  } else {
    data.privateDomain = state.checkForm.account1
  }

  bind(data).then(item => {
    if (item.code === 200) {
      cancelDia()
      listData() //刷新
      ElMessage.success('成功')
    } else {
      ElMessage.error(item.msg)
    }
  })
  // console.log(state.checkForm, data)
}
function pageUpdate(val) {}
function sizeUpdate(val) {}

function submitForm() {
  checkFormRef.value.validate(valid => {
    console.log(valid)
  })
}
</script>

<style lang="scss" scoped>
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.but {
  display: flex;
  justify-content: flex-end;
}
.buts1 {
  width: 103px;
  height: 42px;
  background: #f5f7fe;
  border-radius: 29px;
  border: none;
}
.buts2 {
  width: 103px;
  height: 42px;
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 29px;
  border: none;
}
.private {
  display: flex;
  align-items: center;
  .inputs {
    width: 250px;
    height: 42px;
  }
}
.elForm {
  padding-right: 10px;
  max-height: 200px;
  overflow: hidden;
  margin-bottom: 10px;
}
.elForm:hover {
  padding-right: 10px;
  max-height: 200px;
  overflow-y: scroll;
  margin-bottom: 10px;
}
.elForm::-webkit-scrollbar {
  width: 8px;
  border-radius: 10px;
}
.elForm::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.elForm::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}

.share {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .share_div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 244px;
    width: 206px;

    .share_div2 {
      width: 206px;
      height: 206px;
      border-radius: 10px 10px 0px 0px;
      background: #fafafa;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-around;
      div {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
      }
    }
    .share_div_but {
      width: 100%;
      height: 38px;
      background: #efe9fb;
      border-radius: 0px 0px 10px 10px;
      border: none;

      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #5f2ae0;
    }
  }
}
.titles {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  padding: 16px 0;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 15px;
}
.buts {
  background: linear-gradient(128deg, #eb9bff 0%, #e067ff 37%, #5e29e0 100%);
  border-radius: 5px;
  border: none;
  width: 90px;
  height: 32px;
  color: #fff;
}
.form-items {
  width: 200px !important;
}
.form-items-body {
  margin-left: 20px;
  margin-right: 20px;
}
.inputs_img {
  width: 42px;
  height: 42px;
}
</style>
