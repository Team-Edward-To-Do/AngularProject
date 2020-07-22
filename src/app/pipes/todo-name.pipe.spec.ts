import { TodoNamePipe } from './todo-name.pipe';

describe('TodoNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TodoNamePipe();
    expect(pipe).toBeTruthy();
  });
});
