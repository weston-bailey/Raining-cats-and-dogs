let express = require('express');
let router = express.Router();
let fs = require('fs');

//index route
router.get('/', (request, response) => {
  let data = fs.readFileSync('./dogs.json');
  data = JSON.parse(data);
  let nameFilter = request.query.nameFilter;
  if(nameFilter) {

    data = data.filter(element => {
      return element.name.toLowerCase() === nameFilter.toLowerCase();
    })
  }
  response.render('dogs/index', { data: data } );
});

//new
router.get('/new', (request, response) => {
  response.render('dogs/new');
});

//edit
router.get('/edit/:index', (request, response) => {
  let data = fs.readFileSync('./dogs.json');
  data = JSON.parse(data);

  response.render('dogs/edit', {  data: data[request.params.index], index: request.params.index });
});

//show route from index
router.get('/:index', (request, response) => {
  //console.log(request.params.index)
  let data = fs.readFileSync('./dogs.json');
  data = JSON.parse(data);
  let index = parseInt(request.params.index);
  response.render('dogs/show', { data: data[index] });
});

//post form index
router.post('/', (request, response) => {
  let data = fs.readFileSync('./dogs.json');
  data = JSON.parse(data);
  data.push(request.body);
  fs.writeFileSync('./dogs.json', JSON.stringify(data));
  response.redirect('/dogs');
});

//route for delete
router.delete('/:index', (request, response) => {
  let data = fs.readFileSync('./dogs.json');
  data = JSON.parse(data);
  data.splice(request.params.index, 1);
  //write changes made to json
  fs.writeFileSync('./dogs.json', JSON.stringify(data));
  response.redirect('/dogs');
});

//route for edits
router.put('/:index', (request, response) => {
  let data = fs.readFileSync('./dogs.json');
  data = JSON.parse(data);
  data[request.params.index].name = request.body.name;
  data[request.params.index].image = request.body.image;
  data[request.params.index].famousFor = request.body.famousFor;
  // rewrite the file
  fs.writeFileSync('./dogs.json', JSON.stringify(data));
  response.redirect('/dogs');
});

module.exports = router;