import { createTest, destroyVM } from '../util';
import Dialog from 'packages/dialog';

describe('Dialog', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Dialog, true);
    expect(vm.$el).to.exist;
  });
});

