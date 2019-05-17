const abcd = 'xyz';

const c = {
    abcd, // crea la propiedad = a la que existe
    valor() { // = valor: function() {...}
        return abcd;
    },
    [abcd]: 'dcba' // el nombre de la propiedad será el valor de la constante abcd
}

class Persona {
    
    constructor (nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    static mensaje() {
        return '->';
    }
}

class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() { // lower + der-sup
        return `${this.name} makes a noise`;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    speak() {
        return `${this.name}?? ::super = ` + super.speak();
    }
}

const p1 = new Persona();
const p2 = new Persona('1', '2');
const d1 = new Dog('elfo');
console.log(p1, p2, Persona.mensaje(), p2.apellido);
console.log(d1.speak());
console.log(c);
console.log(c.valor());
 // ctrl + alt + n

const user = {nombre: 'sebastian', apellido: 'avila'};
console.log(user);
const {nombre, apellido} = user;
console.log(nombre, apellido);

const datos = [1,2,3,4,5];
const  [aa,bb,cc] = datos;
console.log(aa,bb,cc);

// spread operator: todos los valores del arreglo son copiados a otro
const uno = [1,2,3];
const dos = [4,5];
const tres = [...uno, ...dos, 6];

console.log(tres);

const cuatro = {fn: 'nombre', ln: 'apellido'};
const cinco = {edad: 28};
const seis = {...cuatro, ...cinco};
console.log(seis);
