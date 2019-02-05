import { TableTop } from './../models/table-top';
import { Component } from '@angular/core';
import { Robot } from '../models/robot';
import { FacesEnum } from '../enums/faces';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage {
    public command: string = null;
    public results: Array<string> = [];
    public robot: Robot = new Robot();
    public tableTop: TableTop = new TableTop();

    constructor() {
        this.tableTop.minimum_unit = 0;
        this.tableTop.maximum_unit = 4;
    }

    public run() {

        this.command = this.command.toLocaleUpperCase();

        if (!this.validateCommand()) {
            this.command = null;
            return;
        }

        if (this.command.substr(0, 5) === 'PLACE') {
            const position_elements = this.breakDownPlace();
            const x = parseInt(position_elements[0], 10);
            const y = parseInt(position_elements[1], 10);
            const facing = FacesEnum[position_elements[2]];
            if (this.safeToPlace(x, y)) {
                this.robot.place(x, y, facing);
                this.addToReport(this.command);
            } else {
                this.addToReport('Unsafe: ' + this.command);
            }
        }

        if (this.command.substr(0, 4) === 'LEFT') {
            this.robot.rotateLeft();
            this.addToReport(this.command);
        }

        if (this.command.substr(0, 5) === 'RIGHT') {
            this.robot.rotateRight();
            this.addToReport(this.command);
        }

        if (this.command.substr(0, 4) === 'MOVE') {
            this.robot.move();
            this.addToReport(this.command);
        }

        if (this.command.substr(0, 6) === 'REPORT') {
            this.robot.report();
            this.addToReport(this.command);
            this.addToReport('=> Output:' + this.robot.x + ',' + this.robot.y + ',' + this.robot.facing);
        }

        this.command = null;
    }

    // Validates the command entered by the user
    public validateCommand(): boolean {

        if (!this.checkPlaceCommand() || !this.checkUnrecognisedCommands()
            || !this.checkMoveCommand() || !this.checkElementsPlaceCommand()) {
            return false;
        }

        return true;
    }

    private checkPlaceCommand() {
        // If first command is not PLACE ignore
        if (this.command.substr(0, 5) !== 'PLACE') {
            if (!this.robot.placed) {
                this.addToReport('Invalid: ' + this.command);
                return false;
            }
        }
        return true;
    }

    private checkUnrecognisedCommands() {
        // If command is not recognised
        if (this.command.substr(0, 5) !== 'PLACE' &&
            this.command.substr(0, 4) !== 'MOVE' &&
            this.command.substr(0, 4) !== 'LEFT' &&
            this.command.substr(0, 5) !== 'RIGHT' &&
            this.command.substr(0, 6) !== 'REPORT') {
            this.addToReport('Not recognised: ' + this.command);
            return false;
        }
        return true;
    }

    private checkMoveCommand() {
        // If first command is not PLACE ignore
        if (this.command.substr(0, 4) === 'MOVE') {
            if (!this.safeToMove(this.robot.simulateMove())) {
                this.addToReport('Unsafe: ' + this.command);
                return false;
            }
        }
        return true;
    }

    private checkElementsPlaceCommand() {
        // Validates elements of PLACE command
        if (this.command.substr(0, 6) === 'PLACE ') {
            const position_elements = this.breakDownPlace();
            if (position_elements.length !== 3) {
                this.addToReport('Invalid: ' + this.command);
                return false;
            } else {
                if (!this.checkElements(position_elements)) {
                    return false;
                }
            }
        } else {
            this.addToReport('Invalid: ' + this.command);
            return false;
        }
        return true;
    }

    private checkElements(position_elements) {
        if (isNaN(parseInt(position_elements[0], 10))) { return false; }
        if (isNaN(parseInt(position_elements[1], 10))) { return false; }
        if (!Object.values(FacesEnum).includes(position_elements[2])) { return false; }
        return true;
    }

    // Checks if it safe to execute PLACE
    private safeToPlace(x: number, y: number): boolean {
        if (x < this.tableTop.minimum_unit || y < this.tableTop.minimum_unit ||
            x > this.tableTop.maximum_unit || y > this.tableTop.maximum_unit) {
            return false;
        }

        return true;
    }

    // Checks if it safe to execute MOVE
    private safeToMove(unit: number): boolean {
        if (unit < this.tableTop.minimum_unit || unit > this.tableTop.maximum_unit) {
            return false;
        }

        return true;
    }

    // Adds to the report to be displayed on the web page
    private addToReport(line: string) {
        this.results.push(line);
    }

    // Breaks down the PLACE command into 3 strings (x, y, facing)
    private breakDownPlace(): Array<string> {
        const full_position = this.command.substr(6, this.command.length);
        const position_elements = full_position.split(',');
        return position_elements;
    }


}
