// const url = 'https://course-api.com/react-tours-project'; //tours-link 


const container = document.querySelector(".container");
let allData;


document.addEventListener('DOMContentLoaded', e => {
    fetch('http://localhost:3500/start').then(
        response => response.json()
    ).then
    (data => {
        allData = data;
        console.log("lets see data: ", data);
        showItems(data);
    }).catch(
        err => console.log("this is the error: ", err)
    )
})
// const url = 'https://course-api.com/react-tours-project';

const refresh = document.querySelector("#refresh");

refresh.addEventListener('click', e => {
    
    const newData = [{
        id:4354,
        category:'Growth',
        name:'Privilege',
        
        img:'./images/Privilege%20of%20Strong.jpg',
        rating:100
    }];

    fetch(`http://localhost:3500/loading`, {
        method: 'POST',
        Headers :{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newData)
        
    }).then(response => response.json()).then
    (data => {
        console.log(data);
        // console.log(data);
    }).catch(err => console.log("Love Errs: ", err));
    
})


const allLinks = document.querySelectorAll('.link');

allLinks.forEach(link => {
    link.addEventListener('click', e => {
        setVal(100);
        const genre = link.dataset.cat;
        fetch(`http://localhost:3500/handleFilter?genre=${genre}`).then
        (response => response.json()).then
        (data => {
            console.log("bE there to make Great Relations with Allah(SWT) ", data);
            if(genre === 'all'){
                showItems(allData)
            }else{
                showItems(data)
            }
        }).catch(err => console.log("Problems and tough People will always be there"));
    })
})
const searchInput = document.querySelector("#search");

searchInput.addEventListener('input', e => {
    const value = e.target.value;
    fetch(`http://localhost:3500/activeSearch?searching=${value}`).
    then(response => response.json()).then(
        data => {
            console.log("love to see the data", data);
            showItems(data);
        }
    ).catch(err => console.log("do you know how to deal with erros"))
})

const range = document.querySelector(".range");

range.addEventListener('input', e => {
    const value = range.value;
    console.log("value: ", value);
    fetch(`http://localhost:3500/handleRange?range=${value}`).then(
        response => response.json()).then(data => {
            console.log("Range Data: ", data);
            showItems(data);
            setVal(value);
        })
})


const setVal = (val) => {
    range.value = val;
    const inner = document.querySelector('#val');
    inner.textContent = val;
}




// const getSearchInput = (e) => {    
//     e.preventDefault();
//     const mySearch = e.target.value;
//     fetch(`http://localhost:3000/activeSearch?search=${mySearch}`).then(
//         response => response.json()
//     ).then(data =>
//         {
//             showItems(data.filteredSearch);
//         }
//     ).catch(err => console.log(err)); 
// } 

// const search = document.querySelector('#search');
// search.addEventListener('input',getSearchInput);

// const listItems = document.querySelectorAll('.link');

// listItems.forEach(link=>
//             {
//             link.addEventListener('click', e =>
//             {
//                 console.log("allDAta getting fetch info: ", allData);
//                 const category = link.dataset.cat;
//                 // console.log('category in frontEnd:', category);
//                 fetch(`http://localhost:3000/linksFilter?category=${category}`).then(
//                     response => response.json()).then(data =>
//                         {
//                             console.log("filtered data: ", data.filteredList);
//                             if(link.dataset.cat === 'all'){
//                                 showItems(allData);  
//                             }
//                             else
//                             {
//                                 showItems(data.filteredList)
//                             } 
//                         }
                       
//                     ).catch(err => console.log("this is the error: ", err));
//             })         
//         });

// // // Ranting Range 
// const range = document.querySelector('.range');
// const val = document.querySelector('#val');
// val.textContent = range.value;
// console.log("Range: ", range);
// function dealHere(){
//     val.textContent = range.value;
// }
// // (raheem.rating <= range.value)
// range.addEventListener('input', e => {
//     const value = range.value;
//     fetch(`http://localhost:3000/range?value=${value}`).then(response => response.json()).then(data => {
//         console.log("show me data", data.modifiedList);
//         showItems( data.sortList)
//     }).catch(err => console.log("i caught the error"));
//     dealHere();
// });

// Showing All Items     
function showItems(raheemData){
    const item = raheemData.map(raheem => {
        return `<div class="item" style="padding-top:10px; box-shadow:0 2px 5px; width:220px; height:300px;">
                    <div style="text-align:center">
                    <img src=${raheem.img} style="display:inline-block" width="200px" height="250px">
                    </div>
                    <div style="display:flex; justify-content:space-between">
                    <h5> ${raheem.name}</h5>
                    <p style="margin-right:15px;padding-top:5px;">Ratings ${raheem.rating}</p>
                    </div>
                    
                </div>`
    }).join('');

    container.innerHTML = item;
    
}




  
// let list = [19, 13, 7, 35];
// 