import { createTest, destroyVM } from '../util';
import MultiSelectPage from 'packages/multi-select-page';

describe('MultiSelectPage', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(MultiSelectPage, true);
    expect(vm.$el).to.exist;
  });
});

