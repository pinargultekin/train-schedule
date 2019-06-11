$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyB-f2qsrgTHWgO2uj2wOY9L9vJSWFau74Q",
        authDomain: "pinar-project-d0461.firebaseapp.com",
        databaseURL: "https://pinar-project-d0461.firebaseio.com/",
        projectId: "pinar-project-d0461",
        storageBucket: "pinar-project-d0461.appspot.com",
        messagingSenderId: "228878479960",
        appId: "1:228878479960:web:e27af08b50e4245e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    //reference the database
    var database = firebase.database();

    // Submit button click function
    $("#submit-input").on("click", function (event) {
        event.preventDefault();
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var trainTime = $("#train-time").val().trim();
        var frequency = parseInt($("#frequency").val().trim());


        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);

        //create a train object to store train info
        var train = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
        };
        console.log(train);

        //push train data into database
        database.ref().push(train);
        // $("#train-name-row").append(trainName);
        // $("#train-destination-row").append(destination);
        // $("#train-time-row").append(trainTime);
        // $("#frequency-row").append(frequency);
        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time").val("");
        $("#frequency").val("");

    });
    //Add train info to database 
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().trainTime;
        var frequency = childSnapshot.val().frequency;

        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);

        //Calculate next arrival train and how far it is
        var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
        

        function update() {
            $("#time").html(moment().format("HH:mm:ss"));
        }
       setInterval(update, 1000);

        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");

        var minAway = diffTime % frequency;

        var trainMinAway = frequency - minAway;
        console.log("Mins Away: " + trainMinAway);

        var nextTrain = moment().add(trainMinAway, "m").format("HH:mm");
        console.log("Next Train time: " + nextTrain);

       
        //Adding new info into a new row
        $("#train-table").append(
            "<tr><td>" + childSnapshot.val().trainName + "</td>" +
            "<td>" + childSnapshot.val().destination + "</td>" +
            "<td>" + childSnapshot.val().frequency + "</td>" +
            "<td>" + nextTrain + "</td>" +
            "<td>" + trainMinAway + "</td></tr>"
        );

    });

});

    // function showTime(){
    //     var date = new Date();
    //     var h = date.getHours(); // 0 - 23
    //     var m = date.getMinutes(); // 0 - 59
    //     var s = date.getSeconds(); // 0 - 59
    //     var session = "AM";


    //     h = (h < 10) ? "0" + h : h;
    //     m = (m < 10) ? "0" + m : m;
    //     s = (s < 10) ? "0" + s : s;

    //     var time = h + ":" + m + ":" + s + " " + session;
    //     document.getElementById("MyClockDisplay").innerText = time;
    //     document.getElementById("MyClockDisplay").textContent = time;

    //     setTimeout(showTime, 1000);

    // }

    // showTime();

//  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
//  var currentTime = moment();
//  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
//  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
//  var minAway = diffTime % frequency;
//  var trainMinAway = tFrequency - minAway;
//  var nextTrain = moment().add(trainMinAway, "minutes");



        // //update the page in real-time function
        // database.ref().on("value", function (snapshot) {
        //     if (snapshot.child("trainName").exists() && snapshot.child("destination").exists()
        //         && snapshoot.child("trainTime").exists() && snapshot.child("frequency").exists()) {
        //     }

        //     console.log(trainName);
        //     console.log(destination);
        //     console.log(trainTime);
        //     console.log(frequency);
        //     $("#train-name").text(trainName);
        //     $("#destination").text(destination);
        //     $("#train-time").text(trainTime);
        //     $("#frequency").text(frequency);
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // });


    //     //current date & time
    //     function currentDate() {
    //         var today = new Date();
    //         var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //         var dateTime = date + ' ' + time;
    //         console.log(dateTime);
    //     };
    //     currentDate();

