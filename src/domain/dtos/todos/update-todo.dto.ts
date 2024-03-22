



export class UpdateTodoDTO{

    private constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly completedAt?: Date,        
    ){}

        get values(){
            const obj:{[key:string]:any} = {};
            if(this.title) obj.title = this.title;
            if(this.completedAt) obj.completedAt = this.completedAt;
            return obj;
        }

        static create( props: {[key:string]:any} ):[string?, UpdateTodoDTO?]{

            
            const { title,completedAt,id } = props;
            if( !id || isNaN(Number(id))) return ['Invalid id'];


            let newCompletedAt = completedAt;

            if(completedAt){
                 newCompletedAt = new Date( completedAt );
                if( newCompletedAt.toString() === 'Invalid Date') return ['Invalid date format'];
            }


            return [ undefined, new UpdateTodoDTO(id,title,newCompletedAt)];
        }

}