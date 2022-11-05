<template>
  <div>
    <div class="block" v-for="item in state.info" :key="item">
      <div class="title">
        <svg-icon :icon-class="item.icon" />
        <span>{{ item.title }}</span>
      </div>
      <ul class="info-list">
        <li v-for="child in item.child" :key="child">
          <p>{{ child.data }}</p>
          <p>{{ child.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive } from 'vue'

const state = reactive({
  info: [
    {
      title: '用户数据',
      icon: 'home_card_ic_user',
      child: [
        { title: '新增注册', data: '9.933.878' },
        { title: '新增活跃', data: '9.933.878' },
        { title: '用户总量', data: '9.933.878' },
        { title: '活跃人数', data: '9.933.878' },
      ],
    },
    {
      title: '存款数据',
      icon: 'home_card_ic_money',
      child: [
        { title: '存款订单量', data: '9.933.878' },
        { title: '存款订单总额', data: '9.933.878' },
      ],
    },
    {
      title: '挂单数据',
      icon: 'home_card_ic_order',
      child: [
        { title: '挂单卖出订单量', data: '9.933.878' },
        { title: '挂单卖出成交订单量', data: '9.933.878' },
        { title: '挂单卖出成交额', data: '9.933.878' },
        { title: '挂单买入订单量', data: '9.933.878' },
        { title: '挂单买入成交订单量', data: '9.933.878' },
        { title: '挂单买入成交额', data: '9.933.878' },
      ],
    },
    {
      title: '订单数据',
      icon: 'home_card_ic_date',
      child: [
        { title: '转入订单量', data: '9.933.878' },
        { title: '转入总额', data: '9.933.878' },
        { title: '转出订单量', data: '9.933.878' },
        { title: '转出总额', data: '9.933.878' },
      ],
    },
  ],
})
</script>

<style lang="scss" scoped>
.block {
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: 0;
  }
  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: #1f2028;
    margin: 50px 0 20px;

    .svg-icon {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
  }

  .info-list {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    li {
      margin-bottom: 30px;
      font-size: 20px;
      color: #4c4d53;
      border-right: 1px solid var(--border-color);
      padding: 0 50px 0 0;
      margin-right: 50px;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: 0;
      }

      p:first-child {
        font-size: 26px;
        color: #6ecc94;
        font-weight: bold;
        margin-bottom: 13px;
      }
    }
  }
}
</style>
