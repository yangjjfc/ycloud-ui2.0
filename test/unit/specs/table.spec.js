import { createTest, destroyVM } from '../util';
import Table from 'packages/table';

describe('Table', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Table, true);
    expect(vm.$el).to.exist;
  });
});

