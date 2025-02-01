<template>
  <div class="main">
    <div class="gif">
      <img
        src="https://peertime.oss-cn-shanghai.aliyuncs.com/giphy.gif"
        alt="gif_ing"
      />
    </div>
    <div class="content">
      <h1 class="main-heading">This page is gone.</h1>
      <p>...maybe the page you're looking for is not found or never existed.</p>
      <button @click="handleBack">
        Back to home <i class="far fa-hand-point-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handleBack = () => {
  router.back();
};
</script>

<style scoped>
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gif {
  display: flex;
  justify-content: center;
}

.content {
  text-align: center;
  margin: 3rem 0;
}

.content .main-heading {
  font-size: 2.5rem;
  font-weight: 700;
}
p {
  font-size: 1.3rem;
  padding: 0.7rem 0;
}

button {
  padding: 1rem;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #0046d4;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
}
</style>
