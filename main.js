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
addBtn.addEventListener('click', function() {
      addContainer.classList.remove('hidden')
     
      
});
addBook.addEventListener('click',function(){
    let idClone = Date.now();
    console.log((idClone));
    let newDiv = document.createElement('div');
    newDiv.className = 'added-div';
    newDiv.innerHTML=
    `
    <p>Book Name: ${bookName.value}</p>
    <p>Book Author: ${bookAuthor.value}</p>
    <p>Book Page: ${bookPage.value}</p>
    <p class='status' id='${idClone}'>Book Status: ${isRead()}</p>
    <div class='btn-container'>
    
    <button class='read-toggle ${readClass()}'>${toggleBtn()}</button>
    <button class='remove'>Remove</button>
    </div>
    `
    if(bookName.value!=''&&bookAuthor.value!=''&&bookPage.value!=''){
        newDiv.setAttribute('id',idClone);
        bookContainer.appendChild(newDiv);
        const removeBtns = document.querySelectorAll('.remove');
        removeBtns.forEach((btn)=>btn.addEventListener('click',removeDiv));
        const readBtns=document.querySelectorAll('.read-toggle');
        readBtns.forEach((btn)=>btn.addEventListener('click', targetEl));
        addContainer.classList.add('hidden');
        bookName.value='';
        bookAuthor.value='';
        bookPage.value='';
        console.log(bookRead.value);
    }else{
       
    }
   

})

const removeDiv = function(e){
    blurryContainer.classList.remove('hidden');
    outBox.classList.remove('hidden');
    agree.addEventListener('click',function(){
        e.target.parentElement.parentElement.remove();
        blurryContainer.classList.add('hidden');
        outBox.classList.add('hidden');
    })
    disagree.addEventListener('click',function(){
       
        blurryContainer.classList.add('hidden');
        outBox.classList.add('hidden');
    })
}
const readClass=function(){
    if(bookRead.checked==true){
        return `read`
    }else{
        return `not-read`
    }
}
const isRead = function(){
    if(bookRead.checked==true){
        return `Read`;
    }else{
        return `Not Read`;
    }
}
const toggleBtn=function(){
    if(bookRead.checked==true){
        return `Not Read`;
    }else{
        return `Read`;
    }
}
const targetEl = function(e){
    
    const readStat = e.target.parentElement.parentElement.querySelector('.status');
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