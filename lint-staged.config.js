// lint-staged规则
export default {
  // ts文件走eslint,tsc  TODO, ts文件走vue-tsc也行吧???
  'src/**/*.{ts,tsx}': [
    'prettier --write',
    'eslint -c .eslintrc.json --fix',
    () => 'tsc --noEmit --skipLibCheck',
  ],
  // vue文件走eslint, stylelint, vue-tsc
  'src/**/*.vue': [
    'prettier --write',
    'eslint -c .eslintrc.json',
    'stylelint --config .stylelintrc.json',
    () => 'vue-tsc --noEmit --skipLibCheck',
  ],
  // js文件走eslint
  'src/**/*.{json,js,jsx}': ['prettier --write', 'eslint --fix'],
  // scss文件走stylelint
  'src/**/*.{css,scss}': ['prettier --write', 'stylelint --config .stylelintrc.json --fix'],
};
