



export class CreateTodoDTO{

    private constructor(
        public readonly title: string,
        public readonly completed: boolean,        
    ){}

        static create( props: {[key:string]:any} ):[string?, CreateTodoDTO?]{

            const { title, completed} = props;
            if(!title) return ['Title is required'];
            if(typeof title !== 'string') return ['Title must be a string'];
            if(typeof completed !== 'boolean') return ['Completed must be a boolean'];

            return [ undefined, new CreateTodoDTO(title, completed)];
        }

}