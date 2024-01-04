import { ref, watch } from 'vue'

import SparkMD5 from 'spark-md5'

const EMPTY_VALUE = 'undefined'

/**
 * Custom hook that tracks modifications to a value.
 *
 * @param {any} newVal - The new value to track modifications for.
 * @param {object} options - Optional configuration options.
 * @param {any} options.defaultValue - The default value to use when the new value is undefined.
 * @param {boolean} options.updateImmediate -
 * @param {boolean} options.debug - Whether to enable debug logging.
 * @param {boolean} options.deep - vue watch deep option.
 * @param {boolean} options.immediate - vue watch immediate option.
 * @returns {[Ref<boolean>, function]} - An array containing the modified state and the update function.
 */
export default function useModifiedTracker(
  newVal,
  { defaultValue = EMPTY_VALUE, deep = true, immediate = true, updateImmediate = false, debug = false } = {}
) {
  const modified = ref(false)

  let oldVal = defaultValue
  let oldHash

  updateOldHash()

  function updateOldHash() {
    oldHash = SparkMD5.hash(JSON.stringify(oldVal))
  }

  function updateOldVal() {
    oldVal = JSON.parse(JSON.stringify(newVal?.value || EMPTY_VALUE))
    updateOldHash()
  }

  function watcher() {
    const hash = SparkMD5.hash(JSON.stringify(newVal?.value || EMPTY_VALUE))
    if (debug) console.log({ hash, oldHash })
    modified.value = hash !== oldHash
  }

  function update() {
    updateOldVal()
    watcher()
  }

  watch(newVal, watcher, { deep, immediate })

  if (updateImmediate) update()

  return [modified, update]
}
