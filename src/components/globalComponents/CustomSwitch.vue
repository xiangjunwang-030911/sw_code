<template>
  <div class="toggle-container">
    <input
      :checked="modelValue"
      class="toggle-checkbox toggled-once"
      type="checkbox"
      :disabled="disabled"
      @input="handleChange"
    />
    <div class="toggle-track">
      <div class="toggle-thumb"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CustomSwitch',
});

interface Props {
  modelValue?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
});

interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'on-change', value: boolean): void;
}
const emit = defineEmits<Emits>();

const handleChange = (event: Event) => {
  const target: HTMLInputElement = event.target as HTMLInputElement;
  emit('on-change', target.checked);
  emit('update:modelValue', target.checked);
};
</script>

<style lang="scss" scoped>
@use 'sass:math';

@function em($pixels) {
  @if not unit($pixels) == 'px' {
    @error 'Property #{$pixels} must have `px` unit.';
  }

  @return math.div($pixels, 16px) * 1em;
}

.toggle-container {
  position: relative;
  border-radius: em(50px);
  width: em(46px);
  height: em(22px);
}

.toggle-checkbox {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  z-index: 1;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.toggle-checkbox:disabled {
  cursor: not-allowed;
}

.toggle-track {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: inherit;
  padding: em(4px);
  width: 100%;
  height: 100%;
  background-color: #aeaeae;
  box-shadow: inset 0 em(1px) em(2px) rgba(0, 0, 0, 0.2);
  transition: background-color 0.4s linear;

  .toggle-container > .toggle-checkbox:checked + & {
    background-color: var((--el-color-primary));
    padding-left: em(10px);
  }

  .toggle-container > .toggle-checkbox:disabled + & {
    opacity: 0.4;
  }
}

.toggle-thumb {
  position: relative;
  border-radius: em(11px);
  transform-origin: left;
  width: em(16px);
  height: em(16px);
  background-color: #fff;
  box-shadow:
    0 em(4px) em(4px) rgba(0, 0, 0, 0.2),
    inset 0 em(-2px) em(4px) rgba(0, 0, 0, 0.2);

  .toggle-checkbox.toggled-once + .toggle-track > & {
    animation-name: grow-out, bounce-out;
    animation-duration: 0.2s;
    animation-timing-function: cubic-bezier(0.5, 0, 0.75, 0.5),
      cubic-bezier(0.25, 0.1, 0.25, 1), cubic-bezier(0, 0, 0.3, 1.5);

    animation-delay: 0s, 0.2s;
    animation-fill-mode: forwards;
  }

  .toggle-checkbox.toggled-once:checked + .toggle-track > & {
    animation-name: grow-in, bounce-in;
  }

  .toggle-container.boo & {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      border-radius: inherit;
      width: 100%;
      height: 100%;
      background-image: url('https://assets.codepen.io/4175254/boo-face.png');
      background-size: calc(14 * 100 / 22 * 1%) calc(12 * 100 / 22 * 1%);
      background-position: center;
      background-repeat: no-repeat;
      box-shadow: inset 0 em(-2px) em(4px) rgba(0, 0, 0, 0.2);
      image-rendering: pixelated;
      opacity: 0;
      transition: opacity 0.2s linear;

      @at-root {
        .toggle-container.boo
          > .toggle-checkbox:checked
          + .toggle-track
          > .toggle-thumb::after {
          opacity: 1;
        }

        @media (hover: hover) {
          .toggle-container.boo
            > .toggle-checkbox:hover
            + .toggle-track
            > .toggle-thumb::after {
            opacity: 1;
          }
        }
      }
    }
  }
}

@keyframes grow-in {
  0% {
    border-radius: em(11px);
    transform: translateX(0) scale(1);
  }
  100% {
    border-radius: math.div(
      em(math.div(1, math.div(34, 22)) * 11px),
      em(math.div(1, math.div(16, 22)) * 11px)
    );
    transform: translateX(em(8px)) scale(calc(34 / 22), calc(16 / 22));
  }
}

@keyframes bounce-in {
  0% {
    border-radius: math.div(
      em(math.div(1, math.div(34, 22)) * 11px),
      em(math.div(1, math.div(16, 22)) * 11px)
    );
    transform: translateX(em(8px)) scale(calc(34 / 22), calc(16 / 22));
  }
  100% {
    border-radius: em(11px);
    transform: translateX(100%) scale(1);
  }
}

@keyframes grow-out {
  0% {
    border-radius: em(11px);
    transform: translateX(100%) scale(1);
  }
  100% {
    border-radius: math.div(
      em(math.div(1, math.div(34, 22)) * 11px),
      em(math.div(1, math.div(16, 22)) * 11px)
    );
    transform: translateX(em(2px)) scale(calc(34 / 22), calc(16 / 22));
  }
}

@keyframes bounce-out {
  0% {
    border-radius: math.div(
      em(math.div(1, math.div(34, 22)) * 11px),
      em(math.div(1, math.div(16, 22)) * 11px)
    );
    transform: translateX(em(2px)) scale(calc(34 / 22), calc(16 / 22));
  }
  100% {
    border-radius: em(11px);
    transform: translateX(0) scale(1);
  }
}
</style>
