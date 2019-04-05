import { createTest, destroyVM } from '../util';
import Pagination from 'packages/pagination';

describe('Pagination', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Pagination, true);
    expect(vm.$el).to.exist;
  });
});

