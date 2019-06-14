import { createTest, destroyVM } from '../util';
import Throttle from 'packages/throttle';

describe('Throttle', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Throttle, true);
    expect(vm.$el).to.exist;
  });
});

