"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up(queryInterface) {
        return queryInterface.bulkInsert('orders', [
            {
                user_id: 1,
            },
            {
                user_id: 3,
            },
            {
                user_id: 2
            },
        ], {});
    },
    down(queryInterface) {
        return queryInterface.bulkDelete('orders', {});
    }
};
