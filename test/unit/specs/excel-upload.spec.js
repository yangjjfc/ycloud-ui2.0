import { createTest, destroyVM } from '../util';
import ExcelUpload from 'packages/excel-upload';

describe('ExcelUpload', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(ExcelUpload, true);
    expect(vm.$el).to.exist;
  });
});
