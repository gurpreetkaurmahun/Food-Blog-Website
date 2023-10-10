const express=require("express");

const fileUpload = require('express-fileupload');

const bodyParser=require("body-parser");
const ejs=require("ejs");
const path = require('path');
const mongoose=require("mongoose");
var _ = require('lodash');
const multer=require("multer");
// const upload=multer({dest:"./public/images/"});
const app=express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

const upload = multer({ storage: storage })

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended : false }));

app.use(express.json());
// app.use(upload.any());
// app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));



mongoose.connect('mongodb://localhost:27017/RecipeBlogDB', {
    family:4
})
    .then(() => {
        console.log('FINE');
    })
    .catch(() => {
        console.log("BAD");
    })
const recipeSchema=mongoose.Schema({
    date:String,
    category:String,
    recipeName:String,
    recipeTag:String,
    description:String,
    mainImage: {
        type : String
    },
    keyPoint:String,
    image2: {
        type : String
    },
    recipeSummary:String,
    image3: {
        type : String
    },
    preptime:String,
    cooktime:String,
    ingredients:String,
    method:String

});

const Recipe=mongoose.model("Recipe",recipeSchema);

const foodSchema=new mongoose.Schema({
    Name:String,
    content:[recipeSchema]
});

const Food=mongoose.model("Food",foodSchema);


const newfood=new Recipe({
    date:"date",
    category:"category",
    recipeName:"recipeName",
    recipeTag:"recipeTag",
    description:"description",
    mainImage:"Image",
    keyPoint:"keyPoint",
    image2:"image2",
    recipeSummary:"recipeSummary",
    image3:"image3",
    preptime:"preptime",
    cooktime: "cooktime",
    ingredients:  "ingredients",
    method:"method"});


// Food.findOneAndUpdate({Name:"drinks"},{$pull:{content:{_id:"64ff3f98fd172a686197b4fd"}}}).then(function(result){
//     console.log("done");
    
//   }).catch(function(reason){
//     console.log(reason);
//   })




// fetch("https://jsonplaceholder.typicode.com/users").then(function (result) {
//     const res=result.json();
//         return res;
//     }).then(function (data) { console.log(data); });

const array=[];

// Food.find().then(function(results){
//    console.log(results)
    
// });


Food.find().then(function(results){
    
    results.forEach(function(result){
        const resultArray=result.content;
        resultArray.forEach(function(r){
            array.push(r); 
           
            
           
        })
       
    }) 
});
app.get("/",function(request,response){
    response.render("home",{title:"Welcome to my website"});
});

  



app.get("/home",function(request,response){
    response.redirect("/")});

app.get("/baking",function(request,response){
    Food.findOne({Name:"baking"}).then(function(result){
       
        response.render("baking",{categoryDetail:result.Name,addressImage:result.content});
         
    }).catch(function(error){console.log(error);});
   
    });
app.get("/recipe",function(request,response){
    response.render("recipe");});

    

app.get("/salads",function(request,response){
    Food.findOne({Name:"salads"}).then(function(result){
    
        
        response.render("salads",{categoryDetail:result.Name,addressImage:result.content});
        // response.redirect("/salads");
        
        
    }).catch(function(error){console.log(error);});
    
});
app.get("/dessert",function(request,response){
    Food.findOne({Name:"dessert"}).then(function(result){
        
        
        response.render("dessert",{categoryDetail:result.Name,addressImage:result.content});
        //  response.redirect("/dessert");
        
    }).catch(function(error){console.log(error);});
    
});

app.get("/maincourse",function(request,response){
    Food.findOne({Name:"maincourse"}).then(function(result){
     
        
        response.render("maincourse",{categoryDetail:result.Name,addressImage:result.content});
        // response.redirect("/maincourse");
        
        
    }).catch(function(error){console.log(error);});
    
});
app.get("/drinks",function(request,response){
    Food.findOne({Name:"drinks"}).then(function(result){
     
        
        response.render("drinks",{categoryDetail:result.Name,addressImage:result.content});
        // response.redirect("/drinks");
        // response.end();
        
    }).catch(function(error){console.log(error);});
    
});
app.get("/compose",function(request,response){
    response.render("compose",{title:"Welcome to my website"});
});
app.get("/ChocolateCake",function(request,response){
    response.render("ChocolateCake");}
    );

app.get("/pasta",function(request,response){
    response.render("pasta");
});

app.get("/baking/:topic",function(request,response){
    const id= request.params.topic ;
    console.log(id);
    Food.findOne({Name:"baking"}).then(function(result){
     
        const search=result.content;
        search.forEach(function(identity){
            // console.log(identity._id.toString());
            const checkId=identity._id.toString();
            if (checkId===id){
                
                  response.render("practice",{Address:identity});
            };
        })
        //  response.render("practice",{Address:result.content});
}).catch(function(error){console.log(error);})});

