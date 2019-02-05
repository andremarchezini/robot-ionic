import { HomePage } from './home.page';
import { FacesEnum } from '../enums/faces';

describe('HomePage', () => {
  let component: HomePage;

  beforeEach(() => {
    component = new HomePage();
  });

  it('test if blocks unrecognised commands', () => {
    component.command = 'EXIT';
    expect(component.validateCommand()).toBeFalsy();
  });

  it('should accept PLACE', () => {
    component.command = 'PLACE 1,1,NORTH';
    expect(component.validateCommand()).toBeTruthy();
  });

  it('should not accept PLACE with only one coordinate', () => {
    component.command = 'PLACE 1,NORTH';
    expect(component.validateCommand()).toBeFalsy();
  });

  it('should not accept PLACE without facing direction', () => {
    component.command = 'PLACE 1,1';
    expect(component.validateCommand()).toBeFalsy();
  });

  it('should not accept command before PLACE', () => {
    component.command = 'MOVE';
    expect(component.validateCommand()).toBeFalsy();
  });

  it('should accept command after PLACE', () => {
    component.command = 'PLACE 1,1,NORTH';
    component.run();
    component.command = 'MOVE';
    expect(component.validateCommand()).toBeTruthy();
  });

  it('should not accept PLACE out of the X boundary (less)', () => {
    component.command = 'PLACE -1,1,NORTH';
    component.run();
    component.command = 'MOVE';
    expect(component.validateCommand()).toBeFalsy();
  });

  it('should not accept PLACE out of the Y boundary (less)', () => {
    component.command = 'PLACE 1,-1,NORTH';
    component.run();
    component.command = 'MOVE';
    expect(component.validateCommand()).toBeFalsy();
  });

  it('should not accept PLACE out of the X boundary (greater)', () => {
    component.command = 'PLACE 5,1,NORTH';
    component.run();
    component.command = 'MOVE';
    expect(component.validateCommand()).toBeFalsy();
  });

  it('should not accept PLACE out of the Y boundary (greater)', () => {
    component.command = 'PLACE 1,5,NORTH';
    component.run();
    component.command = 'MOVE';
    expect(component.validateCommand()).toBeFalsy();
  });

  it('check results of a PLACE', () => {
    component.command = 'PLACE 1,1,NORTH';
    component.run();
    expect(component.robot.x === 1 && component.robot.y === 1 && component.robot.facing === FacesEnum.NORTH).toBeTruthy();
  });

  it('check results of a PLACE and then a MOVE', () => {
    component.command = 'PLACE 1,1,NORTH';
    component.run();
    component.command = 'MOVE';
    component.run();
    expect(component.robot.x === 1 && component.robot.y === 2 && component.robot.facing === FacesEnum.NORTH).toBeTruthy();
  });

  it('check results of a PLACE and then repeat MOVEs to cause a fall (Y)', () => {
    component.command = 'PLACE 1,1,NORTH';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'MOVE';
    expect(component.validateCommand()).toBeFalsy();

  });

  it('check results of a PLACE and then repeat MOVEs to cause a fall (X)', () => {
    component.command = 'PLACE 1,1,NORTH';
    component.run();
    component.command = 'LEFT';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'MOVE';
    expect(component.validateCommand()).toBeFalsy();

  });

  it('check if it turns LEFT', () => {
    component.command = 'PLACE 1,1,NORTH';
    component.run();
    component.command = 'LEFT';
    component.run();
    expect(component.robot.x === 1 && component.robot.y === 1 && component.robot.facing === FacesEnum.WEST).toBeTruthy();
  });

  it('check if it turns RIGHT', () => {
    component.command = 'PLACE 1,1,NORTH';
    component.run();
    component.command = 'RIGHT';
    component.run();
    expect(component.robot.x === 1 && component.robot.y === 1 && component.robot.facing === FacesEnum.EAST).toBeTruthy();
  });

  it('check if it turns RIGHT', () => {
    component.command = 'PLACE 1,1,NORTH';
    component.run();
    component.command = 'RIGHT';
    component.run();
    expect(component.robot.x === 1 && component.robot.y === 1 && component.robot.facing === FacesEnum.EAST).toBeTruthy();
  });

  it('check report', () => {
    component.command = 'PLACE 0,0,NORTH';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'REPORT';
    component.run();
    expect(component.robot.report() === '0,1,NORTH').toBeTruthy();
  });

  it('Generic scenario 1', () => {
    component.command = 'PLACE 0,0,NORTH';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'REPORT';
    component.run();
    expect(component.robot.x === 0 && component.robot.y === 1 && component.robot.facing === FacesEnum.NORTH).toBeTruthy();
  });

  it('Generic scenario 2', () => {
    component.command = 'PLACE 0,0,NORTH';
    component.run();
    component.command = 'LEFT';
    component.run();
    component.command = 'REPORT';
    component.run();
    expect(component.robot.x === 0 && component.robot.y === 0 && component.robot.facing === FacesEnum.WEST).toBeTruthy();
  });

  it('Generic scenario 3', () => {
    component.command = 'PLACE 1,2,EAST';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'LEFT';
    component.run();
    component.command = 'MOVE';
    component.run();
    component.command = 'REPORT';
    component.run();
    expect(component.robot.x === 3 && component.robot.y === 3 && component.robot.facing === FacesEnum.NORTH).toBeTruthy();
  });

});
