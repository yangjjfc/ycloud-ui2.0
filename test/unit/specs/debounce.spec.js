import { createTest, destroyVM } from '../util';
import Debounce from 'packages/debounce';

describe('Debounce', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Debounce, true);
    expect(vm.$el).to.exist;
  });
});

