<template>
  <el-sub-menu :index="parent.name" @click="handleOpen(parent.name)">
     <template #title>
        <div>
           <svg-icon
              size="18",
              v-if="!parent.noNeedIcon"
              :iconClass="parent.icon"
              :className="`cursor-pointer text-[18px] mr-2 group-hover:hidden ${parent.icon}`"
           >
            
           </svg-icon> 
        </div>

     </template>

  </el-sub-menu>


</template>
<script setup>

</script>