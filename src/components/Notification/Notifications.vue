<template>
  <div
    class="notifications"
    @mouseenter="pause"
    @mouseleave="resume"
    :style="{ '--duration': `${animationDuration}ms` }"
  >
    <transition-group name="notification" tag="div">
      <template v-for="(notification, index) in notifications">
        <Notification
          :key="notification.id"
          class="notification"
          :id="notification.id"
          :type="notification.type"
          :title="notification.title"
          :content="notification.content"
          :notification="notification"
          @remove="remove"
          :index="index"
          :total="notifications.length"
          :isMouseOver="isMouseOver"
        />
      </template>
    </transition-group>
  </div>
</template>

<script>
import Notification from "./Notification.vue";
export default {
  components: { Notification },
  props: {
    animationDuration: {
      type: Number,
      default: 400,
    },
    notifications: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isMouseOver: false,
    };
  },
  methods: {
    pause() {
      this.$emit("pause");
      this.isMouseOver = true;
    },
    resume() {
      this.$emit("resume");
      this.isMouseOver = false;
    },
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style lang="scss" scoped>
$easing: ease-in-out;
.notifications {
  --width: 20rem;
  --height: 4.5rem;
  --gap: 1rem;

  position: fixed;
  top: 10px;
  pointer-events: none;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    .notification {
      // Unstack notifications when hovering over the container
      transform: translateY(0) scale(1);

      &.notification-leave-active {
        // When the list is expanded, avoid animating the y position
        transform: translateY(0) scale(0.5);

        .notification-inner {
          background-color: hsl(100 0% 100% / 100%) !important;
        }
      }
    }
  }

  .notification {
    display: flex;
    transform: translateY(var(--y)) scale(var(--scale));
    transform-origin: center;
    transition: all var(--duration) $easing;
    pointer-events: auto;
  }
  .notification-enter {
    transform: translateY(100%) scale(1);
    // Animate the first notification to slide in from the bottom
    margin-bottom: calc((var(--height) + var(--gap)) * -1);
  }
  .notification-enter-active {
    transform: translateY(var(--y)) scale(var(--scale));
    margin-bottom: 0;
  }
  .notification-leave-active {
    transform: translateY(calc(var(--y) - 10%)) scale(calc(var(--scale) - 0.1));
    margin-bottom: calc((var(--height) + var(--gap)) * -1);

    .notification-inner {
      opacity: 0;
    }
  }
}
</style>