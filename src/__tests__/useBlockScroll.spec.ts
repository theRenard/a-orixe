import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useBlockScroll } from '@/composables/useBlockScroll'

vi.mock('gsap', () => {
  const set = vi.fn((target: Record<string, unknown>, vars: { y?: number }) => {
    if (typeof vars.y === 'number') target.__gsapY = vars.y
  })
  const getProperty = vi.fn((target: Record<string, unknown>, prop: string) => {
    if (prop === 'y') return target.__gsapY ?? 0
    return 0
  })
  const to = vi.fn((target: Record<string, unknown>, vars: { y?: number; onUpdate?: () => void; onComplete?: () => void }) => {
    if (typeof vars.y === 'number') target.__gsapY = vars.y
    vars.onUpdate?.()
    vars.onComplete?.()
    return { kill: vi.fn() }
  })

  return {
    default: {
      registerPlugin: vi.fn(),
      set,
      getProperty,
      to,
    },
  }
})

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    update: vi.fn(),
    refresh: vi.fn(),
    scrollerProxy: vi.fn(),
  },
}))

function setScrollableMetrics(
  element: HTMLElement,
  {
    scrollTop,
    scrollHeight,
    clientHeight,
  }: {
    scrollTop: number
    scrollHeight: number
    clientHeight: number
  },
) {
  let currentScrollTop = scrollTop

  Object.defineProperty(element, 'scrollTop', {
    configurable: true,
    get: () => currentScrollTop,
    set: (value: number) => {
      currentScrollTop = value
    },
  })
  Object.defineProperty(element, 'scrollHeight', {
    configurable: true,
    get: () => scrollHeight,
  })
  Object.defineProperty(element, 'clientHeight', {
    configurable: true,
    get: () => clientHeight,
  })
}

function createHarness(initiallyEnabled: boolean) {
  return defineComponent({
    setup() {
      const mainRef = ref<HTMLElement | null>(null)
      const railRef = ref<HTMLElement | null>(null)
      const enabled = ref(initiallyEnabled)
      const { currentBlockIndex } = useBlockScroll({
        containerRef: mainRef,
        railRef,
        enabled,
        options: {
          transitionDuration: 0,
          cooldownMs: 0,
          scrollThresholdPx: 80,
        },
      })

      return { mainRef, railRef, currentBlockIndex }
    },
    template: `
      <main ref="mainRef">
        <div ref="railRef">
          <section data-block>
            <div data-block-inner class="block-inner"></div>
          </section>
          <section data-block>
            <div data-block-inner class="block-inner"></div>
          </section>
        </div>
        <output class="block-index">{{ currentBlockIndex }}</output>
      </main>
    `,
  })
}

describe('useBlockScroll', () => {
  const originalInnerHeight = window.innerHeight
  const originalRequestAnimationFrame = window.requestAnimationFrame
  const originalCancelAnimationFrame = window.cancelAnimationFrame

  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    })
    window.requestAnimationFrame = vi.fn(() => 1) as typeof window.requestAnimationFrame
    window.cancelAnimationFrame = vi.fn() as typeof window.cancelAnimationFrame
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
    })
    window.requestAnimationFrame = originalRequestAnimationFrame
    window.cancelAnimationFrame = originalCancelAnimationFrame
  })

  it('advances on a line-mode wheel event when the block is near the bottom edge', async () => {
    const wrapper = mount(createHarness(true))
    await nextTick()

    const inner = wrapper.find('.block-inner').element as HTMLElement
    setScrollableMetrics(inner, {
      scrollTop: 390,
      scrollHeight: 1200,
      clientHeight: 800,
    })

    window.dispatchEvent(new WheelEvent('wheel', {
      deltaY: 3,
      deltaMode: 1,
      cancelable: true,
    }))
    await nextTick()

    expect(wrapper.find('.block-index').text()).toBe('1')
  })

  it('keeps native inner scrolling active before the block reaches the bottom', async () => {
    const wrapper = mount(createHarness(true))
    await nextTick()

    const inner = wrapper.find('.block-inner').element as HTMLElement
    setScrollableMetrics(inner, {
      scrollTop: 200,
      scrollHeight: 1200,
      clientHeight: 800,
    })

    window.dispatchEvent(new WheelEvent('wheel', {
      deltaY: 3,
      deltaMode: 1,
      cancelable: true,
    }))
    await nextTick()

    expect(wrapper.find('.block-index').text()).toBe('0')
  })

  it('ignores wheel navigation when block scroll is disabled', async () => {
    const wrapper = mount(createHarness(false))
    await nextTick()

    const inner = wrapper.find('.block-inner').element as HTMLElement
    setScrollableMetrics(inner, {
      scrollTop: 400,
      scrollHeight: 1200,
      clientHeight: 800,
    })

    window.dispatchEvent(new WheelEvent('wheel', {
      deltaY: 120,
      deltaMode: 0,
      cancelable: true,
    }))
    await nextTick()

    expect(wrapper.find('.block-index').text()).toBe('0')
  })
})
