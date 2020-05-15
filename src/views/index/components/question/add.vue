<template>
  <div>
    <el-dialog :fullscreen="true" title="收货地址" :visible.sync="dialogFormVisible">
      <el-form
      ref="form"
        class="add"
        label-position="left"
        style="width:835px; margin:0px auto;"
        :model="form"
      >
        <!-- 学科 -->
        <el-form-item label="学科" :label-width="formLabelWidth">
          <subjectcom v-model="form.subject"></subjectcom>{{form.subject}}
        </el-form-item>
        <!-- 阶段 -->
        <el-form-item label="阶段" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段" class="formitem">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>{{form.step}}
        </el-form-item>
        <!-- 企业 -->
        <el-form-item label="企业" :label-width="formLabelWidth">
          <entcom v-model="form.enterprise"></entcom> {{form.enterprise}}
        </el-form-item>
        <!-- 城市 -->
        <el-form-item label="城市" :label-width="formLabelWidth">
          <selectJL  v-model="form.city" />{{form.city}}
        </el-form-item>
        <!-- 题型 -->
        <el-form-item label="题型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>{{form.type}}
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度" :label-width="formLabelWidth">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>{{form.difficulty}}
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 试题标题 -->
        <el-form-item label="试题标题">
          <br />
          <br />
          <quill-editor @change="titleChange($event)" :content="form.title" />{{form.title}}
        </el-form-item>
        <!-- 出题区域 -->
        <!-- 单选 -->
        <el-form-item v-if="form.type===1" label="单选" :label-width="formLabelWidth">
          <el-radio-group v-model="form.single_select_answer">
            <myradio v-for="(item,index) in form.select_options" :key="index" :label='item.label' :text='item.text' :image='item.image' @changeIpt="v=>item.text=v" @changeImg='v=>item.image=v' />
          </el-radio-group>
      
        </el-form-item>
        <!-- 多选 -->
        <el-form-item v-if="form.type===2" label="多选" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.multiple_select_answer">
            <mycheckbox  v-for="(item,index) in form.select_options" :key="index" :label='item.label' :text='item.text' :image='item.image' @changeIpt2='v=>item.text=v'  @changeImg2="v=>item.image=v" />
          </el-checkbox-group>
          <!-- {{form.select_options}}
          {{form.multiple_select_answer}} -->
        </el-form-item>
        <!-- 简答 -->
        <el-form-item v-if="form.type===3" label="简答" :label-width="formLabelWidth"  >
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="form.short_answer"
            resize="none"
          ></el-input>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 视频解析 -->
        <el-form-item label="视频解析" :label-width="formLabelWidth">
          <myvideo v-model="form.video" /> 
          {{form.video}}
        </el-form-item>
        
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 答案解析 -->
        <el-form-item label="答案解析" :label-width="formLabelWidth">
          <quill-editor :content="form.answer_analyze" @change="changeans($event)" />
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 试题备注 -->
        <el-form-item label="试题备注" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.remark" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import myradio from "./com/myradio.vue";
import mycheckbox from "./com/mycheckbox.vue";
import myvideo from "./com/myvideo.vue";
//导入添加题库api
import {apiAdd} from '../../../../api/question.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        title: "",                     //     标题
        subject: "",                   //     	学科id标识
        step: "",                      //     	阶段1、初级 2、中级 3、高级
        enterprise: "",                //     	企业id标识
        city: [],                      //     	[省、市、区县]
        type: "",                      //     	题型 1单选 、2多选 、3简答
        difficulty: "",                //     		题目难度 1简单 、2一般 、3困难
        single_select_answer: "",       //         单选题答案
        multiple_select_answer:[],      //      		多选题答案
        short_answer: "",               //      		简答题答案
        video: "",                      //      		解析视频地址
        answer_analyze: "",             //      		答案解析
        remark: "",                     //      		答案备注
        select_options: [
           {
            "label": "A",
            "text": "狗不理",
            "image": "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
        },
        {
            "label": "B",
            "text": "猫不理",
             "image": "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
        },
        {
            "label": "C",
            "text": "麻花",
            "image": "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
        },
        {
            "label": "D",
            "text": "炸酱面",
            "image": "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
        }
        ],              //      		选项，介绍，图片介绍
      }
    };
  },
  components: {
    myradio,
    mycheckbox,
    myvideo
  },
  methods: {
    titleChange(e){
      this.form.title=e.text;
    },
    changeans(e){
      this.form.answer_analyze=e.text;
    },
    add(){
      apiAdd(this.form).then(res=>{
        window.console.log(res);
        if(res.data.code===200){
          this.$message.success('新增成功');
          this.$parent.getQuesList();
          this.dialogFormVisible=false;
          this.$refs.form.resetFields();
        }else{
          this.$message.error(res.data.message);
        }
      })
    }
  }
};
</script>

<style lang="less">
.add {
  .el-form-item__content {
    .formitem {
      width: 375px;
    }
  }
}
</style>