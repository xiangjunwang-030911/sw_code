<template>
  <div>
    <div class="flex items-center">
      <div class="reply-wrapper" :class="{ 'is-focus': isFocus }">
        <div
          class="custom-input"
          id="editableDiv"
          ref="customInputRef"
          contenteditable
          placeholder="输入消息(Ctrl+Enter插入新行)"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeyDown"
          v-html="message"
        ></div>
        <div class="flex mt-[10px] ml-2">
          <emoji @select="handleSelectEmoji"></emoji>
          <svg-icon
            icon-class="common-icon-attach"
            :size="16"
            class="mx-3 cursor-pointer"
          ></svg-icon>
          <svg-icon
            icon-class="chat-icon_send"
            class="ml-2 mr-1 cursor-pointer"
          ></svg-icon>
        </div>
      </div>
      <img
        class="ml-3 cursor-pointer"
        src="@/assets/images/chat/action_plus.png"
        alt=""
        @click="handleToggleAction"
      />
    </div>
    <div v-auto-animate>
      <ReplyAction v-if="isShowAction"></ReplyAction>
    </div>
  </div>
</template>

<script setup lang="ts">
const ReplyAction = defineAsyncComponent(
  () => import('./components/ReplyAction.vue'),
);

interface Emits {
  (e: 'send', message: string): void;
}
const emit = defineEmits<Emits>();

const { createMessage } = useMessage();

const message = ref('');
const isShowAction = ref(true);
const customInputRef = ref<HTMLElement>();
const isFocus = ref(false);

const handleToggleAction = () => {
  isShowAction.value = !isShowAction.value;
};

const handleSelectEmoji = (emoji: string) => {
  customInputRef.value!.innerHTML += emoji;
  customInputRef.value!.focus();
};

const handleFocus = () => {
  isFocus.value = true;
};

const handleBlur = () => {
  isFocus.value = false;
};

const handleKeyDown = (evt: KeyboardEvent) => {
  // 检查是否按下了Enter键
  if (evt.key === 'Enter') {
    evt.preventDefault(); // 阻止默认的换行行为
  }
  const isCtrlPressed = evt.ctrlKey || evt.metaKey;

  if (isCtrlPressed && evt.key === 'Enter') {
    // 获取光标位置
    const selection = window.getSelection() as Selection;
    const range = selection!.getRangeAt(0);

    // 创建一个新的<br>元素和一个空的文本节点，插入到光标位置
    const lineBreak = document.createElement('br');
    const emptyTextNode = document.createTextNode('\u200B'); // 空文本节点，确保光标不会跳到上一行
    range.insertNode(lineBreak);
    range.setStartAfter(lineBreak);
    range.insertNode(emptyTextNode);

    // 将光标移动到新行的开头
    range.setStartAfter(emptyTextNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  } else if (evt.key === 'Enter') {
    if (customInputRef.value!.innerHTML.replace(/&nbsp;| /g, '')) {
      emit('send', customInputRef.value!.innerHTML);
      customInputRef.value!.innerHTML = '';
    } else {
      createMessage.warning('Message can not be empty');
    }
  }
};
</script>

<style lang="scss" scoped>
.reply-wrapper {
  width: 100%;
  padding: 1px 11px;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  cursor: text;
  transition: var(--el-transition-box-shadow);
  transform: translateZ(0);
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  font-size: inherit;
  min-height: 40px;
  display: flex;
  /* align-items: center;. */
  justify-content: space-between;
  &.is-focus {
    box-shadow: 0 0 0 1px #409eff inset !important;
  }
  .custom-input {
    margin-top: 10px;
    max-height: 80px;
    overflow-y: auto;
    width: 100%;
  }
}
.custom-input:empty:before {
  content: attr(placeholder);
  color: var(--el-text-color-placeholder);
  font-size: 14px;
}
[contenteditable]:focus {
  outline: none;
}
</style>
