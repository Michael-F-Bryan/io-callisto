import { shallowMount } from '@vue/test-utils'
import InteractiveCanvas from '@/components/InteractiveCanvas.vue'
import World from '@/game/World';
import { Linear, updateLinearMotion } from '@/game/physics';
import Vector2D from '@/game/Vector2D';

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

describe('Linear motion', () => {
  it('Gives us a linear velocity of 0 when none is provided', () => {
    const motion = new Linear();
    expect(motion.velocity.x).toBe(0);
    expect(motion.velocity.y).toBe(0);
  })
  it('Can simulate two seconds of horizontal motion', () => {
    const motion = new Linear(new Vector2D (1, 0));
    const initialPosition = new Vector2D(500, 100);

    const newPosition = updateLinearMotion(initialPosition, motion, 2);

    expect(newPosition.y).toBe(initialPosition.y);
    expect(newPosition.x).toBe(initialPosition.x + 2 * motion.velocity.x);
  })
})
