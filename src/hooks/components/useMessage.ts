import i18n from '@/i18n';
import {
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElMessageBoxOptions,
} from 'element-plus';
import { h } from 'vue';
//@ts-ignore
import IEpCircleCloseFilled from '~icons/ep/circle-close-filled';
//@ts-ignore
import IEpInfoFilled from '~icons/ep/info-filled';
//@ts-ignore
import IEpCircleCheckFilled from '~icons/ep/circle-check-filled';
//@ts-ignore
import IEpWarningFilled from '~icons/ep/warning-filled';

const { t } = i18n.global;

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return h(IEpWarningFilled, {
      width: 50,
      height: 50,
      color: '#E6A23C',
    });
  } else if (iconType === 'success') {
    return h(IEpCircleCheckFilled, {
      width: 50,
      height: 50,
      color: '#67C23A',
    });
  } else if (iconType === 'info') {
    return h(IEpInfoFilled, {
      width: 50,
      height: 50,
      color: '#409EFF',
    });
  } else {
    return h(IEpCircleCloseFilled, {
      width: 50,
      height: 50,
      color: '#F56C6C',
    });
  }
}

function createSuccessModal(option: ElMessageBoxOptions) {
  return ElMessageBox({
    ...option,
    title: (option.title ? option.title : t('sys.common.prompt')) as string,
    message: h('div', { class: 'flex items-center' }, [
      getIcon('success'),
      h('div', { class: 'ml-2' }, option.message as string),
    ]),
  });
}
function createErrorModal(option: ElMessageBoxOptions) {
  return ElMessageBox({
    ...option,
    title: (option.title ? option.title : t('sys.common.prompt')) as string,
    message: h('div', { class: 'flex items-center' }, [
      getIcon('error'),
      h('div', { class: 'ml-2' }, option.message as string),
    ]),
  });
}

function createInfoModal(option: ElMessageBoxOptions) {
  return ElMessageBox({
    ...option,
    title: (option.title ? option.title : t('sys.common.prompt')) as string,
    message: h('div', { class: 'flex items-center' }, [
      getIcon('info'),
      h('div', { class: 'ml-2' }, option.message as string),
    ]),
  });
}

function createWarningModal(option: ElMessageBoxOptions) {
  return ElMessageBox({
    ...option,
    title: (option.title ? option.title : t('sys.common.prompt')) as string,
    message: h('div', { class: 'flex items-center' }, [
      getIcon('warning'),
      h('div', { class: 'ml-2' }, option.message as string),
    ]),
  });
}

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: ElMessage,
    notification: ElNotification,
    // createConfirm: createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  };
}
