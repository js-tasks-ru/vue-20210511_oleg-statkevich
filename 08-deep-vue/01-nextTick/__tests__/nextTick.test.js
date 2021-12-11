const { getSolutionPath } = require('taskbook-test-utils');
const { default: MiniMessenger, TASK_SOLVED } = require(getSolutionPath('components/MiniMessenger'));

describe('deep-vue/nextTick', () => {
  describe('MiniMessenger', () => {
    it('MiniMessenger добавлен, но требует ручной проверки', async () => {
      expect(MiniMessenger).toBeDefined();
    });

    it('MiniMessenger должен экспортировать константу TASK_SOLVED со значением true', async () => {
      expect(TASK_SOLVED).toBeTruthy();
    });
  });
});
