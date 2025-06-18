module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Require type always
    'type-enum': [2, 'always', [
      'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test',
    ]],
    // Require scope always
    'scope-empty': [2, 'never'],
    // Require subject always
    'subject-empty': [2, 'never'],
  },
};
