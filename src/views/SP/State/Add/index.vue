<template>
   <div class="w-full bg-default py-5 px-5">
    <div class="flex items-center justify-between border-b border-solid pb-5">
     <div class="tabs-wrapper flex items-center" @click="handleTab">
      <div class="py-1 px-2 cursor-pointer text-center mr-2"
       :class="`${currentTab==0?'text-theme':''}`"
        data-id="0" >Assign to work</div>
      <div class="py-1 px-2 cursor-pointer text-center mr-2"
      :class="`${currentTab==1?'text-theme':''}`"
      data-id="1">工程师提交SAP工单</div>
      <div class="py-1 px-2 cursor-pointer text-center mr-2"
      :class="`${currentTab==2?'text-theme':''}`"
      data-id="2">工程师补单</div>
      <div class="py-1 px-2 cursor-pointer text-center mr-2"
      :class="`${currentTab==3?'text-theme':''}`"
      data-id="3">新建DMS权限申请</div>
    </div>

      <div class="flex items-center">
         <span class="mr-2 whitespace-nowrap">事件模板</span> 
       <el-select
         class="w-3 flex"
       >
       <el-option :key="1" value="1">aa</el-option>
       <el-option :key="2" value="2">bb</el-option>
       <el-option :key="3" value="3">cc</el-option>
       </el-select>

      </div>

      <div class="action-wrapper flex items-center">
        <el-button type="primary" class="w-[70px] mr-4">提交</el-button>
        <el-button class="w-[70px]" @click="cancelHandle">取消</el-button>
      </div>          
    </div>

    <el-form :model="formItem"  label-width="90" class="py-5">
        <el-form-item label="员工:">
            <div class="flex items-center">
               <el-select>
                   <el-option value="1">aa</el-option>
                   <el-option value="2">bb</el-option>
               </el-select>
               <svg-icon
               icon-class="search_icon"
               className="cursor-pointer ml-2 mr-1"
               size="23"
               >
               </svg-icon>
               <svg-icon
                icon-class="add_icon"
                className="cursor-pointer ml-2 mr-1"
                size="23"
               >
               </svg-icon>
            </div>
        </el-form-item>

        <el-form-item label="资产:">
            <Table
              :columns="columns"
              :data="tableData"
            ></Table>
        </el-form-item>
        <el-form-item label="标题:">
            <el-input v-model="formItem.title"  placeholder="请输入标题"></el-input>
        </el-form-item>

      <el-row>
        <el-col :span="12">
            <el-form-item label="产品:">
               <el-select
                placeholder="请选择"
               >
                <el-option
                value="0">电脑</el-option>
                <el-option
                value="1">鼠标</el-option>
               </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="数据库:">
              <el-select
               placeholder="请选择"
              >
                 <el-option value="0">oracle</el-option>
                 <el-option value="1">sqlserver</el-option>
              </el-select>

           </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
           <el-form-item label="发生时间:">
              <el-date-picker
                v-model="formItem.occurrenceTime"
                type="datetime"
                class="!w-[90%]"
                placeholder="选择日期和时间"
              >
              </el-date-picker>

           </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发生地点:">
             <el-input v-model="formItem.scene" ></el-input>

          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="w-full" label="描述:">
         <Tinymce width="100%"></Tinymce>
      </el-form-item>

      <el-row>
        <el-col :span="12">
            <el-form-item label="进程状态:">
                <el-input v-model="formItem.status" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">  
            <el-form-item label="进程状态:" >
               <el-input v-model="formItem.principal"></el-input>
            </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="附件:">
            <div>
               <FileUpload1></FileUpload1>
            </div>
      </el-form-item>

     </el-form>
</div>



</template>
<script setup lang="ts">  
     import { useRouter } from 'vue-router';
     import {defineAsyncComponent,ref,reactive,h} from 'vue';
     const currentTab=ref(0);
    const Tinymce=defineAsyncComponent(()=>import('@/components/Tinymce/index.vue'));
   // const FileUpload=defineAsyncComponent(()=>import('@/components/Upload/index.vue'));

    const FileUpload1=defineAsyncComponent(()=>import('@/components/Upload1/index.vue'));

    var router=useRouter();

     interface FormItem {
  employee: string;
  title: string;
  database: string;
  scene: string;
  occurrenceTime: string;
  status: string;
  principal: string;
}

const formItem:FormItem=reactive(
 {  
     employee: '',
  title: '',
  database: '',
  scene: '',
  occurrenceTime: '',
  status: '服务台受理中',
  principal: '',
}
)



   const handleTab= (e:MouseEvent)=>{
      const target=e.target as HTMLElement;
      if(target.dataset?.id)
        currentTab.value=Number(target.dataset.id);
   };

   const cancelHandle=()=>{
      router.back();
   }

   const tableData=reactive([
     {  number:'12345',
      title:'笔记本',
      category:'桌面设备',
      endTime:'2024年12月5日',
      vender:'联想',
    }
   ] 
   )

   const columns:Table.Column[]=reactive([
     {
        type:"selection",
        align:"center",
        width:60,
     },
     {  
        prop:"number",    
        align:"center",    
        renderHeader: ()=>h('span','资产编号'),     
     },
     {
        prop:"title",
        width:80,
        align:"center",
        renderHeader:()=>h('span','标题'),
     },
     {
        prop:"category",
        width:100,
        align:"center",
        renderHeader:()=>h('span','三级分类'),
     },
     {
        prop:"endTime",
        width:150,
        align:"center",
        renderHeader:()=>h('span','维保到期时间'),
     },
     {
        prop:"vender",
        align:"center",
        renderHeader:()=>h('span','厂家'),
     },
   ]

   )
</script>