document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginSignupContainer = document.getElementById('login-signup-container');
    const homeContainer = document.getElementById('home-container');

    document.getElementById('show-signup').addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    document.getElementById('show-login').addEventListener('click', function (e) {
        e.preventDefault();
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        login();
    });

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        signup();
    });

    function login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            document.getElementById('login-signup-container').style.display = 'none';
            document.getElementById('home-container').style.display = 'flex';
        } else {
            alert('Please enter your email and password.');
        }
    }

    function signup() {
        const name = document.getElementById('signup-name').value;
        const age = document.getElementById('signup-age').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (name && age && email && password && confirmPassword) {
            if (password === confirmPassword) {
                document.getElementById('login-signup-container').style.display = 'none';
                document.getElementById('home-container').style.display = 'flex';
                document.getElementById('survey-content').style.display = 'block';
                document.getElementById('home-content').style.display = 'none';
            } else {
                alert('Passwords do not match.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    }

    document.getElementById('show-survey').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('survey-content').style.display = 'block';
        document.getElementById('timetable-content').style.display = 'none';
        document.getElementById('progress-content').style.display = 'none';
        document.getElementById('home-content').style.display = 'none';
    });

    document.getElementById('show-timetable').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('survey-content').style.display = 'none';
        document.getElementById('timetable-content').style.display = 'block';
        document.getElementById('progress-content').style.display = 'none';
        document.getElementById('home-content').style.display = 'none';
        generateTimetable();
    });

    document.getElementById('show-progress').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('survey-content').style.display = 'none';
        document.getElementById('timetable-content').style.display = 'none';
        document.getElementById('progress-content').style.display = 'block';
        document.getElementById('home-content').style.display = 'none';
        generateProgressChart();
    });

    document.getElementById('survey-form').addEventListener('submit', function (e) {
        e.preventDefault();
        assignTimetable();
    });

    function assignTimetable() {
        const surveyForm = document.getElementById('survey-form');
        const formData = new FormData(surveyForm);
        let score = 0;

        formData.forEach((value) => {
            score += parseInt(value);
        });

        let group;
        if (score <= 25) {
            group = '0-25%';
        } else if (score <= 50) {
            group = '25-50%';
        } else if (score <= 75) {
            group = '50-75%';
        } else {
            group = '75-100%';
        }

        localStorage.setItem('adhd-group', group);
        alert('Survey submitted. Your group is: ' + group);
    }

    function generateTimetable() {
        const timetableContent = document.getElementById('timetable-content');
        timetableContent.innerHTML = '';
        const group = localStorage.getItem('adhd-group');

        let timetable;

        switch (group) {
            case '75-100%':
                timetable = [
                    'Walking: 5:30AM to 6:45AM',
                    'Meditation: 6:45AM to 7:00AM',
                    'Fresh up: 7:00AM to 8:00AM',
                    'Breakfast: 8:00AM to 8:30AM',
                    'Going to School/College/Office: 8:30AM to 5:00PM',
                    'Playing Outdoor: 5:00PM to 6:00PM',
                    'Fresh up: 6:00PM to 6:15PM',
                    'Complete Work given: 6:15PM to 8:15PM',
                    'Dinner: 8:15PM to 8:35PM',
                    'Watch TV: 8:35PM to 9:15PM',
                    'Prepare Next day and Go to bed By 9:30PM',
                    'Medication (if prescribed)',
                ];
                break;
            case '50-75%':
                timetable = [
                    'Walking: 5:30AM to 6:35AM',
                    'Meditation: 6:35AM to 6:50AM',
                    'Fresh up: 6:50AM to 8:00AM',
                    'Breakfast: 8:00AM to 8:30AM',
                    'Going to School/College/Office: 8:30AM to 5:00PM',
                    'Playing Outdoor: 5:00PM to 5:45PM',
                    'Fresh up: 5:45PM to 6:00PM',
                    'Complete Work given: 6:00PM to 8:25PM',
                    'Dinner: 8:25PM to 8:45PM',
                    'Watch TV: 8:45PM to 9:05PM',
                    'Revise the concepts: 9:05PM to 9:35PM',
                    'Prepare Next day and Go to bed By 9:45PM',
                    'Medication (if prescribed)',
                ];
                break;
            case '25-50%':
                timetable = [
                    'Walking: 5:30AM to 6:30AM',
                    'Meditation: 6:30AM to 6:50AM',
                    'Fresh up: 6:50AM to 8:00AM',
                    'Help in household chores: 8:00AM to 8:15AM',
                    'Breakfast: 8:15AM to 8:45AM',
                    'Going to School/College/Office: 8:45AM to 5:00PM',
                    'Playing Outdoor: 5:00PM to 5:45PM',
                    'Fresh up: 5:45PM to 6:00PM',
                    'Complete Work given: 6:00PM to 8:35PM',
                    'Dinner: 8:35PM to 8:50PM',
                    'Watch TV: 8:50PM to 9:10PM',
                    'Revise the concepts: 9:10PM to 9:40PM',
                    'Prepare Next day and Go to bed By 9:50PM',
                    'Medication (if prescribed)',
                ];
                break;
            case '0-25%':
                timetable = [
                    'Walking: 5:30AM to 6:20AM',
                    'Meditation: 6:20AM to 6:30AM',
                    'Fresh up: 6:30AM to 7:45AM',
                    'Help in household chores: 7:45AM to 8:00AM',
                    'Breakfast: 8:00AM to 8:30AM',
                    'Going to School/College/Office: 8:30AM to 5:00PM',
                    'Playing Outdoor: 5:00PM to 5:45PM',
                    'Fresh up: 5:45PM to 6:00PM',
                    'Complete Work given: 6:00PM to 8:45PM',
                    'Dinner: 8:45PM to 8:55PM',
                    'Watch TV: 8:55PM to 9:15PM',
                    'Revise the concepts: 9:15PM to 9:40PM',
                    'Prepare Next day and Go to bed By 9:50PM',
                    'Medication (if prescribed)',
                ];
                break;
            default:
                timetable = ['Please complete the survey to get your timetable'];
                break;
        }

        const ul = document.createElement('ul');
        timetable.forEach((task) => {
            const li = document.createElement('li');
            li.textContent = task;
            ul.appendChild(li);
        });

        timetableContent.appendChild(ul);
    }

    function generateProgressChart() {
        const ctx = document.getElementById('progress-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label: 'Tasks Completed',
                    data: [3, 2, 1, 4, 5, 6, 7], // Mock data, should be replaced with actual user data
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
