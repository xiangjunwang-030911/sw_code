<template>
  <div class="main">
    <Notifications
      :notifications="notifications"
      @remove="remove"
      @pause="handlePaused"
      @resume="handleResume"
    ></Notifications>
  </div>
</template>

<script>
import Notifications from './Notifications.vue';
export default {
  components: { Notifications },
  data() {
    return {
      MAX_NOTIFICATIONS: 5,
      timeouts: [],
    };
  },
  computed: {
    ...mapState('notification', {
      notifications: (state) => state.list,
    }),
    notificationsReverse() {
      return this.notifications.reverse();
    },
  },
  methods: {
    ...mapMutations('notification', [
      'changeList',
      'paused',
      'resume',
      'deleteNotification',
    ]),
    handlePaused() {
      this.paused();
    },
    handleResume() {
      this.resume();
    },
    remove(id) {
      this.deleteNotification(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999999999;
}

.add-button {
  background-color: #0284c7;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.8rem 1.2rem 0.8rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-out;
  font-size: 1.2rem;
  box-shadow:
    0 0.2rem 0.2rem rgba(0, 0, 0, 0.1),
    0 0.5rem 1rem rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #0ea5e9;
    transform: translateY(-0.1rem);
    box-shadow:
      0 0.3rem 0.2rem rgba(0, 0, 0, 0.1),
      0 0.6rem 1rem rgba(0, 0, 0, 0.3);

    svg {
      transform: rotate(90deg);
    }
  }

  &:active {
    transition: all 0.1s ease-out;
    transform: translateY(0rem);
  }

  svg {
    transition: transform 0.3s ease-out;
    margin-right: 0.3rem;
    font-size: 1.5rem;
  }
}
</style>
