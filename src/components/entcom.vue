<template>
  <div>
    <el-select :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择企业" class="formitem">
      <el-option v-for="(item, index) in entList" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
     <!-- {{value}} -->
  </div>
</template>

<script>
//导入获取企业数据api
import { apiGetlist } from "@/api/enterprise";
export default {
    props:['value'],
  data() {
    return {
    //   enterprise: "",
      entList: []
    };
  },
  created() {
    //   this.enterprise=this.value
    //调用获取企业数据方法
    this.getEnt();
  },
//   watch: {
//       enterprise: function(){
//         //  console.log(this.enterprise);
//          this.$emit('input',this.enterprise)
//       }
//   },
  methods: {
    //获取企业数据的方法
    getEnt() {
      apiGetlist({ page: 1, limit: 10 }).then(res => {
        // window.console.log("企业", res);
        if (res.data.code === 200) {
          this.entList = res.data.data.items;
        }
      });
    }
  }
};
</script>

<style>
</style>