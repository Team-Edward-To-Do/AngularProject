import { TodoCategoryPipe } from './todo-category.pipe';

describe('TodoCategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoCategoryPipe();
    expect(pipe).toBeTruthy();
  });
});
