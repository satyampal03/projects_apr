const express = require("express");

const router = express.Router();

const { handleGetAllUsersAPI,
        handleGetUserById,
        handlePostReqUserCreation,
        handleUpdateUserById,
        handleDeleteUserById,
        hadleGetUsers
     } = require("../controllers/user");

// get http request on server in json Formate

// create user
router
 .route("/")
 .post(handlePostReqUserCreation)
 .get(hadleGetUsers)


// get in HTML Formate
router.get("/api/users", handleGetAllUsersAPI);

// find data throw id
router
    .route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


module.exports = router;
