import { nextTick, Ref, ComputedRef, isRef, unref } from "vue"
import { useEventListener } from "../events/useEventListener"
/**
 * 可以使dom成为一个躲避鼠标点击的dom
 * @param button dom元素
 * @param isStop 是否取消动画
 */
export function useNoTouchButton(
  button: HTMLElement,
  isStop: Ref<Boolean> | ComputedRef<Boolean>
) {
  nextTick(() => {
    const distanceBetween = (
      p1x: number,
      p1y: number,
      p2x: number,
      p2y: number
    ) => {
      const dx = p1x - p2x
      const dy = p1y - p2y
      return Math.sqrt(dx * dx + dy * dy)
    }

    useEventListener({
      name: "mousemove",
      wait: 0,
      listener: (event: Event) => {
        if (!button || (isRef(isStop) ? unref(isStop) : isStop)) {
          return
        }
        const mouseEvent = event as MouseEvent

        const { left, top, width, height } = button.getBoundingClientRect()

        const radius = Math.max(width * 0.75, height * 0.75, 200)

        const bx = left + width / 2
        const by = top + height / 2

        const dist =
          distanceBetween(mouseEvent.clientX, mouseEvent.clientY, bx, by) * 2
        const angle = Math.atan2(
          mouseEvent.clientY - by,
          mouseEvent.clientX - bx
        )

        const ox = -1 * Math.cos(angle) * Math.max(radius - dist, 0)
        const oy = -1 * Math.sin(angle) * Math.max(radius - dist, 0)

        const rx = oy / 2
        const ry = -ox / 2

        button.style.transition = `all 0.1s ease`
        button.style.transform = `translate(${ox}px,${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`
        button.style.boxShadow = `0px ${Math.abs(oy)}px ${
          (Math.abs(oy) / radius) * 40
        }px rgba(0,0,0,0.15)`
      },
    })
  })
}
