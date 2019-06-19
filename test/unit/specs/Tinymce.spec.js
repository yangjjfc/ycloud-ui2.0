import { createTest, destroyVM } from '../util';
import Tinymce from 'packages/Tinymce';

describe('Tinymce', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Tinymce, true);
    expect(vm.$el).to.exist;
  });
});
