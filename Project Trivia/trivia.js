let no_of_questions = 10;

let question_category = [{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}];

let categoryNumber = Math.floor(Math.random() * (32 - 9 + 1)) + 9;

let diff_lib = ['easy', 'medium', 'hard']
let difficulty = diff_lib[Math.floor(Math.random() * (2 - 0 + 1) + 0)];
console.log(difficulty);

let url = `https://opentdb.com/api.php?amount=${no_of_questions}&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`;
const mcq = (url) => {
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200){
                const response = request.responseText;
                resolve(JSON.parse(response));
            }
        })

        request.open('GET', url);
        request.send();
    });
   }

   mcq(url).then((data) => {
        game(data.results);
   })
   let totalquestions;
   let currentQuestion = 0;
   let rightanswers = [];

   function game(results){
    totalquestions = results.length;
    mcqHtml = '';
    results.forEach((data, index) => {
        category = data.category;
        difficulty_text = (data.difficulty).toUpperCase();
        question = data.question;
        answer = data.correct_answer;
        rightanswers.push(answer);
        options = (data.incorrect_answers);
        options.push(answer);
        options.sort();
        html = `
        <div class="content nodisplay" data-question-id='${index}'>
            <div class="category_difficulty">
                <div class="category">
                    <p>${category}</p>
                </div>
                <div class="difficulty">
                    <p>Difficulty: ${difficulty_text}</p>
                </div>
            </div>
            <div class="question">
                <p>${question}</p>
            </div>
            <div class="options">
                <div class="optionRow">
                    <p class="choice" data-option-id='${index}'>a. ${options[0]}</p>
                    <p class="choice" data-option-id='${index}'>c. ${options[1]}</p>
                </div>
                <div class="optionRow">
                    <p class="choice" data-option-id='${index}'>b. ${options[2]}</p>
                    <p class="choice" data-option-id='${index}'>d. ${options[3]}</p>
                </div>
            </div>
        </div>    
        `;
        mcqHtml += html;
    });
    document.querySelector('.mcq').innerHTML = mcqHtml;
    

    const content = document.querySelectorAll('.content');
    content.forEach((con) => {
    if(Number(con.dataset.questionId) === currentQuestion){
        con.classList.remove('nodisplay');
    }
    });

    const choices = document.querySelectorAll('.choice');
    const status = document.querySelector('.correctOrwrong');
    let statusDisplay;
    let status_conn = true;
    choices.forEach((option) => {
         option.addEventListener('click', () => {
            
             if((option.innerHTML).substring(3) === rightanswers[option.dataset.optionId]){
                if(!status_conn){
                    clearTimeout(statusDisplay);
                } 
                status_conn = false;
                status.innerHTML=`
                    <p>Correct</p>
                    <img class="tickmark" src="Images/correct.png">
                `;
                status.classList.add('status_display');
                status.classList.add('correctOrwrong_true');
                status.classList.remove('correctOrwrong_false');
                option.classList.add('true');
                statusDisplay = setTimeout(() => {
                    status.classList.remove('status_display');
                }, 1500);
             }
             else{
                if(!status_conn){
                    clearTimeout(statusDisplay);
                } 
                status_conn = false;
                status.innerHTML=`
                    <p>Wrong</p>
                    <img class="tickmark" src="Images/wrong.png">
                `;
                status.classList.add('status_display');
                status.classList.remove('correctOrwrong_true');
                status.classList.add('correctOrwrong_false');
                option.classList.add('false');
                statusDisplay = setTimeout(() => {
                    status.classList.remove('status_display');
                }, 1500);
             }
         })
    })
    console.log(rightanswers);
   }
   
   document.querySelector('.nxt_btn').addEventListener('click', () => {
    currentQuestion++;
    const content = document.querySelectorAll('.content');
    content.forEach((con) => {
    if(Number(con.dataset.questionId) === currentQuestion){
        con.classList.remove('nodisplay');
    }
    else if(currentQuestion === totalquestions){
        console.log('Finish');
        currentQuestion = 0;
        rightanswers = [];
        
        mcq(url).then((data) => {
        game(data.results);
        document.querySelectorAll('.content').forEach((content) => {
            content.classList.add('content_display');
        })
   })
    }
    else{
        con.classList.add('nodisplay');
    }
    });
   })

   const menu = document.querySelectorAll('.menu_option');
   menu.forEach((items) => {
        items.addEventListener('click', () => {
            if(items.innerHTML === 'Start'){
                document.querySelector('.back').classList.add('back_display');
                document.querySelector('.menu').classList.add('menu_nodisplay');
                document.querySelectorAll('.content').forEach((content) => {
                    content.classList.add('content_display');
                })
                document.querySelector('.next').classList.add('next_display');
            }
            else if(items.innerHTML === 'Category Selector'){
                document.querySelector('.back').classList.add('back_display');
                document.querySelector('.menu').classList.add('menu_nodisplay');
                document.querySelector('.categorySelector').classList.add('categoryDisplay');
            }
            else if(items.innerHTML === 'Number of Questions'){
                
                document.querySelector('.numContainer').classList.add('numDisplay');
                document.querySelector('.menu').classList.add('menu_nodisplay');
                document.querySelector('.back').classList.add('back_display');
            }
            else if(items.innerHTML === 'Difficulty Selector'){
                document.querySelector('.difficultySelector').classList.add('diffDisplay');
                document.querySelector('.menu').classList.add('menu_nodisplay');
                document.querySelector('.back').classList.add('back_display');

            }
        })
   });
   
   document.querySelector('.backTitle').addEventListener('click', () => {
    document.querySelectorAll('.content').forEach((content) => {
        content.classList.remove('content_display');
        document.querySelector('.next').classList.remove('next_display');
        document.querySelector('.back').classList.remove('back_display');
        document.querySelector('.menu').classList.remove('menu_nodisplay');
        document.querySelector('.categorySelector').classList.remove('categoryDisplay');
        document.querySelector('.numContainer').classList.remove('numDisplay');
        document.querySelector('.difficultySelector').classList.remove('diffDisplay');
    })
   });
   let categoryHtml = '';
   question_category.forEach((category) => {
    let catag = category.name;
        html = `
            <div class="category_list">
                <p>${catag}</p>
            </div>
        `;
    categoryHtml += html;
   })
   document.querySelector('.categorySelector').innerHTML = categoryHtml;

   document.querySelectorAll('.category_list')
   .forEach((name) => {
        name.addEventListener('click', () => {
            question_category.forEach((category) => {
                if(name.innerText === category.name){
                    console.log(category.name);
                    categoryNumber = category.id;
                    currentQuestion = 0;
                    rightanswers = [];
                    if(name.innerText === 'Art'){
                        url ='https://opentdb.com/api.php?amount=10&category=25&type=multiple';
                    }
                    else{
                        if(no_of_questions>22){
                            no_of_questions = 22;
                        }
                        url = `https://opentdb.com/api.php?amount=${no_of_questions}&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`;
                    }
                    console.log(url);
                    mcq(url).then((data) => {
                        game(data.results);
                   })
                   name.classList.add('categorySelected');
                   document.querySelectorAll('.category_list')
                    .forEach((name) => {
                        if(name.innerText === category.name){

                        }
                        else{
                            name.classList.remove('categorySelected');
                        }
                    })
                }
            })
        })
   });

