module.exports = function(grunt) {
 var root = '/Users/Emma/Sites/-CONFIG-/grunt/'; 
 require('jit-grunt')(grunt);
 require('time-grunt')(grunt);

 require('load-grunt-config')(grunt, {
    configPath: root + '/tasks',
  config: {
    ftp: grunt.file.readJSON('ftpinfo.json'),
      path: grunt.file.readJSON(root + 'routes.json')
    },
    loadGruntTasks: false
  });
};
