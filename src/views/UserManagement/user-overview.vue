<template>
  <div>
    <div class="titles">首页概况</div>
    <!-- 展示块信息 -->
    <div class="border">
      <div v-for="data in state.info" :key="data.id">
        <div v-if="data.id === '1'" class="border_div1">
          <div class="border_div1_font1">累计未结算佣金：{{ data.size3 }}</div>
          <div class="border_div1_font2">{{ data.size1 }}</div>
          <div>
            <div class="border_div1_font3">
              <img src="../../assets/imgs/sy/time.png" alt="" />
              <div>{{ data.size2 }}</div>
            </div>
            <div class="border_div1_font4">本期佣金统计截止：2022.10.31</div>
          </div>
        </div>
        <div v-if="data.id !== '1'" class="border_div2" :class="data.id === '3' && 'border_div3'">
          <div v-if="data.id !== '1'" class="border_div2_data_font">{{ data.id !== '2' ? '' : data.size5 }}</div>
          <div class="border_div2_data">
            <div class="border_div2_data_bottoms">
              <div>￥{{ data.size1 }}</div>
              <div class="border_div2_data_font3">
                <img src="../../assets/imgs/sy/money.png" alt="" v-if="data.id === '2'" />
                <img src="../../assets/imgs/sy/moneybig.png" alt="" v-if="data.id === '3'" />
                <div>{{ data.size2 }}</div>
              </div>
            </div>
            <div class="border_div2_data_big">
              <div v-for="item in data.size3" :key="item.id">
                <div>￥{{ item.money }}</div>
                <div class="border_div2_data_font4">
                  <img :src="item.img" alt="" />
                  <div :class="item.css">{{ item.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 表格1 -->
    <div class="tables1">
      <div>
        <div class="title_body titles">
          <div class="title">
            <div>最新存款会员</div>
          </div>
          <!-- <router-link to="/AgentManagement/subordinate-member" class="more_font">
            更多<el-icon><ArrowRight /></el-icon>
          </router-link> -->
        </div>
        <div style="padding: 12px; background: #fafafa; border-radius: 10px">
          <div class="pages">
            <el-button class="but" @click="pagesLeft" :disabled="state.pages1 === 0 ? true : false">
              <el-icon>
                <img src="../../assets/imgs/sy/left1.png" alt="" class="imgs2" />
              </el-icon>
            </el-button>
            <el-button class="but" @click="pagesRight" :disabled="state.pages1 + 1 === state.pagesBig1 ? true : false">
              <el-icon>
                <img src="../../assets/imgs/sy/right2.png" alt="" class="imgs2" />
              </el-icon>
            </el-button>
          </div>
          <Table :data="state.recordList" :columns="state.columns"> </Table>
        </div>
      </div>
      <div>
        <div class="title_body titles">
          <div class="title">
            <div>最新加入代理</div>
          </div>
        </div>
        <div style="padding: 12px; background: #fafafa; border-radius: 10px">
          <div class="pages">
            <el-button class="but" @click="pagesLeft2" :disabled="state.pages2 === 0 ? true : false">
              <el-icon>
                <img src="../../assets/imgs/sy/left1.png" alt="" class="imgs2" />
              </el-icon>
            </el-button>
            <el-button class="but" @click="pagesRight2" :disabled="state.pages2 + 1 === state.pagesBig2 ? true : false">
              <el-icon>
                <img src="../../assets/imgs/sy/right2.png" alt="" class="imgs2" />
              </el-icon>
            </el-button>
          </div>
          <Table :data="state.recordList2" :columns="state.columns2"> </Table>
        </div>
      </div>
      <div>
        <div class="title_body titles">
          <div class="title">
            <div>最新加入会员</div>
          </div>
        </div>
        <div style="padding: 12px; background: #fafafa; border-radius: 10px">
          <div class="pages">
            <el-button class="but" @click="pagesLeft3" :disabled="state.pages13 === 0 ? true : false">
              <el-icon>
                <img src="../../assets/imgs/sy/left1.png" alt="" class="imgs2" />
              </el-icon>
            </el-button>
            <el-button
              class="but"
              @click="pagesRight3"
              :disabled="state.pages13 + 1 === state.pagesBig13 ? true : false"
            >
              <el-icon>
                <img src="../../assets/imgs/sy/right2.png" alt="" class="imgs2" />
              </el-icon>
            </el-button>
          </div>
          <Table :data="state.recordList13" :columns="state.columns13"> </Table>
        </div>
      </div>
    </div>
    <!-- 切换表格 -->
    <div>
      <div class="title_body titles">
        <div class="title" style="margin-right: 25px; position: relative" @click="state.CheckThisMonth = true">
          <div :class="state.CheckThisMonth ? 'font_coloe1' : 'font_coloe2'">本月佣金统计</div>
          <img
            v-if="state.CheckThisMonth"
            src="../../assets/imgs/sy/titlebg.png"
            alt=""
            style="width: 100%; height: 6px; position: absolute; bottom: 0; left: 0"
          />
        </div>
        <div class="title" style="margin-right: 25px; position: relative" @click="state.CheckThisMonth = false">
          <div :class="!state.CheckThisMonth ? 'font_coloe1' : 'font_coloe2'">上月佣金统计</div>
          <img
            v-if="!state.CheckThisMonth"
            src="../../assets/imgs/sy/titlebg.png"
            alt=""
            style="width: 100%; height: 6px; position: absolute; bottom: 0; left: 0"
          />
        </div>
      </div>
      <div style="padding: 12px; background: #fafafa; border-radius: 10px">
        <Table class="table_center" :data="state.recordList3" :columns="state.columns3">
          <template #month="{ row }">
            <el-button type="primary" link>
              <router-link
                :to="
                  row.month === '直属会员'
                    ? '/ReportFormManagement/drawing-reportForm'
                    : '/ReportFormManagement/subordinate-reportForm'
                "
                class="link_font"
              >
                {{ row.month }}
              </router-link>
            </el-button>
          </template>
        </Table>
      </div>
    </div>
    <!-- 团队概览 -->
    <div>
      <div class="title_body titles">
        <div class="title">
          <div>团队概览</div>
        </div>
      </div>
      <div class="bottom_big">
        <div v-for="item in state.team" :key="item.id" class="bottom_big_div">
          <div>{{ item.center }}</div>
          <div class="bottom_big_div_font">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
import Table from '@/components/ProTable/index.vue'
import SizeSelect from '../../layout/components/navbar/components/SizeSelect.vue'
import zs from '../../assets/imgs/sy/zs.png'
import dlicon from '../../assets/imgs/sy/dlicon.png'
import tjicon from '../../assets/imgs/sy/tjicon.png'
import { ElMessage } from 'element-plus'

const state = reactive({
  info: [
    {
      id: '1',
      size1: '12',
      size2: '剩余天数',
      size3: '12554.32',
      size4: 'time.png',
    },
    {
      id: '2',
      size1: '1254.00',
      size2: '本月预计佣金',
      size3: [
        {
          id: '1',
          name: '直属佣金',
          money: '454.00',
          img: zs,
          css: 'zs_color',
        },
        {
          id: '2',
          name: '代理抽成',
          money: '800.00',
          img: dlicon,
          css: 'dl_color',
        },
        {
          id: '3',
          name: '佣金比例',
          money: '800.00',
          img: tjicon,
          css: 'yj_color',
        },
      ],
      size4: '佣金比例',
      size5: '系统定时每天下午3点前更新一次当月代理佣金数据',
      size6: '../../assets/imgs/sy/money.png',
      size7: 'tj.png',
    },
    {
      id: '3',
      size1: '1254.00',
      size2: '上月实得佣金',
      size3: [
        {
          id: '1',
          name: '直属佣金',
          money: '454.00',
          img: zs,
          css: 'zs_color',
        },
        {
          id: '2',
          name: '代理抽成',
          money: '800.00',
          img: dlicon,
          css: 'dl_color',
        },
        {
          id: '3',
          name: '佣金比例',
          money: '800.00',
          img: tjicon,
          css: 'yj_color',
        },
      ],
      size4: '佣金比例',
    },
  ],
  // 模拟数据
  recordList1s: [
    {
      id: 12,
      account: 'fhjdf1',
      time: '2022-11-22',
    },
    {
      id: 13,
      account: 'fhjdf2',
      time: '2022-11-22',
    },
    {
      id: 14,
      account: 'fhjdf3',
      time: '2022-11-22',
    },

    {
      id: 15,
      account: 'fhjdf4',
      time: '2022-11-22',
    },
    {
      id: 16,
      account: 'fhjdf5',
      time: '2022-11-22',
    },
    {
      id: 17,
      account: 'fhjdf6',
      time: '2022-11-22',
    },

    {
      id: 18,
      account: 'fhjdf7',
      time: '2022-11-22',
    },
    {
      id: 19,
      account: 'fhjdf8',
      time: '2022-11-22',
    },
    {
      id: 21,
      account: 'fhjdf9',
      time: '2022-11-22',
    },
    {
      id: 22,
      account: 'fhjdf',
      time: '2022-11-22',
    },
    {
      id: 23,
      account: 'fhjdf10',
      time: '2022-11-22',
    },
    {
      id: 24,
      account: 'fhjdf11',
      time: '2022-11-22',
    },
    {
      id: 25,
      account: 'fhjdf12',
      time: '2022-11-22',
    },
    {
      id: 26,
      account: 'fhjdf13',
      time: '2022-11-22',
    },
    {
      id: 27,
      account: 'fhjdf14',
      time: '2022-11-22',
    },
    {
      id: 28,
      account: 'fhjdf15',
      time: '2022-11-22',
    },
    {
      id: 29,
      account: 'fhjdf16',
      time: '2022-11-22',
    },
    {
      id: 30,
      account: 'fhjdf17',
      time: '2022-11-22',
    },
  ],
  recordList: [],
  columns: [
    { prop: 'account', label: '最新存款会员' },
    { prop: 'time', label: '时间' },
  ],
  tebleData1: [],
  pagesBig1: null,
  pages1: 0,

  recordList2: [],
  columns2: [
    { prop: 'account', label: '最新加入代理' },
    { prop: 'name', label: '时间' },
  ],
  tebleData2: [],
  pagesBig2: null,
  pages2: 0,

  recordList13: [],
  columns13: [
    { prop: 'account', label: '最新加入会员' },
    { prop: 'name', label: '时间' },
  ],
  tebleData13: [],
  pagesBig13: null,
  pages13: 0,

  recordList3: [
    {
      id: 12,
      account: 'fhjdf',
      level: 2,
      name: 'sdfdf',
      mobile: '21334324324',
      email: '23434354@45',
      nick: 'aaa',
      type: '普通用户',
      authLevel: 1,
      checkStatus: '已认证',
      month: '直属会员',
    },
    {
      id: 13,
      account: 'fhjdf',
      level: 2,
      name: 'sdfdf',
      mobile: '21334324324',
      email: '23434354@45',
      nick: 'aaa',
      type: '普通用户',
      authLevel: 1,
      checkStatus: '已认证',
      month: '直属代理',
    },
  ],
  columns3: [
    { prop: 'month', label: '类型', slot: 'month', width: 100 },
    { prop: 'account', label: '新增有效会员数', width: 180 },
    { prop: 'level', label: '投注金额', width: 100 },
    { prop: 'name', label: '有效投注流水', width: 120 },
    { prop: 'type', label: '游戏输赢', width: 100 },
    { prop: 'mobile', label: '优惠红利', width: 100 },
    { prop: 'email', label: '平台费' },
    { prop: 'nick', label: '净盈利' },
    { prop: 'type', label: '预估佣金比例', width: 180 },
    { prop: 'type1', label: '我的预估佣金比例', width: 180 },
    { prop: 'type2', label: '扶持佣金', width: 100 },
    { prop: 'type3', label: '调整佣金', width: 100 },
    { prop: 'type4', label: '打赏抽成', width: 100 },
    { prop: 'type5', label: '佣金' },
  ],
  CheckThisMonth: true, //切换表格

  team: [
    { id: '1', center: 547, name: '直属代理' },
    { id: '2', center: 1245, name: '直属会员数' },
    { id: '3', center: 111, name: '活跃会员数' },
    { id: '4', center: 222, name: '待活跃会员数' },
    { id: '5', center: 333, name: '有效会员数' },
    { id: '6', center: 1421, name: '本月新增代理' },
    { id: '7', center: 5551, name: '本月新增会员' },
  ],
})

onMounted(() => {
  datas(0)
  datas2(0)
  datas3(0)
})

// 获取数据
const datas = index => {
  let data = [...state.recordList1s]
  let a = []
  data.forEach((value, index) => {
    a.push(data.splice(index--, 4))
  })
  state.tebleData1 = a
  state.pagesBig1 = a.length
  state.pages1 = index
  state.recordList = a[state.pages1]
}
const datas2 = index => {
  let data = [...state.recordList1s]
  let a = []
  data.forEach((value, index) => {
    a.push(data.splice(index--, 4))
  })
  state.tebleData2 = a
  state.pagesBig2 = a.length
  state.pages2 = index
  state.recordList2 = a[state.pages2]
}
const datas3 = index => {
  let data = [...state.recordList1s]
  let a = []
  data.forEach((value, index) => {
    a.push(data.splice(index--, 4))
  })
  state.tebleData13 = a
  state.pagesBig13 = a.length
  state.pages13 = index
  state.recordList13 = a[state.pages13]
}

// 获取翻页数据
const pageUpdate = val => {
  console.log(val)
}
const sizeUpdate = val => {
  console.log(val)
}
// 翻页
const pagesLeft = () => {
  if (state.pages1 > 0) {
    datas(state.pages1 - 1)
    return
  }
}
const pagesRight = () => {
  if (state.pagesBig1 === state.pages1 + 1) {
    return
  }
  datas(state.pages1 + 1)
}

const pagesLeft2 = () => {
  if (state.pages2 > 0) {
    datas2(state.pages2 - 1)
    return
  }
}
const pagesRight2 = () => {
  if (state.pagesBig2 === state.pages2 + 1) {
    return
  }
  datas2(state.pages2 + 1)
}

const pagesLeft3 = () => {
  if (state.pages13 > 0) {
    datas3(state.pages13 - 1)
    return
  }
}
const pagesRight3 = () => {
  if (state.pagesBig13 === state.pages13 + 1) {
    return
  }
  datas3(state.pages13 + 1)
}
</script>

<style lang="scss" scoped>
.border {
  display: grid;
  grid-template-columns: 3fr 6fr 5fr;
  grid-gap: 10px;
  text-align: center;
  .border_div1 {
    border-radius: 10px;
    height: 210px;
    background: #fafafa;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-direction: column;
    padding-left: 20px;
    img {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
    .border_div1_font1 {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #5f2ae0;
    }
    .border_div1_font2 {
      font-size: 25px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;

      margin-top: 25px;
      margin-bottom: 15px;
    }
    .border_div1_font3 {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #666666;

      display: flex;
      align-items: center;
      // justify-content: space-between;
    }
    .border_div1_font4 {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #cccccc;
      margin-top: 10px;
    }
  }
  .border_div3 {
    background: #fafafa;
    box-shadow: none !important;
  }
  .border_div2 {
    padding: 15px 0 21px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    height: 174px;
    box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.06);

    position: relative;
    .border_div2_data_font {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #5f2ae0;
      margin-bottom: 20px;
      height: 13px;
      text-align: start;
      width: 100%;
    }
    .border_div2_data {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;

      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
    }
    .border_div2_data_bottoms {
      padding-bottom: 16px;
      border-bottom: 1px solid #fafafa;
      margin-bottom: 10px;
    }
    .border_div2_data_big {
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: space-around;
    }
    .border_div2_data_font3 {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #666666;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 15px;
      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
    .border_div2_data_font4 {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #666666;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 13px;
      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
    }
    .border_div2_data_bottom {
      width: calc(100% - 20px);
      height: 2px;
      background: #5f2ae0;
      border-radius: 10px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.title_body {
  margin: 10px;
  display: flex;
  align-items: center;

  .more_font {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #cccccc;

    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: #9c9797;
    }
  }
  .title {
    display: flex;
    align-items: center;
  }
}

.tables1 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  // align-items: center;
  justify-content: space-between;
  height: 350px;
}
.table_center {
  text-align: center !important;
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
.pages {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  .but {
    border: none;
    background: none;
    width: 25px;
    height: 25px;
  }
}
.imgs2 {
  width: 25px;
  height: 25px;
}
.zs_color {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #ff5a5a;
}
.dl_color {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #03c034;
}
.yj_color {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #e99431;
}
.font_coloe1 {
  cursor: pointer;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #5f2ae0 !important;
  &:hover {
    color: #541be5 !important;
  }
}
.font_coloe2 {
  cursor: pointer;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #999999 !important;
  &:hover {
    color: #767171 !important;
  }
}
.link_font {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #5f2ae0;
  text-decoration: underline;
  &:hover {
    color: #4506e5;
  }
}
.bottom_big {
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-gap: 20px;
  height: 120px;
  .bottom_big_div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background: #fafafa;
    border-radius: 10px;

    font-size: 25px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    .bottom_big_div_font {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #666666;
      margin-top: 24px;
    }
  }
}
</style>
