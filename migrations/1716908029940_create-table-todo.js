
exports.shorthands = undefined;
exports.up = (pgm) => {
    pgm.createTable("todos",
    {
    id: { type: "uuid", primaryKey: true },
    description: { type: "varchar(255)", notNull: true },
    is_completed: { type: "boolean", default: false },
    created_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current_timestamp"),
    },
    
    updated_at: {
        type: "timestamp",
        notNull: true,
        default: pgm.func("current timestamp"),
    },
    });
};


exports.down = (pgm) => {
    pgm.dropTable("todos");
};
