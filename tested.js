Person = function(name){
    this.name = name;
};
Person.prototype.age = 18;
alvin = new Person("Alvin");
berto = new Person("Berto");
berto.age = 20;

if(alvin.hasOwnProperty('name')){
    console.log('The first condition was true.');
}
if(berto.hasOwnProperty('name')){
    console.log('The second condition was true.');
}
if(alvin.hasOwnProperty('age')){
    console.log('The third condition was true.');
}
if(berto.hasOwnProperty('age')){
    console.log('The fourth condition was true.');
}