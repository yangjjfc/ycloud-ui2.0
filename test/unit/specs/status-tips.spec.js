import { createTest, destroyVM } from '../util';
import StatusTips from 'packages/status-tips';

describe('StatusTips', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(StatusTips, true);
    expect(vm.$el).to.exist;
  });
});
