//accessing DOM

const resultEl=document.getElementById('result');
const lengthEl=document.getElementById('length');
const lowercaseEl=document.getElementById('lowercase');
const uppercaseEl=document.getElementById('uppercase');
const numbersEl=document.getElementById('numbers');
const symbolsEl=document.getElementById('symbols');
const generateEl=document.getElementById('generate');
const clipboardEl=document.getElementById('clipboard');

const randomfunc={
    lower:getrandomlower,
    upper:getrandomupper,
    symbol:getrandomsymbol,
    number:getrandomnumber
}

//listen for generate button

generateEl.addEventListener('click',()=>{
    const length=+lengthEl.value;
    const islower=lowercaseEl.checked;
    const isupper=uppercaseEl.checked;
    const issymbol=symbolsEl.checked;
    const isnumber=numbersEl.checked;
    
    resultEl.innerText=generatePassword(islower,isupper,isnumber,issymbol,length);
});

//copy to clipboard


clipboardEl.addEventListener('click',()=>{
    const textarea=document.createElement('textarea');
    const password=resultEl.innerText;

    if(!password)
    {
        return;
    }
    textarea.value=password;  
    document.body.appendChild(textarea)
    textarea.select();
    textarea.setSelectionRange(0, 99999);   /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(textarea.value);
  textarea.remove();
    alert('password copied to clipboard successfully!')
})

function generatePassword(lower,upper,number,symbol,length){
    let generatedPassword='';

    const typesCount=lower+upper+symbol+number;

    // console.log(typesCount);

    const typesArr=[{lower},{upper},{number},{symbol}].filter(
        item=>Object.values(item)[0]
    );
    // console.log(typesArr);
    if(typesCount===0){
        return '';
    }

    for(let i=0;i<length;i+=typesCount)
    {
        typesArr.forEach(type=>{
            const funcName=Object.keys(type)[0];

            generatedPassword+=randomfunc[funcName]();
        })
    }
    const finalpassword=generatedPassword.slice(0,length);
    console.log(finalpassword);
    return finalpassword;

}



function getrandomlower()
{
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getrandomupper()
{
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}


function getrandomnumber()
{
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getrandomsymbol()
{
    const symbols='!#$%&()*+,-./:;<=>?@[\]^_{|}~';
    return symbols[Math.floor(Math.random()*symbols.length)]
}
// console.log(getrandomsymbol());

//generate password

