<template>
    <div>
        <el-cascader :value="value" @input="v=>$emit('input',v)" :options="options" class="formitem" :props="{value:'label'}"  ></el-cascader>
        
        <!-- {{options}} -->
    </div>
</template>

<script>
import {regionDataPlus} from 'element-china-area-data'
export default {
    data() {
        return {
            options:regionDataPlus,
        }
    },
    props:['value'],
}
</script>

<style>

</style>