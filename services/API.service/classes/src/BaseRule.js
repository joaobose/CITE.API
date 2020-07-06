class BaseRule {
  async eval(data) {
    try {
      let body = await this.body(data);
      return await this.predicate(body);
    } catch {
      return false;
    }
  }

  async body(data) {
    return data;
  }

  async predicate(body) {
    return true;
  }
}

module.exports = BaseRule;
