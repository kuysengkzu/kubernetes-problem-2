const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const EmployeeSchema = mongoose.Schema({
  empid: { type: Number },
  name: { type: String },
  emailid: { type: String },
  password: { type: String }
});
const EmployeeModel = mongoose.model('employees', EmployeeSchema);

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_DB_URL,
    { useNewUrlParser: true }
  )
  .then(() =>console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// APIs
app.get('/employees', async (_req, res) => {
  const records = await EmployeeModel.find();
  res.send(records);
});

app.get('/employees/:empid', async (req, res) => {
  const { empid } = req.params;
  const record = await EmployeeModel.find({empid: Number(empid)});
  res.send(record);
});

app.post('/employees', async (req, res) => {
  const { empid, name, emailid, password } = req.body;
  let employee = await EmployeeModel.findOne({ emailid });
  if(employee) {
    res.status(409).send({ msg: "EMAILID ALREADY REGISTERED" });
  } else {
    employee = new EmployeeModel({ empid, name, emailid, password });
    await employee.save();
    res.status(201).send(employee);
  }
});

app.post('/login', async (req, res) => {
  const { emailid, password } = req.body;
  const employee = await EmployeeModel.findOne({ emailid, password });
  if (employee) {
    res.send({ msg: 'Welcome USER' });
  } else {
    res.status(403).send({ msg: 'Invalid Email or Password!' });
  }
});

// Server
const port = 3000;
app.listen(port, () => console.log(`Server running at port no ${port}`));