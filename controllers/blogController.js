const Blog = require('../models/blog')
//blog_index blog_details blog_create_get blog_create_post blog_delete

const blog_index=(req,res)=>{
    Blog.find().sort({createdAt: -1})//to display from newest to oldest
    .then((result)=>{
  res.render('blogs/index', {blogs: result, title: 'All blogs okie no'})
    })
    .catch((err)=>{
      console.log(err)
    })
}

const blog_details=(req,res)=>{
    const id=req.params.id;
    //console.log(id)
    Blog.findById(id)
    .then(result=>{
      res.render('blogs/details', {blog: result, title: 'blog details'})
    })
    .catch(err=>{
      res.status(404).render('404', {title: 'blog not found'})
    })
}

const blog_create_get=(req,res)=>{
    res.render('blogs/create', {title:'Create blog'});
}

const blog_create_post=(req,res)=>{
    const blog= new Blog(req.body)
  
    blog.save()
    .then((result)=>{
      res.redirect('/blogs')
    })
    .catch( (err)=>{
      console.log(err)
    })
}

const blog_delete=(req,res)=>{
    const id= req.params.id
  
    Blog.findByIdAndDelete(id)
    .then((result)=>{
      res.json({redirect: '/blogs'})
      location.reload(true)
    })
    .catch(err=>{
      console.log(err)
    })
    
}

module.exports={
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}