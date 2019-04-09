import { createTest, destroyVM } from '../util';
import TableTree from 'packages/tableTree';

describe('TableTree', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(TableTree, true);
    expect(vm.$el).to.exist;
  });
});

