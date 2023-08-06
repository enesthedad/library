const addBtn = document.getElementById('add');
const bookContainer = document.querySelector('.book-container');
const addContainer = document.querySelector('.outside-container');
const addBook = document.getElementById('add-book');
const bookName=document.getElementById('name');
const bookAuthor=document.getElementById('author');
const bookPage=document.getElementById('page');
const bookRead=document.getElementById('read');
const blurryContainer=document.querySelector('.blurry-container');
const outBox = document.querySelector('.outbox');
const agree  = document.getElementById('agree');
const disagree = document.getElementById('disagree');
const closeBtn=document.querySelector('.decline');
const myLibrary=['Harry Potter 1-J.K Rowling-852-true','A Little Life-Hanya Yanagihara-832-false','Verity-Colleen Hoover-336-false','The 48 Laws of Power-Robert Greene-452-true'];
let objLibrary=[];
addBtn.addEventListener('click', function() {
      addContainer.classList.remove('hidden')

      
});
closeBtn.addEventListener('click',function(){
    addContainer.classList.add('hidden');
    bookName.value='';
    bookPage.value='';
    bookAuthor.value='';
    bookRead.checked=false;

})
addBook.addEventListener('click',function(){
    const newBook = new Book(bookName.value,bookAuthor.value,bookPage.value,String(bookRead.checked),randomNumGen());
    objLibrary.push(newBook);
    bookVisualize(newBook);})
const randomNumGen = function(){
    return Math.trunc(Math.random()*9999999999);
}
const removeDiv = function(e){
    blurryContainer.classList.remove('hidden');
    outBox.classList.remove('hidden');
    agree.addEventListener('click',function(){
        blurryContainer.classList.add('hidden');
        outBox.classList.add('hidden');
        const index = objLibrary.findIndex((obj=>obj.id==e.target.parentElement.parentElement.firstChild.id));
        objLibrary.splice(index,1);
        e.target.parentElement.parentElement.remove();
    })
    disagree.addEventListener('click',function(){
       
        blurryContainer.classList.add('hidden');
        outBox.classList.add('hidden');
    })
}
const readClass=function(value){
    if(value=='true'){
        return `read`
    }else{
        return `not-read`
    }
}

const toggleBtn=function(value){
    if(value=='true'){
        return`Not Read` ;
    }else{
        return `Read`;
    }
}
const targetEl = function(e){
    
    const readStat = e.target.parentElement.parentElement.querySelector('.status');
    console.log(readStat.innerHTML.slice(13));
    if(readStat.innerHTML.slice(13)=='Read'){
        e.target.innerHTML=`Read`
        e.target.classList.remove('read');
        e.target.classList.add('not-read');
        readStat.innerHTML=`Book Status: Not Read`;
    }else{
        e.target.classList.add('read');
        e.target.classList.remove('not-read');
        e.target.innerHTML=`Not Read`
        readStat.innerHTML=`Book Status: Read`;
}
};
function Book(bookName,author,page,read,id){
    this.bookName=bookName;
    this.author=author;
    this.page=page;
    this.read=read;
    this.id=id;
    this.readStatus=function(){
        if(this.read=='true'){
            return `Read`;
        }else{
            return `Not Read`;
        }
    }
}
function addBookToLibrary(str){
    let book1=str.split('-');
    let bookObjCreate={};
    bookObjCreate=new Book(book1[0],book1[1],book1[2],book1[3],randomNumGen());
    objLibrary.push(bookObjCreate);
    bookObjCreate={};

}

myLibrary.forEach((book)=>{
    addBookToLibrary(book);
})
function bookVisualize(book){
        let newDiv = document.createElement('div');
        newDiv.className = 'added-div';
        newDiv.innerHTML=`<p id=${book.id}>Book Name: ${book.bookName}</p>
        <p>Book Author: ${book.author}</p>
        <p>Book Page: ${book.page}</p>
        <p class='status'>Book Status: ${book.readStatus()}</p>
        <div class='btn-container'>
        <button class='read-toggle ${readClass(book.read)}'>${toggleBtn(book.read)}</button>
        <button class='remove'>Remove</button>
        </div>
        `
          
        if(book.bookName!=''&&book.author!=''&&book.page!=''){
            bookContainer.appendChild(newDiv);
            const removeBtns = document.querySelectorAll('.remove');
            removeBtns.forEach((btn)=>btn.addEventListener('click',removeDiv));
            const readBtns=document.querySelectorAll('.read-toggle');
            readBtns.forEach((btn)=>btn.addEventListener('click', targetEl));
            addContainer.classList.add('hidden');
            bookName.value='';
            bookAuthor.value='';
            bookPage.value='';
            bookRead.checked=false;
        }else{
           
        }
}
console.log(String(false));
objLibrary.forEach((book)=>bookVisualize(book));