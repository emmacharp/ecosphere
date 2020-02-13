module.exports = function(grunt) {
 var root = '/Users/Emma/projects/grunt-config/';
 require('load-grunt-config')(grunt, {
    configPath: root + '/tasks',
  config: {
    ftp: grunt.file.readJSON('ftpinfo.json'),
      path: grunt.file.readJSON(root + 'routes.json')
    },
    loadGruntTasks: false
  });
};
