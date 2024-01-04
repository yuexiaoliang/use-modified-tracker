import { Ref } from 'vue'

declare function useModifiedTracker<T>(
  newVal: Ref<T>,
  options?: {
    defaultValue?: T,
    deep?: boolean,
    immediate?: boolean,
    updateImmediate?: boolean,
    debug?: boolean
  }
): [Ref<boolean>, () => void]

export default useModifiedTracker
