const BaseTransform = require('fun.framework/classes/src/BaseTransform');

class ProjectTransform extends BaseTransform {
  morph(project) {
    return {
      id: project.id,
      type: 'project',
      attributes: {
        name: project.name,
        description: project.description,
        startedAt: project.startedAt,
        trelloBoard: project.trelloBoard,
        driveFolder: project.driveFolder,
        status: project.status
      }
    };
  }
}

module.exports = ProjectTransform;
