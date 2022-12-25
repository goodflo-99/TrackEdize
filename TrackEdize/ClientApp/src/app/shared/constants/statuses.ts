export namespace Statuses {
    export enum Status {
        Open = "Open",
        InProgres = 'In Progres',
        Done = 'Done'
    }
    
    export function getKeys() {
        return Object.keys(Status);
    }
    
    export function getValues() {
        return Object.values(Status);
    }
    
    export function getAsArray() {
        return Object.keys(Status).map((name) => {
            return {
              name,
              value: Status[name as keyof typeof Status],
            };
          });
    }
}

