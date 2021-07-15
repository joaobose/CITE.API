const BaseTransform = require('fun.framework/classes/src/BaseTransform');
const RoleTransform = require('./role.transform');
const ProjectTransform = require('./project.transform');

class UserTransform extends BaseTransform {
  constructor() {
    super();
    this.transforms = {
      role: new RoleTransform(),
      project: new ProjectTransform(),
      user: this
    };
  }

  morph(user) {
    return {
      id: user.id,
      type: 'user',
      attributes: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        description: user.description,
        photo: user.photo,
        token: user.token
      },
      relationships: {
        role: {
          data: !!user.role
            ? this.transforms.role.item(user.role)
            : {
                id: user.roleId,
                type: 'role'
              }
        },
        ...(user.projects && {
          projects: { data: this.transforms.project.collection(user.projects) }
        }),
        ...(user.managedProjects && {
          managedProjects: {
            data: this.transforms.project.collection(user.managedProjects)
          }
        }),
        ...(user.applicants && {
          applicants: {
            data: this.transforms.user.collection(user.applicants)
          }
        })
      }
    };
  }
}

module.exports = UserTransform;
