<template>
  <div class="notification" :style="styleVar">
    <div
      class="notification-inner"
      :class="
        isMouseOver || index == total - 1 ? 'notification-inner-mouseover' : ''
      "
    >
      <div :class="`icon ${type}`">
        <ElIconRender :size="25" :name="iconType" />
        <component :size="25" :is="iconType" />
      </div>
      <div>
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
      </div>
      <button class="close" @click="handleRemove">
        <el-icon size="16"><Close /></el-icon>
        <IEpClose size="16" color="#a0a0a0"></IEpClose>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    id: {
      type: String | Number,
      default: 0,
    },
    isMouseOver: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'success',
    },
  },
  data() {
    return {
      STACKING_OVERLAP: 0.9,
    };
  },
  computed: {
    scale() {
      const inverseIndex = this.total - this.index - 1;
      return 1 - inverseIndex * 0.05;
    },
    opacity() {
      const inverseIndex = this.total - this.index - 1;
      return 1 - (inverseIndex / this.total) * 0.1;
    },
    bg() {
      const inverseIndex = this.total - this.index - 1;
      return `hsl(0 0% ${100 - inverseIndex * 15}% / 40%)`;
    },
    y() {
      const inverseIndex = this.total - this.index - 1;
      return -this.index * 90;
    },
    styleVar() {
      return {
        '--bg': this.bg,
        '--opacity': this.opacity,
        '--scale': this.scale,
        '--y': `${this.y}%`,
      };
    },
    iconType() {
      switch (this.type) {
        case 'success':
          return 'IEpCheck';
        case 'warning':
          return 'IEpWarningFilled';
        case 'error':
          return 'IEpClose';
        case 'info':
          return 'IEpInfoFilled';
        default:
          break;
      }
    },
  },
  methods: {
    handleRemove() {
      this.$emit('remove', this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
$easing: ease-in-out;
.notification {
  display: flex;
  transform: translateY(var(--y)) scale(var(--scale));
  transform-origin: center;
  transition: all var(--duration) $easing;
  pointer-events: auto;
  --width: 20rem;
  --height: 4.5rem;
  --gap: 1rem;
}
.notification-inner-mouseover {
  opacity: 1 !important;
  background-color: hsl(0 0% 100% / 40%) !important;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.notification-inner {
  background-color: var(--bg);
  -webkit-backdrop-filter: blur(0.5rem);
  backdrop-filter: blur(0.5rem);
  padding: 0 1rem;
  border-radius: 0.5rem;
  width: var(--width);
  height: var(--height);
  margin-bottom: var(--gap);
  opacity: var(--opacity);
  transition: all var(--duration) $easing;
  display: flex;
  align-items: center;

  h2 {
    font-weight: bold;
    font-size: 0.9rem;
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

  .close {
    background: none;
    border: none;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.8rem;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.3rem;
    margin-right: 1rem;
    font-size: 1rem;
    color: white;

    &.error {
      background-color: #f87171;
    }

    &.success {
      background-color: #10b981;
    }

    &.info {
      background-color: #60a5fa;
    }

    &.warning {
      background-color: #f59e0b;
    }
  }
}
</style>