app.get("/salads/:topic",function(request,response){
    const id= request.params.topic ;
    console.log(id);
    Food.findOne({Name:"salads"}).then(function(result){
     
        const search=result.content;
        search.forEach(function(identity){
            // console.log(identity._id.toString());
            const checkId=identity._id.toString();
            if (checkId===id){
               
                  response.render("practice",{Address:identity});
            };
        })
        //  response.render("practice",{Address:result.content});
}).catch(function(error){console.log(error);})});

app.get("/maincourse/:topic",function(request,response){
    const id= request.params.topic ;
    console.log(id);
    Food.findOne({Name:"maincourse"}).then(function(result){
     
        const search=result.content;
        search.forEach(function(identity){
            // console.log(identity._id.toString());
            const checkId=identity._id.toString();
            if (checkId===id){
                console.log(identity);
                  response.render("practice",{Address:identity});
            };
        })
        //  response.render("practice",{Address:result.content});
}).catch(function(error){console.log(error);})});

app.get("/dessert/:topic",function(request,response){
    const id= request.params.topic ;
    console.log(id);
    Food.findOne({Name:"dessert"}).then(function(result){
     
        const search=result.content;
        search.forEach(function(identity){
            // console.log(identity._id.toString());
            const checkId=identity._id.toString();
            if (checkId===id){
                console.log(identity);
                  response.render("practice",{Address:identity});
            };
        })
        //  response.render("practice",{Address:result.content});
}).catch(function(error){console.log(error);})});

app.get("/drinks/:topic",function(request,response){
    const id= request.params.topic ;
    console.log(id);
    Food.findOne({Name:"drinks"}).then(function(result){
     
        const search=result.content;
        search.forEach(function(identity){
            // console.log(identity._id.toString());
            const checkId=identity._id.toString();
            if (checkId===id){
                
                  response.render("practice",{Address:identity});
            };
        })
        //  response.render("practice",{Address:result.content});
}).catch(function(error){console.log(error);})});


app.get("/tryMenu",function(request,response){
  
    const title=request.query.search.toUpperCase();
    console.log(title);
    const searchArray=[];
  let result="";
    

    array.forEach(function(recipe){
        if(recipe.recipeName.toUpperCase().includes(title)===true){
            // console.log("the recipe is",recipe);
            result="yes match found";
            searchArray.push(recipe);
           
           
        }
    });

   
   console.log("result is" ,result);
    
    response.render("try",{Query:title,Address:searchArray,Address1:array,Results:result})
   

        
});



// /upload and/ image are practice routes
// app.post("/upload",upload.fields([{name:"imagery"},{name:"imagery1"}]),function(request,response){
//         console.log(request.body);
//         const fileInfo=request.files;
//         console.log(fileInfo["imagery"][0].filename);
//      });
// app.get("/image",function(request,response){
//     response.render("image");
// })


   
    

 app.post("/compload",upload.fields([{name:"mainImage"},{name:"image2"},{name:"image3"}]),function(request,response){
 

    const date=request.body.date;
    const category=request.body.category;
    const  recipeName=request.body.recipeName;
    const recipeTag=request.body.recipeTag;
    const description=request.body.description;
    const Image=request.files["mainImage"][0].filename;
    const keyPoint=request.body.keyPoint;
    const image2=request.files["image2"][0].filename;
    const recipeSummary=request.body.recipeSummary;
    const image3=request.files["image3"][0].filename;
    const preptime=request.body.preptime;
    const cooktime=request.body.cooktime;
    const ingredients=request.body.ingredients;
    const method=request.body.method;

 

    const newrecipe=new Recipe({
        date:date,
        category:category,
        recipeName:recipeName,
        recipeTag:recipeTag,
        description:description,
        mainImage:Image,
        keyPoint:keyPoint,
        image2:image2,
        recipeSummary:recipeSummary,
        image3:image3,
        preptime:preptime,
        cooktime: cooktime,
        ingredients:  ingredients,
        method:method});


    array.push(newrecipe);

//   IMPORTANT
     
    
    Food.findOne({Name:category}).then(function(result){
        if(!result){
            const entry=new Food({
                Name:category,
                content:[newrecipe]
            });
            entry.save();
       
        }
        else{
            result.content.push(newrecipe);
            result.save();
            response.redirect("/"+category);
           
        }
    }).catch(function(error){console.log(error);});
    
});

app.listen(4200,function(request,response){
    console.log("Server started at port 4200");
});


