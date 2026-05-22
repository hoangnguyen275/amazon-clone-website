class Car{
  #brand;
  #model;
  #speed = 0;
  isTrunkOpen = false;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  };

  displayInfo(){
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, is Trunk Open? ${this.isTrunkOpen}`);
  };

  go(){
    if (!this.isTrunkOpen){
      this.speed += 5;
      if (this.speed > 200){
        this.speed = 200;
      }
    }
  };

  break(){
    this.speed -= 5;
    if (this.speed < 0){
      this.speed += 5;
    }
  };

  openTrunk(){
    if (this.speed == 0){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }

}

class RaceCar extends Car{
  acceleration;
  
  constructor(raceCarDetails){
    super(raceCarDetails);
    this.acceleration = raceCarDetails.acceleration;
  };

  go(){
    this.speed += this.acceleration;
    if (this.speed > 300){
      this.speed = 300;
    }
  }

  openTrunk(){
    return;
  }
  
  closeTrunk(){
    return;
  }
  
}

const car1 = new Car({brand: 'Toyota', model: 'Corolla'});
const car2 = new Car({brand: 'Tesla', model: 'Model 3'});
console.log(car1);
console.log(car2);
car1.displayInfo();
car2.displayInfo();

for (let i = 0; i < 3; i++){
  car1.go();
  car2.go();
}

car1.displayInfo();
car2.displayInfo();

car1.go();
car2.break();

car1.displayInfo();
car2.displayInfo();

for (let i = 0; i < 10; i++){
  car2.break();
}

car2.displayInfo();

car2.openTrunk();
car2.go();
console.log("try to run the car with junk open.")
car2.displayInfo();
car2.closeTrunk();
car2.go();
car2.displayInfo();


const raceCar1 = new RaceCar({brand: 'McLaren', model: 'F1', acceleration: 20});
raceCar1.openTrunk();
raceCar1.displayInfo();
raceCar1.go();
raceCar1.displayInfo();
raceCar1.break();
raceCar1.displayInfo();
for (let i = 0; i < 61; i++){
  raceCar1.go();
}
raceCar1.displayInfo();