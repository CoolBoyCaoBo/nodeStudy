const express = require('express');
const app = express();

const router = require('./controllers/route.js'); 

//设置静态资源
app.use('/static',express.static('public'));
app.use(express.static('./uploads'));

//设置模板引擎
app.set('view engine', 'ejs');


app.get('/',router.showIndex);
app.get('/:albumName',router.showPhotoList);
app.get('/photoUp',router.showPhotoUp);

app.post('/filesUp',router.filtersUp)
app.listen(3000,()=>{
    console.log('server is running at port 3000');
});