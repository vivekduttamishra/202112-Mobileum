const bookService=require('./book-service');
const {promisedReadableStream}=require('./utils');
const {requestLogger} =require('./middlewares');


module.exports = (app) => {


    app.get('/api/books', (request, response) => {

        response.send(bookService.getAllBooks());

    });

    app.post('/xapi/books/', (request, response) => {

        //console.log('request.body',request.body);

        let bookData= '';

        request.on('data',buffer=>bookData+=buffer.toString());

        request.on('end',()=>{
            const book=JSON.parse(bookData);

            console.log('book',book);
            //add logic to save this book
            if(bookService.getBookByIsbn(book.isbn)){
                response.status(400).send({message:'duplicate isbn'});
            }else{
                bookService.addBook(book);
                response
                    .status(201)  //created
                    .header('location', `http://localhost:4000/api/books/${book.isbn}`)
                    .send(book);
            }
        });
        
    });

    app.post('/api/books',async (request,response)=>{

        //let bookData= await promisedReadableStream(request);
        let book=request.body;
        
        
        if(bookService.getBookByIsbn(book.isbn)){
            response.status(400).send({message:`duplicate isbn:${book.isbn}`});
        } else{
            bookService.addBook(book);
                response
                    .status(201)  //created
                    .header('location', `http://localhost:4000/api/books/${book.isbn}`)
                    .send(book);
        }

    });


    

    app.get('/api/books/:isbn', requestLogger, (request, response) => {
        
        const isbn = request.params.isbn; //we automatically get
       // console.log('get called for isbn',isbn);
        const book = bookService.getBookByIsbn(isbn);
        if (book)
            response.send(book);
        else
            response.status(404).send({ message: 'Book Not found', isbn });
    });

    app.put('/api/books/:isbn', async(request, response)=>{

        try{
            const book=await bookService.updateBook(request.body);
            response.status(202).json(book);  //json sends a json response
        }catch(error){
            response.status(400).json({message:error.message});
        }
        
    });

    app.delete('/api/books/:isbn',async(request,response)=>{
        const {isbn}=request.params;
        await bookService.deleteBook(isbn);
        response.status(204).send();
         
    });
};