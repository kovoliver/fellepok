import httpServer from "./HTTP.js";

class Controller {
    constructor(schema) {
        this.http = httpServer;
        this.schema = schema;
    }
}

export default Controller;