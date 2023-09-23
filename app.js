const searchBar = document.querySelector('input');
const selector = document.querySelector('#selector');
const typeSelector = document.querySelector('#type')
const main = document.querySelector('main');
const html = document.querySelector('*');
const footer = document.querySelector('footer');

const bigDiv = document.querySelector('.more_info')
const heading = document.getElementById('title');
const p1 = document.getElementById('mainInfo');
const p2 = document.getElementById('moreInfo');

const upArrow = document.querySelector('.up');
const menu = document.querySelector('menuBT');

let oldScrollY = 0;

bigDiv.style.display = 'none';
upArrow.style.opacity = '0';

document.body.style.overflowY = '';
document.body.style.overflowX = 'hidden'

fetch('./data.json')
.then(res => res.json())
.then(data => {

    for(let i = 0; i < data.length; i++){
                main.innerHTML += `
                <div class="new_div">
                    <h3>${JSON.stringify(data[i].title)}</h3>
                    <p>
                        ${JSON.stringify(data[i].main)}
                    </p>
                </div>`
    }

    const newDiv = document.querySelectorAll('.new_div');

    for(let i = 0; i < data.length; i++){
        newDiv[i].style.display = 'none';
    }

    check('ყველა');
    check2('ორივე');

    selector.addEventListener('change', () => {
        check(selector.value)
    })

    typeSelector.addEventListener('change', () => {
        check2(typeSelector.value);
    })

    function check(type){
        if(type == 'ყველა'){
            for(let i = 0; i < data.length; i++){
                newDiv[i].style.display = '';
            }
        }
        else{
            for(let i = 0; i < data.length; i++){
                newDiv[i].style.display = 'none';
            }
            for(let i = 0; i < data.length; i++){
                if(data[i].class == parseFloat(type) ){
                    newDiv[i].style.display = '';
                }
            }
        }
    };

    function check2(type){
        if(type == 'ორივე'){
            for(let i = 0; i < data.length; i++){
                newDiv[i].style.display = 'none';
            }
            for(let i = 0; i < data.length; i++){
                if(type == 'ორივე'){
                    if(selector.value == 'ყველა'){
                        newDiv[i].style.display = '';
                    }
                    else{
                        if(data[i].class == parseFloat(selector.value)){
                            newDiv[i].style.display = '';
                        }
                    }
                }
            }
        }
        else{
            for(let i = 0; i < data.length; i++){
                newDiv[i].style.display = 'none';
            }
            for(let i = 0; i < data.length; i++){
                if(data[i].type == type){
                    if(selector.value == 'ყველა'){
                        newDiv[i].style.display = '';
                    }
                    else{
                        if(data[i].class == parseFloat(selector.value)){
                            newDiv[i].style.display = '';
                        }
                    }
                }
            }
        }
    };

    appear();

    function appear(){
        
        for(let i = 0; i < newDiv.length; i++){
            newDiv[i].addEventListener('click', () => {
    
                heading.innerHTML = data[i].title;
                p1.innerHTML = data[i].main;
                p2.innerHTML = data[i].more_info;
    
                oldScrollY = window.scrollY;
                bigDiv.style.display = '';
                window.scroll(0, 0)
                html.style.overflowY = 'hidden';
            }, false)
        };
    
        bigDiv.addEventListener('click', () => {
            window.scroll(0, oldScrollY)
            bigDiv.style.display = 'none';
            html.style.overflowY = '';
        });
    }

    window.addEventListener('scroll', () => {
        if(scrollY >= 115 && scrollY <= footer.getBoundingClientRect().top){
            upArrow.style.opacity = '1';
        }
        else{
            upArrow.style.opacity = '0'
        }
    })

    document.addEventListener('keydown', e => {
            if(searchBar.value != '' || searchBar.value != ' '){
                for(let i = 0; i < data.length; i++){
                    newDiv[i].style.display = 'none';
                }
                for(let i = 0; i < data.length; i++){
                        if(data[i].title.includes(searchBar.value)){
                        newDiv[i].style.display = '';
                    }
                }
            } else{
                check(selector.value)
            }
            appear();
    })

})