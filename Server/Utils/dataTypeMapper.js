function dataTypeMapper(data) {
    const type = typeof data;
    switch (type) {
      case "string":
        return `'${data}'`;
      default:
        return data;
    }
}

module.exports = dataTypeMapper;