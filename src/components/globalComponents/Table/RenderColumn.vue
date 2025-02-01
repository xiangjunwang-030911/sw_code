<script>
import { defineComponent, ref } from "vue"
export default defineComponent({
  props: {
    render: {
      type: Function,
      default: () => ({}),
    },
    scope: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => props.render(props.scope)
  },
})
</script>
