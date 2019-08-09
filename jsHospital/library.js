"use strict"
function Patient(name, surName, disease) {
    this.name = name;
    this.surName = surName;
    this.disease = disease;
}

function Doctor(name, surName, specialization) {
    this.name = name;
    this.surName = surName;
    this.specialization = specialization;
    this.patients = [];

    this.addPatientToDoctor = function(patient){
        this.patients.push(patient);
    }
    this.getPatientsOfDoctor = function () {
        console.log("Doctor: "+this.name+ " " +this.surName+ "\nSpecialization: "+specialization+"\nPatients:\n------------------");
        for(let pat of this.patients){
            console.log("Name: "+pat.name+ " " +pat.surName+"  Disease: "+pat.disease);
        }
    }
}

function Hospital() {
    this.allPatients = [];
    this.allDoctors = [];

    this.addPatient = function(patient){
        this.allPatients.push(patient);
    }
    this.addDoctor = function(doctor){
        this.allDoctors.push(doctor);
    }

    this.getAllPatients = function () {
        console.log("\nAll patients in hospital:\n--------------------");
        for(let pat of this.allPatients){
            console.log("Name: "+pat.name+ " " +pat.surName+"  Disease: "+pat.disease);
        }
    }

    this.getAllDoctors = function () {
        console.log("\nAll doctors in hospital:\n--------------------");
        for(let doc of this.allDoctors){
            console.log("Name: "+doc.name+ " " +doc.surName+"  Specialization: "+doc.specialization);
        }
    }

    this.getDoctorsWithPatients = function () {
        console.log("\nAll doctors in hospital with their patients:\n---------------------------------------")
        for(let doc of this.allDoctors){
            doc.getPatientsOfDoctor();
        }
    }

}


/*function sum(a, b) {
    return( Number(a)+Number(b) );
}

function mult(a, b) {
    return( a*b );
}

function div(a, b) {
    return( a/b );
}

function concat(a, b) {
    return( a + b );
}

function diff(a, b) {
    return( Number(a) - Number(b) );
}

function pow(a, b) {
    return( a ** b );
}

function isPrime(a) {
    let t = true;
    for (let i = 2; i < a/2; i++){
        if(a%i==0){
            t = false;
            break;
        }
    }
    alert( t );
}

function factorial(a) {
    if(a == 0 || a == 1)
        return 1;
    else {
        return a * factorial(a - 1);
    }
}

function reverse(a) {
    var reversed = "";
    if(a.length < 2){
        return a;
    }
    else{
        for(let i = a.length - 1; i >= 0; i--){
            reversed = reversed + a[i];
        }
    }
    return reversed;
}
*/
