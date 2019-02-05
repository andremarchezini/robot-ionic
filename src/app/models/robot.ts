import { FacesEnum } from '../enums/faces';

export class Robot {

  // x - horizontal placement
  // y - vertical placement
  x: number;
  y: number;
  facing: FacesEnum = null;
  placed: boolean;

  constructor() {
    this.placed = false;
  }

  // It moves the robot 1 unit to the direction it is facing
  public move() {
    switch (this.facing) {
      case FacesEnum.NORTH: {
        this.y++;
        break;
      }
      case FacesEnum.SOUTH: {
        this.y++;
        break;
      }
      case FacesEnum.WEST: {
        this.x--;
        break;
      }
      case FacesEnum.EAST: {
        this.x++;
        break;
      }
    }
  }

  // It rotates the robot to the left in 90 degrees
  public rotateLeft() {
    switch (this.facing) {
      case FacesEnum.NORTH: {
        this.facing = FacesEnum.WEST;
        break;
      }
      case FacesEnum.WEST: {
        this.facing = FacesEnum.SOUTH;
        break;
      }
      case FacesEnum.SOUTH: {
        this.facing = FacesEnum.EAST;
        break;
      }
      case FacesEnum.EAST: {
        this.facing = FacesEnum.NORTH;
        break;
      }
    }
  }

  // It rotates the robot to the right in 90 degrees
  public rotateRight() {
    switch (this.facing) {
      case FacesEnum.NORTH: {
        this.facing = FacesEnum.EAST;
        break;
      }
      case FacesEnum.EAST: {
        this.facing = FacesEnum.SOUTH;
        break;
      }
      case FacesEnum.SOUTH: {
        this.facing = FacesEnum.WEST;
        break;
      }
      case FacesEnum.WEST: {
        this.facing = FacesEnum.NORTH;
        break;
      }
    }
  }

  // It returns a string with the current position and
  // which way the robot is facing
  public report(): string {
    return this.x + ',' + this.y + ',' + this.facing;
  }

  // It will place the robot in the x,y position provided
  // facing the way as required
  public place(x: number, y: number, facing: FacesEnum) {
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.placed = true;
  }

  // This simulates the robot moving and return what
  // would be the unit of landing.
  public simulateMove(): number {
    let simulated_unit: number = null;
    switch (this.facing) {
      case FacesEnum.NORTH: {
        simulated_unit = this.y + 1;
        break;
      }
      case FacesEnum.SOUTH: {
        simulated_unit = this.y + 1;
        break;
      }
      case FacesEnum.WEST: {
        simulated_unit = this.x - 1 ;
        break;
      }
      case FacesEnum.EAST: {
        simulated_unit = this.x + 1;
        break;
      }
    }
    return simulated_unit;
  }

}


