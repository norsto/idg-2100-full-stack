class Car {
    tyres = 4;
    color = "white";

    constructor(color, tyres) {
        this.color = color;

        if(tyres && tyres >= 4) {
            this.tyres  = tyres;
            console.log("New car created");
        }
    }

    accelerate(speed) {
        console.log(`vroom vroom, I'm accelerating ${speed}`);
    }

    brake() {
        console.log(`No vroom, I'm stopping`)
    }

    set color(color) {
        this.color = color;
    }

    changeColour(newColour) {
        this.color = newColour;
        console.log(`This is the new colour: ${newColour}`)
    }

    toString() {
        let string = `I'm a ${this.color} car and I have ${this.tyres} tyres`;
        console.log(string);
        return string;
    }

}

class PickUpCar extends Car {
    constructor(color) {
        super(color);
        this.tyres = 6;
        console.log("im a pickup car", this.toString());
    }

    toString() {
        let string = "leave me be"
        return string;
    }
}
