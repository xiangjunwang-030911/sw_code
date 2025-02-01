<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-bind="$attrs"   
  />
  <div :class="`w-[${size}px] ${className}`" v-bind="$attrs" v-else>
    <svg
      class="svg-icon"
      aria-hidden="true"
      :style="{ fill, width: size + 'px', height: size + 'px' }"
    >
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script setup lang="ts">
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal as external } from '@/utils/validate';
import { computed } from 'vue';


defineOptions({
  name: 'SvgIcon',
});



interface Props {
  iconClass: string;
  className?: string;
  fill?: string;
  size?: string | number;
}


const props = withDefaults(defineProps<Props>(), {
  iconClass: '',
  className: '',
  fill: '#2F2F2F',
  size: '20',
});

const isExternal = computed(() => {
  return external(props.iconClass);
});

const iconName = computed(() => {
  return `#icon-${props.iconClass}`;
});


const styleExternalIcon = computed(() => {
  return {
    mask: `url(${props.iconClass}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
  };
});
</script>

<style scoped>
.svg-icon {
  /* width: 1em; */
  /* height: 1em; */
  /* vertical-align: -0.15em; */
  fill: currentColor !important;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
