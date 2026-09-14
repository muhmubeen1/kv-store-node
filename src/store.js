// src/store.js

class Store {
    constructor() {
        this.storage = new Map();
    }

    // Handle SET key value
    set(key, value) {
        this.storage.set(key, value);
        return 'OK';
    }

    // Handle GET key
    get(key) {
        if (!this.storage.has(key)) {
            return null;
        }
        return this.storage.get(key);
    }

    // Handle DEL key
    del(key) {
        if (this.storage.has(key)) {
            this.storage.delete(key);
            return 1; // 1 key deleted
        }
        return 0; // 0 keys deleted
    }
}

module.exports = new Store();