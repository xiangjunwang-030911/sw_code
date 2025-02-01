<template>
  <div class="avatar-input">
    <label class="avatar-input__label" for="file-input">
      <input type="file" id="file-input" class="avatar-input__input" />
      <div class="avatar-input__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 460.8 460.8"
          fill="currentColor"
        >
          <path
            d="M230.432,239.282c65.829,0,119.641-53.812,119.641-119.641C350.073,53.812,296.261,0,230.432,0
        S110.792,53.812,110.792,119.641S164.604,239.282,230.432,239.282z"
          />
          <path
            d="M435.755,334.89c-3.135-7.837-7.314-15.151-12.016-21.943c-24.033-35.527-61.126-59.037-102.922-64.784
        c-5.224-0.522-10.971,0.522-15.151,3.657c-21.943,16.196-48.065,24.555-75.233,24.555s-53.29-8.359-75.233-24.555
        c-4.18-3.135-9.927-4.702-15.151-3.657c-41.796,5.747-79.412,29.257-102.922,64.784c-4.702,6.792-8.882,14.629-12.016,21.943
        c-1.567,3.135-1.045,6.792,0.522,9.927c4.18,7.314,9.404,14.629,14.106,20.898c7.314,9.927,15.151,18.808,24.033,27.167
        c7.314,7.314,15.673,14.106,24.033,20.898c41.273,30.825,90.906,47.02,142.106,47.02s100.833-16.196,142.106-47.02
        c8.359-6.269,16.718-13.584,24.033-20.898c8.359-8.359,16.718-17.241,24.033-27.167c5.224-6.792,9.927-13.584,14.106-20.898
        C436.8,341.682,437.322,338.024,435.755,334.89z"
          />
        </svg>
      </div>
    </label>
  </div>
</template>

<script>
import AvatarInput from "./index.js";
export default {
  mounted() {
    const el = document.querySelector(".avatar-input");
    const avatarInput = new AvatarInput(el);
  },
};
</script>

<style scoped>
:root {
  --background-color: hsl(208.7, 50%, 90%);
  --shadow-color: hsl(208.7, 20%, 65%);
  --input-bg-color: hsl(208.7, 20%, 80%);
  --input-icon-color: hsl(208.7, 20%, 50%);
  --outline-color: hsl(208.7, 100%, 50%);
  --check-color: hsl(202, 100%, 53%);
  background-color: var(--background-color);
}

.avatar-input {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease all;
  width: 150px;
  height: 150px;
  padding: 4px;
  position: relative;
}

.avatar-input__label {
  box-shadow: 0 20px 25px -5px var(--shadow-color),
    0 8px 10px -6px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transition: 0.4s ease all;

  overflow: hidden;

  cursor: pointer;
  z-index: 1;
}

.avatar-input--dragover,
.avatar-input--uploading,
.avatar-input--success,
.avatar-input:active {
  transform: scale(0.9);
}

.avatar-input:active .avatar-input__label {
  box-shadow: none;
}

.avatar-input--dragover .avatar-input__label,
.avatar-input--uploading .avatar-input__label,
.avatar-input--success .avatar-input__label {
  box-shadow: none;
  filter: brightness(0.5);
}

.avatar-input__input {
  display: none;
}

.avatar-input__icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  color: var(--input-icon-color);
  background: var(--input-bg-color);
  transition: 0.2s ease all;
}

.avatar-input__icon svg {
  width: 80%;
  position: relative;
  bottom: -6%;
}

.avatar-input__preview {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: 0.2s ease all;
  transform: scale(1.05);
}

.avatar-input__outline {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  stroke-opacity: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  color: var(--outline-color);
  stroke-dasharray: var(--outline-total-stroke) var(--outline-stroke-offset);
  stroke-dashoffset: var(--outline-total-stroke);
  transition: 0.05s linear all;
  pointer-events: none;
}

.avatar-input--uploading .avatar-input__outline,
.avatar-input--success .avatar-input__outline {
  stroke-opacity: 1;
}

.avatar-input--uploading .avatar-input__percentage {
  opacity: 1;
}

.avatar-input__percentage {
  position: absolute;
  opacity: 0;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  font-weight: bold;
  transition: 0.25s ease opacity;
  pointer-events: none;
}

.avatar-input__success {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Arial, Helvetica, sans-serif;
  color: white;
  transition: 0.25s ease opacity;
  width: 40%;
  pointer-events: none;
}

.avatar-input__success-icon {
  stroke-dasharray: var(--check-total-stroke) var(--check-total-stroke);
  stroke-dashoffset: var(--check-stroke-offset);
  opacity: 0;
  transition: 0.4s ease all;
  transition-delay: 100ms;
  color: var(--check-color);
}

.avatar-input--success .avatar-input__success-icon {
  opacity: 1;
}
</style>
