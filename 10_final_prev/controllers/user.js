const User = require("../models/user");

async function handleGetAllUsersAPI(req, res) {
  const data = await User.find(); // empty find means whole data
  res.json(data);
}

async function handleGetUserById(req, res) {
  try {
    const userId = req.params.id;

    // 1. Await the database call
    // 2. Pass a query object { fieldName: value }
    const data = await User.findById(userId); 
    console.log(userId);

    if (!data) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


async function handleUpdateUserById(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { returnDocument: "after" } // Replaces { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.json({ status: "Success", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: "Update failed" });
  }
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}


//--------------------------//

async function hadleGetUsers(req, res) {
  //   res.send("now users functions is working");

  const data = await User.find();

  const html = `
            <ul>
                ${data.map((user) => `<li>${user.first_name}</li>`).join("")}
            </ul>
        `;
  res.send(html);
}

async function handlePostReqUserCreation(req, res) {
  const { first_name, last_name, email, gender, job_title } = req.body;
  // console.log(first_name, last_name, email, gender, job_title);
  if (!first_name || !last_name || !email || !gender || !job_title) {
    return res.status(400).json({
      message: "All Fields are Required",
    });
  }

  const result = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
    job_title: job_title,
  });

  console.log(result);

  res.status(201).json({
    message: "User Created Successfully",
  });
}


module.exports = {
  handleGetAllUsersAPI,
  handleGetUserById,
  handlePostReqUserCreation,
  handleUpdateUserById,
  handleDeleteUserById,
  hadleGetUsers,
};
