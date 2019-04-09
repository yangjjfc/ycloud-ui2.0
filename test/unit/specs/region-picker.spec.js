import { createTest, destroyVM } from '../util';
import RegionPicker from 'packages/region-picker';

describe('RegionPicker', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(RegionPicker, true);
    expect(vm.$el).to.exist;
  });
});
