import { Dropdown } from "src/app/shared/model/dropdown";

export namespace Roles {
    export enum Role {
        Dev = 'Dev',
        QA = 'QA',
        Manager = 'Manager'
    }
    
    export function getKeys() {
        return Object.keys(Role);
    }
    
    export function getValues() {
        return Object.values(Role);
    }
    
    export function getAsArray() {
        return Object.keys(Role).map((name) => {
            return {
              name,
              value: Role[name as keyof typeof Role],
            };
          });
    }

    export function getAsDropdownArray() : Dropdown[] {
        return Object.keys(Role).map((name) => {
            return {
              id: name,
              name: Role[name as keyof typeof Role],
            };
          });
    }
}

