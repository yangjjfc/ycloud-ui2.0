import { createTest, destroyVM } from '../util';
import Sku from 'packages/sku';

describe('Sku', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Sku, true);
    expect(vm.$el).to.exist;
  });
});
