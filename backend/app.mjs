import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Raheem from './data.mjs';

const app = express();
app.use(express.json());

app.use(cors());


mongoose.connect('mongodb://localhost:27017/FilterIntention', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( () => {
    // console.log("check Raheem at Connection: ",Raheem);
}).catch(err => console.log("this is the rr: ", err));

const filterSchema = new mongoose.Schema({
    id:Number,
    category:String,
    name:String,
    img:String,
    rating:Number
})

const FilterTough = mongoose.model('FilterTough', filterSchema);


app.post('/loading', async(req,res) => {
    try{
        const {product} = req.body;
        
        console.log(`check the new Item : ${JSON.stringify(product)}`);
        const filterNew = await FilterTough.find({});
        // const updatedRaheem = filterNew.filter(item => item.id != id);
     

        // await FilterTough.insertMany(item);
        // await FilterTough.deleteMany({id: id});

        // const updatedRaheem = await FilterTough.find({});
  
        // console.log("this is the updated Raheem: ", updsatedRaheem);
     
        res.json({ message: 'Data updated successfully' });
    }
    catch(err){
        console.log("Your Errs: ",err);
        throw err;
    }
})



app.get('/start', async(req,res) => {
    try{
        
        const  getFilter = await FilterTough.find({});
      
        if(getFilter.length <= 0){
            console.log("i run");
            await FilterTough.insertMany(Raheem);
            const assignedData = await FilterTough.find({});
            res.json(assignedData);
        }
        res.json(getFilter)
    }catch(err){
        (res.status(500).json({err:err.message}))
    }
    
})

app.get('/handleFilter', async (req,res) => {
    try{
        const quotes = await FilterTough.find({});
       
        const genre = req.query.genre;
        
        const updatedData = quotes.filter(quote => quote.category === genre)
        res.json(updatedData);
    }
    catch(err){
        (res.status(500).json({err:err.message}))
    }
})


app.get('/activeSearch', async (req,res) => {
    try{
        const quotes = await FilterTough.find({});
        const searching = req.query.searching;
        const fav = quotes.filter(quote => quote.name.toLowerCase().includes(searching));
        res.json(fav);
        
    }
    catch(err){
        (res.status(500).json({err:err.message}));
    }
})

app.get('/handleRange', async (req,res) => {
    try{
        const crucialQuotes = await FilterTough.find({});
        const range = req.query.range;

        const getFiltered = crucialQuotes.filter(quote => quote.rating <= range);
        const maxFiltered = getFiltered.sort((a,b) => b.rating - a.rating);
        res.json(maxFiltered)

    }
    catch(err){
        console.log("Pray for Solving your Problems: ", err);
        throw err;
    }
})




// app.get('/activeSearch', (req,res) => {
//     const searching = req.query.search;
//     const filteredSearch = raheemData.filter(raheem => raheem.name.toLowerCase().includes(searching))
//     res.json({filteredSearch});
// })

// app.get('/range', (req,res) => {
//     const ratingRange = req.query.value;
//     console.log("rating in App Js: ", ratingRange);
//     const modifiedList = raheemData.filter(rah => rah.rating <= ratingRange);
//     const sortList = modifiedList.sort((a,b) => b.rating - a.rating);
//     res.json({modifiedList, sortList})
// })


// app.get('/start', (req,res) => {
//     res.json({raheemData})
// });

// app.get('/linksFilter', (req,res) => {
//     const category = req.query.category;
//     console.log("req query: ", category);
//     // res.json(category);
//     const filteredList = raheemData.filter(reham => reham.category.toLowerCase() === category.toLowerCase())
//     res.json({filteredList});
// })

app.listen(3500, () => console.log("Salam! I'm here on Local host 3500"))

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import raheemData from './data.mjs';


// const app = express();
// app.use(express.json());
// app.use(cors());


// mongoose.connect('mongodb://localhost:27017/counterDb',
//  { useNewUrlParser: true, useUnifiedTopology: true }).
//  then(() => console.log("Mongoose is connected"))
//  .catch(err => console.log("Error connecting to database:", err));

//  const specialSchema = new mongoose.Schema({
//   id: Number,
//   category: String,
//   name: String,
//   img: String,
//   rating: Number
// })

// const Resilient = mongoose.model('Resilient', specialSchema);

// // Insert data into the MongoDB collection
// // Resilient.insertMany(raheemData).then(() => {
// //     console.log('Data inserted successfully');
// // }).catch(err => {
// //     console.error('Error inserting data:', err);
// // });


// app.get('/start', async (req, res) => {
//     try {
//       const storedData = await Resilient.find({});
//       // if(err){
//       //   console.log("Alhamdulila here is the Chance to Grow ", err);
//       // }
//       const storedIds = storedData.map(data => data.id);
//       console.log('StoredIds: ', storedIds);
//       console.log("raheem: ", raheemData);
//       const filteredData = raheemData.filter(raheem => !storedIds.includes(raheem.id));
//       if(!storedData){
//         storedData = await Resilient.create(raheemData);
//       }
//       await Resilient.insertMany(filteredData);
//       res.json(filteredData); // Send only the data array
//     } 
//     catch (err) {
//       console.log("Error:", err);
//       throw err;
//     }
//   });