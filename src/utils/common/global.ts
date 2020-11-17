interface IActions {
    UNSELECTED: string;
    UPLOAD: string;
    WRITE: string;
}

export class Globals {
    ACTIONS: IActions = { UNSELECTED: 'ACTIONS.UNSELECTED', UPLOAD: 'ACTIONS.FILE_UPLOAD', WRITE: 'ACTIONS.WRITE' };
}
