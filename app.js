const express= require('express')
//const path=require('path')
const morgan = require('morgan')
const mongoose =require('mongoose')

const { render } = require('ejs')
const blogRoutes=require('./routes/blogRoutes')

//express app
const app = express()
//let initial_path=path.join(__dirname,'views')


//connect to mongodb
const dbURI = 'mongodb+srv://test:test123@nodetuts.by46h0r.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> app.listen(3000))
.catch((err)=> console.log(err));

//register view engine
app.set('view engine','ejs')

//listen for request
//app.listen(3000)



//middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));

// app.use((req,res,next)=>{
//   console.log('new request made')
//   console.log('host', req.hostname)
//   console.log('path',req.path)
//   console.log('method',req.method)
//   next();
// })

// //browser will hang because after this console it does not know what to do next so we use next()
// app.use((req,res,next)=>{
//   console.log('next middleware')
//   next();
// }) 

// app.use(morgan('dev')) 

app.use((req,res,next)=>{
  res.locals.path=req.path;
  next();
})

//mongoose and mongodb sandbox routes
// app.get('/add-blog', (req,res)=>{
// const blog=new Blog({
//   title:'new blog 2',
//   snippet: 'about my new blog',
//   body:'more about my new blog'
// })

// blog.save()
// .then(result=>{
//   res.send(result)
// })
// .catch(err=>{
//   console.log(err)
// })
// }) 

// app.get('/all-blogs',(req,res)=>{
//   Blog.find()
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// })

// app.get('/single-blog',(req,res)=>{
//   Blog.findById('62ff92f0218ee7682f915ab1')
//   .then((result)=>{
//     res.send(result)
//   })
//   .catch((err)=>{
//     console.log(err)
//   })
// })

app.get('/',(req,res)=>{
  // res.send('<p>home page</p>')
 // res.sendFile('./views/index.html',{root: __dirname})
//  const blogs=[
//    {title:'hehe',snippet:'lorem hehe not funny'},
//    {title:'heh',snippet:'lorem hehe yes funny'},
//    {title:'he',snippet:'lorem hehe maybe funny'}
//  ]
//  res.render('index', {title:'Home', blogs});

res.redirect('/blogs')

})

// app.use((req,res,next)=>{
//   console.log('next middleware')
//   next();
// })

app.get('/about',(req,res)=>{
    //res.send('<p>about page</p>')
    //res.sendFile('./views/about.html',{root: __dirname})
    res.render('about', {title:'About'})
 })

//  //redirects 
//  app.get('/about-us',(req,res)=>{
//     res.redirect('/about')
//  })

//blog routes
app.use('/blogs',blogRoutes)

 //404 page
 app.use((req,res)=>{
//res.status(404).sendFile('./views/404.html',{root: __dirname})
res.status(404).render('404', {title:'404'})
 })