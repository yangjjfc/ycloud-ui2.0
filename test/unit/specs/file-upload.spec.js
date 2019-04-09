import { createTest, destroyVM } from '../util';
import FileUpload from 'packages/file-upload';

describe('FileUpload', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(FileUpload, true);
    expect(vm.$el).to.exist;
  });
});

