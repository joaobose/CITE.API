class BaseRepository {
  model = undefined;

  constructor(model) {
    this.model = model;
  }

  async all() {
    return await this.model.findAll();
  }

  // returns new entity
  async create(data) {
    return await this.model.create(data);
  }

  // returns affected rows count
  async update(id, data) {
    return await this.model.update(data, { where: { id: id } });
  }

  // returns affected rows count
  async delete(id) {
    return await this.model.destroy({ where: { id: id } });
  }

  async show(id) {
    return await this.model.findOne({ where: { id: id } });
  }
}
