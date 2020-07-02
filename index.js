students_list = []

fetch("https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json")
.then(response => response.json())
.then(data => student_table_func(data))

function student_table_func(students_data){
    for(i=0; i< students_data.length; i++){
        dummy_dict = {
            name:students_data[i].name,
            last_name:students_data[i].last_name,
            status:students_data[i].status,
            id:students_data[i].id,
            courses:["Basic SQL"],
        }

        students_list.push(dummy_dict)
    }   
}

console.log(students_list)


const form = document.getElementById('form');
form.addEventListener('submit', form_submit);

function form_submit(e){
    e.preventDefault();
    var nameValue = document.getElementById("fname").value;
    var lastNameValue = document.getElementById("lname").value;
    var activeValue = document.getElementById("active_select").value;
    if(activeValue === 'true'){
        var status = true;
    }
    else{
        var status = false;
    }
    students_list.push({name:nameValue,last_name:lastNameValue,id:students_list.length,status:status,courses:[]})
    console.log(students_list)
    
    handle_students_function(students_list)

}

var students = document.getElementById("students");

students.addEventListener("click", students_function);

function students_function(){
    // fetch("https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json")
    // .then(response => response.json())
    // .then(data => handle_students_function(data))
    handle_students_function(students_list)
}

function handle_students_function(students_data){
    var new_student_form = document.getElementById("form");
    new_student_form.style.display = "none";
    console.log(students_data)
    var the_table = document.getElementById("table")
    the_table.innerHTML = "";

    // students_data.push({name:"Sinan",last_name:"Cengiz",status:false,id:9})

    for(i=0; i< students_data.length; i++){
        var student_div = document.createElement("div")
        student_div.innerHTML = "";

        var header_div = document.createElement("div")
        var h4_element = document.createElement("h4")
        h4_element.innerHTML = students_data[i].name+" "+students_data[i].last_name;
        h4_element.classList.add("col-9")
        student_div.appendChild(h4_element)

        var active_element = document.createElement("p")
        if (students_data[i].status != false){
            active_element.classList.add("active")
            active_element.classList.add("col-3")
        }
        student_div.appendChild(active_element)

        var ul_element = document.createElement("ul")
        for(j=0; j < students_data[i].courses.length; j++){
            var li_element = document.createElement("li")
            li_element.innerHTML = students_data[i].courses[j];
            ul_element.appendChild(li_element)
        }
        student_div.appendChild(ul_element)


        var add_course_button = document.createElement("button")
        button_id = students_data[i].id;
        add_course_button.setAttribute("id", button_id);
        add_course_button.innerHTML = "Add Course";
        student_div.appendChild(add_course_button)

        var edit_info_button = document.createElement("button")
        edit_info_button.innerHTML = "Edit Info";
        student_div.appendChild(edit_info_button)

        student_div.classList.add("student_div")
        the_table.appendChild(student_div)
    }

    
}

courses_list = []

fetch("https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json")
.then(response => response.json())
.then(data => courses_table_func(data))

function courses_table_func(courses_data){
    for(i=0; i< courses_data.length; i++){
        dummy_dict = {
            name:courses_data[i].name,
            duration:courses_data[i].duration,
            id:courses_data[i].id,
            students:["Sinan"],
        }

        courses_list.push(dummy_dict)
    }   
}

var courses = document.getElementById("Courses");
courses.addEventListener("click", courses_function);

function courses_function(){
    // fetch("https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json")
    // .then(response => response.json())
    // .then(data => handle_courses_function(data))
    handle_courses_function(courses_list)
}

function handle_courses_function(courses_data){
    var new_student_form = document.getElementById("form");
    new_student_form.style.display = "none";
    console.log(courses_data)
    var the_table = document.getElementById("table")
    the_table.innerHTML = "";


    for(i=0; i< courses_data.length; i++){
        var courses_div = document.createElement("div")
        courses_div.innerHTML = "";

        var h4_element = document.createElement("h4")
        h4_element.innerHTML = courses_data[i].name;
        courses_div.appendChild(h4_element)

        var duration_element = document.createElement("p")
        duration_element.innerHTML = courses_data[i].duration;
        courses_div.appendChild(duration_element)

        var form_element = document.createElement("form")
        var select_element = document.createElement("select")
        for(j=0; j < students_list.length; j++){
            if(students_list[j].status == true){
                var option_element = document.createElement("option")
                option_element.innerHTML = students_list[j].name+" "+ students_list[j].last_name;
                select_element.appendChild(option_element)
            }
        }
        var submit_student_button = document.createElement("button")
        submit_student_button.innerHTML = "Submit Student";
        form_element.appendChild(select_element)
        form_element.appendChild(submit_student_button)
        form_element.style.display = "none";
        courses_div.appendChild(form_element)
         

        var add_student_button = document.createElement("button")
        add_student_button.innerHTML = "Add Student";
        button_id = courses_data[i].id;
        add_student_button.setAttribute("id", button_id);
        add_student_button.classList.add("add_student_to_course")
        courses_div.appendChild(add_student_button)

        courses_div.classList.add("courses_div")
        the_table.appendChild(courses_div)
    }
    
}


var new_student = document.getElementById("new_student");
new_student.addEventListener("click", postData);

function postData(e){
    e.preventDefault()
    fetch("https://student-challenge-api.herokuapp.com/student", 
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
            body: JSON.stringify({name:"Sinan",last_name:"Cengiz"})
        }
    )
        .then(response => response.json())
        .then(data => console.log(data));

        handle_students_function(students_list)
    var new_student_form = document.getElementById("form");
    new_student_form.style.display = "block";
}




