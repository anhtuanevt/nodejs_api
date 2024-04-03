const mongoose = require('mongoose')

//connect mongoose
mongoose.connect("mongodb+srv://admin:admin@cluster0.7ez8jka.mongodb.net/").then( _ => console.log('Connected mongoose success!...'))
// mongoose.connect("mongodb://localhost:27017").then( _ => console.log('Connected mongoose success!...'))
.catch( err => console.error(`Error: connect:::`, err))


module.exports = mongoose;