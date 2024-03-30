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

app.get('/start', async(req,res) => {
    try{
        const  getFilter = await FilterTough.find({});
        
        await FilterTough.deleteMany({
            $or:[
                {img: null},
                {name: null},
                {category:null}
            ]
        });

        
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

//Loading All Data
app.get('/loadAllData', async (req,res) => {
    try{
        const allItems = await FilterTough.find({});
        if (allItems.length === 0){
            res.json({message:"No Data Found"});
        }
        res.json(allItems);

    }
    catch(err){
        console.log("Be Deliberate: ", err);
        throw err;
    }

})


//Searching Specific item With Id
app.get('/searchId', async (req,res) => {
    try{
        console.log('req.id: ', req.query.id );
        const id =req.query.id;
        const allItems = await FilterTough.find({});
        const finding = allItems.filter(item => item.id.toString().includes(id));
        res.json(finding);

    }
    catch(err){
        console.log("Be Deliberate: ", err);
        throw err;
    }

})

//Deleting item with Id
app.delete('/deleteItem', async (req,res) => {
    try{
        console.log('Received Id: ', req.query.id );
        const id =req.query.id;

        const item = await FilterTough.find({id});
        if(item){
            console.log(" FOUND ");
            console.log("this is the Item:", item);
            await FilterTough.deleteMany({id});

        }
        else{
            console.log(" Not FOUND ");
        }
      res.json({message: 'Items Removed Successfully'})
    }
    catch(err){
        console.log("Be Deliberate: ", err);
        throw err;
    }
})

//Adding new Item
app.post('/addingItem', async (req,res) => {
    try{
        console.log('Received body: ', req.body );
        const item =req.body;
        const id = item[0].id;
        console.log("id: ", id);
        const data = await FilterTough.find({id});
        if(data.length > 0){
            console.log("Already Exist", data);
            const allPics = await FilterTough.find({});
            console.log("data length: ",allPics.length);
        }
        else{
            console.log("Success");
            await FilterTough.create(item);
        }
        
        res.json({message: 'Items Removed Successfully'})

      
    }
    catch(err){
        console.log("Be Deliberate: ", err);
        throw err;
    }
})

// Handle Menu Clicks 
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

// Handle Search Bar
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

// Working With Range
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

app.listen(3500, () => console.log("Salam! I'm here on Local host 3500"))
