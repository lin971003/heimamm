<template>
    <div>
        <el-select :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择学科" class="formitem">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- {{value}} -->
    </div>
</template>

<script>
//导入获取学科数据api
import { GetSubject } from "@/api/subject.js";

export default {
    data() {
        return {
            //学科数据源
        //    subject:'',
           //保存学科所有数据
           subjectList:[],
        }
    },
    props:['value'],
    created() {
        // this.subject=this.value;
        this.getSub();
    },
    // watch: {
    //     subject: function(){
    //         this.$emit('input',this.subject);
    //     }
    // },
    methods: {
         //获取学科数据的方法
        getSub() {
            GetSubject({ page: 1, limit: 10 }).then(res => {
                // window.console.log("学科", res);
                if (res.data.code === 200) {
                this.subjectList = res.data.data.items;
                }
            });
        },
    },
}
</script>

<style>

</style>