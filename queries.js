const Pool = require("pg").Pool;
const pool = new Pool({
  user: "tazkiya",
  host: "localhost",
  database: "heulauladatabases",
  password: "root",
  port: 5432,
});

// GET: /users | getUsers()
const getUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY ID ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// GET: /users/:id | getUserById()
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

// POST: /users | createUser()
const createUser = (req, res) => {
  const { first_name, last_name, gender, email, created_date } = req.body;

  pool.query(
    "INSERT INTO users (first_name, last_name, gender, email, created_date) VALUES ($1, $2, $3, $4, $5 ) RETURNING *",
    [first_name, last_name, gender, email, created_date],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

// PUT: /users/:id | updateUser()
const updateUser = (req, response) => {
  const id = parseInt(req.params.id);
  const { first_name, last_name, gender, email, created_date } = req.body;

  pool.query(
    "UPDATE users SET first_name = $1, last_name = $2, gender = $3, email = $4, created_date = $5",
    [first_name, last_name, gender, email, created_date, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// DELETE: /users/:id | deleteUser()
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
