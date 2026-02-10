import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('mounts and renders with design tokens', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('A Orixe')
    expect(wrapper.text()).toContain('design-tokens.css')
  })
})
