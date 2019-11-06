  // dependencies
  const dependable = require('dependable');
  const path = require('path');

  // get a handle to the container
  const container = dependable.container();

  /**
   * A list of app dependencies with arrays with index 0 as the variable name and index 1 as the actual name of
   * dependency.
   * @type {*[][]}
   */
  const appDependencies =  [
      ['_', 'lodash'],
      ['passport', 'passport']
  ];

  /**
   * Loops through the app dependencies, registers the variable name at index 0 (value[0]) and requires the actual
   * dependency at index 1 (value[1]).
   */
  appDependencies.forEach(function (value) {
      container.register(value[0], function () {
          return require(value[1]);
      });
  });

  /**
   * Loads all modules in the specified directory
   */
  container.load(path.join(__dirname, '/controllers'));
  container.load(path.join(__dirname, '/helpers'));

  /**
   * Register the specified directory modules with the container
   */
  container.register('container', function () {
     return container;
  });

  // exports as a module
  module.exports = container;