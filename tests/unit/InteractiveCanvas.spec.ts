import { shallowMount } from '@vue/test-utils'
import InteractiveCanvas from '@/components/InteractiveCanvas.vue'
import World from '@/game/World';

describe('InteractiveCanvas.vue', () => {
  it('renders as an empty canvas element', () => {
    const world = new World();

    const wrapper = shallowMount(InteractiveCanvas, {
      propsData: { world }
    });

    expect(wrapper.element.nodeName).toEqual("CANVAS");
    expect(wrapper.element.childNodes.length).toBe(0);
  });
});
