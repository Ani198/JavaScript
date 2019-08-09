"use strict"
//var a = prompt('Enter "a"');
//var b = prompt('Enter "b"');
//sum(a, b);
//div(a, b);
//mult(a, b);
//concat(a, b);
//diff(a, b);
//pow(a, b);
//isPrime(a)
//var f = factorial(a);
//alert( f );
//var r= reverse(a);
//alert(reverse(a));
let hospital = new Hospital();

let p1 = new Patient("PatName1", "PatSurname1", "Disease1");
let p2 = new Patient("PatName2", "PatSurname2", "Disease2");
let p3 = new Patient("PatName3", "PatSurname3", "Disease3");
let p4 = new Patient("PatName4", "PatSurname4", "Disease4");
let p5 = new Patient("PatName5", "PatSurname5", "Disease5");
let p6 = new Patient("PatName6", "PatSurname6", "Disease6");

let doc1 = new Doctor("DocName1", "DocSurname1", "Specialization1");
let doc2 = new Doctor("DocName2", "DocSurname2", "Specialization2");

doc1.addPatientToDoctor(p1);
doc1.addPatientToDoctor(p2);
doc1.addPatientToDoctor(p3);
doc2.addPatientToDoctor(p4);
doc2.addPatientToDoctor(p5);
doc2.addPatientToDoctor(p6);

hospital.addPatient(p1);
hospital.addPatient(p2);
hospital.addPatient(p3);
hospital.addPatient(p4);
hospital.addPatient(p5);
hospital.addPatient(p6);

hospital.addDoctor(doc1);
hospital.addDoctor(doc2);

hospital.getAllPatients();
hospital.getAllDoctors();
hospital.getDoctorsWithPatients();
