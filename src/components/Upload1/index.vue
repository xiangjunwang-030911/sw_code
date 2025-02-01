<template>
    <el-upload
      action=""
      :drag="true"     
      multiple
      ref="swupload"
      :on-success="handleSuccess"
      :on-error="handleError"
    >   
    <div class="flex flex-col items-center w-[150px] h-[150px] border border-normal border-solid text-center p-5">
       <IEpPlus size="30" color="#000000"></IEpPlus>
       <p>拖动或选择附件进行上传</p>
    </div>
</el-upload>

</template>

<script setup lang="ts" >
    

    



    const handleSuccess=()=>{

    };

    const handleError=()=>{

    }
    
</script>