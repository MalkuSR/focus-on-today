const checkboxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const error = document.querySelector('.error');
const progressbar = document.querySelector('.progress-value');
const count = document.querySelector('.reviews');
let countincreased = document.querySelector('.reviewsCount');
const btn = document.querySelector('.clrBtn');
const bar = document.querySelector('.bar');
const quote = document.querySelector('.quote');


const allGoals = JSON.parse(localStorage.getItem('allgoals')) || {};
const allQuotes = [
    'Raise the bar by completing your goals!',
    '“Well begun is half done!”',
    '“Just a step away, keep going!”',
    'Whoa! You just completed all the goals, time for chill :D',
    '“Move one step ahead, today!”'
]
const allErrors = [
    `Please set all the ${inputFields.length} goals!`,
    `Please completed all the ${inputFields.length} goals first!`,
    'Please Unchecked first'
]

// all inputs
const isAllInputs = () => {
    return Array.from(inputFields).every(input => input.value.trim() !== '');
}

// update progressbar
const updatedProgressbar = () => {
    let checkedCount = Object.values(allGoals).filter((goal) => goal.completed === 'true').length;

    if (checkedCount !== 0) {
        count.innerHTML = `${checkedCount}/${inputFields.length} completed`
    }
    quote.innerHTML = allQuotes[checkedCount]
    bar.innerHTML = allQuotes[checkedCount]
    progressbar.style.width = `${checkedCount / inputFields.length * 100}%`;
}

// check box
checkboxList.forEach((checkbox, i) => {
    // get checked from storage
    const clickedId = checkbox.nextElementSibling.id
    const ischecked = allGoals[clickedId] ? allGoals[clickedId].completed === 'true' : false
    if (ischecked) {
        checkbox.parentElement.classList.add('completed');
        updatedProgressbar();
    };

    // add check box through click
    checkbox.addEventListener('click', () => {
        if (isAllInputs()) {
            checkbox.parentElement.classList.add('completed');
            // store into storage
            allGoals[clickedId].completed = 'true';
            localStorage.setItem('allgoals', JSON.stringify(allGoals));
            // call the function
            updatedProgressbar();
        } else {
            error.parentElement.classList.add('completed');
            error.innerHTML = allErrors[0];
        };
    });
});

inputFields.forEach((input, i) => {
    // retrive item
    input.value = allGoals[input.id] ? allGoals[input.id].name : '';
    // add item
    input.addEventListener('input', (e) => {
        allGoals[input.id] = {
            name: e.target.value,
            completed: false
        }
        localStorage.setItem('allgoals', JSON.stringify(allGoals));
    });

    // remove error
    input.addEventListener('focus', () => {
        const checked = allGoals[input.id] && allGoals[input.id].completed === 'true'
        if (checked) {
            input.blur();
            error.parentElement.classList.add('completed');
            error.innerHTML = allErrors[2]
            setTimeout(() => {
                error.parentElement.classList.remove('completed');
            }, 3000);
        } else {
            error.parentElement.classList.remove('completed');
        }
    });
});

btn.addEventListener('click', () => {
    // check if all checkbox are checked then cleared
    const check = Object.values(allGoals).every((goal) => goal.completed === 'true');
    if (check) {
        localStorage.clear()
        window.location.reload();
    } else if (!check) {
        // if not checked all show error2 remove1
        error.parentElement.classList.add('completed');
        error.innerHTML = allErrors[1]
        setTimeout(() => {
            error.parentElement.classList.remove('completed');
        }, 3000);
    };
});