function numberSelector(){
    let numberHtml = '';
    for(let i = 1; i<= 50; i++){
        html = `
            <div class="number">${i}</div>
        `
        numberHtml += html;
    }   
    document.querySelector('.numberSelector').innerHTML = numberHtml;
    document.querySelectorAll('.number').forEach((number) => {
        number.addEventListener('click', () => {
            number.classList.add('numberSelected');
            no_of_questions = Number(number.innerText);
            document.querySelectorAll('.number').forEach((number) => {
                if(Number(number.innerText) !== no_of_questions){
                    number.classList.remove('numberSelected');
                }
            });
            
            currentQuestion = 0;
            rightanswers = [];
            if(no_of_questions>22){
                url = `https://opentdb.com/api.php?amount=${no_of_questions}`;
            }
            else{
                url = `https://opentdb.com/api.php?amount=${no_of_questions}&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`;
            }
            console.log(url);
            mcq(url).then((data) => {
            game(data.results);
            })
            })
    })
    
}
numberSelector();

document.querySelectorAll('.diff').forEach((data) => {
    data.addEventListener('click', () => {
        difficulty = (data.innerText).toLowerCase();
        currentQuestion = 0;
        rightanswers = [];
        url = `https://opentdb.com/api.php?amount=${no_of_questions}&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`;
        mcq(url).then((data) => {
            game(data.results);
            })
        data.classList.add('diffSelected');
        document.querySelectorAll('.diff').forEach((diffcon) => {
            if(diffcon.innerText.toLowerCase() !== difficulty){
                diffcon.classList.remove('diffSelected');
            }
        } )
    });

});



   
