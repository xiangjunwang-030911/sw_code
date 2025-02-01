import { Ref } from 'vue';
import { useEventListener } from '@/hooks/events/useEventListener';

export function useTableMaxHeight(
  tableHeight: Ref<number>,
  tableWrapper: HTMLElement | { $el: HTMLElement } | null,
) {
  const getTableMaxHeight = () => {
    if (tableWrapper) {
      const { top } =
        'getBoundingClientRect' in tableWrapper
          ? tableWrapper.getBoundingClientRect()
          : tableWrapper.$el.getBoundingClientRect();
      tableHeight.value = window.innerHeight - top;
    }
  };
  useEventListener({
    name: 'resize',
    listener: () => {
      getTableMaxHeight();
    },
    immediate: true,
  });
}
