const mongoose = require('mongoose')

//connect mongoose
mongoose.connect("mongodb://localhost:27017").then( _ => console.log('Connected mongoose success!...'))
.catch( err => console.error(`Error: connect:::`, err))


module.exports = mongoose;