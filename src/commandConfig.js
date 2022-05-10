const transform = require('./transform.js');

module.exports = {
  /**
   * transform
   * @description - transform
   */
  transform: {
    alias: 'transform code',
    description: 'transform code',
    options: [
      {
        command: '-p --srcpath <path>',
        description: 'src path',
      },
      {
        command: '-d, --output <path>',
        description: 'output path',
      },
    ],
    action: (entry) => {
      transform(entry);
    },
  },
};
