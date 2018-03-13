/*
add todo
delete todo
edit todo
mark as read
mark all as read

DOM
add todo
remove todo
make todo editable
*/

describe('Todo Model Test', function(){
    const DEFAULT_TITLE = 'Todo Title';
    var todo,
        newTodo;        

    it('should be defined', function(){
       expect(App.Model.Todo).toBeDefined();
    });

    it('can be instantiated', function(){
        todo = new App.Model.Todo();
        todo.set({
            title: 'a valid title',
            completed: false
        });
        expect(todo).not.toBeNull();
    });

    it('should accept a todo with valid title', function() {
        todo = new App.Model.Todo();
        newTodo = {
            title: 'a valid title',
            completed: false
        };        
        todo.set(newTodo,{validate: true});
        expect(todo.attributes).toEqual(newTodo);
    });    

    it('should fallback to default title if not provided', function(){
        todo = new App.Model.Todo();
        newTodo = {
            title: '',
            completed: false
        };        
        todo.set(newTodo,{validate: true});
        expect(todo.attributes.title).toEqual(DEFAULT_TITLE);        
    });
});

describe('Todo Collection Test', function(){
    var todos;
    beforeEach(function(){
        todos = new App.Collection.Todo;
        todos.set([
            {title: 'first todo'},
            {title: 'Seond todo', completed: true},
            {title: 'third todo', completed: true}            
        ]);        
    });
    it('should be defined',function(){
        expect(todos).toBeDefined();
    });
    it('can be instantiated',function(){
        expect(todos).not.toBeNull();
    });
    it('should accept a collection of 3 models',function(){
        todos.set([
            {title: 'first todo'},
            {title: 'Seond todo', completed: true},
            {title: 'third todo', completed: true}            
        ]);
        expect(todos.length).toEqual(3);
    });    
});

describe('Todo View Test', function(){
    var todo,
        view,
        todoView;

    it('should be defined',function(){        
        expect(App.View.Todo).toBeDefined();
    });

    it('should render the data', function(){
        todo = new App.Model.Todo();
        todo.set({
            title: 'a valid title',
            completed: true
        });       
        view = App.View.Todo();
        todoView = new view({model:todo}); 
        var todoEl = todoView.render().el;                 
        expect(todoEl).toContainElement('input');
        expect(todoEl).toContainElement('label');
        expect(todoEl).toContainElement('button');
    })
});

describe('Todo Collection View Test', function(){    
    var todos,
        views,
        todosView;

    const TEST_LIST = `<li>
    <input type="checkbox" class="toggle-read" name="completed">
    <label for="completed" class="todo">first todo</label>
    <button class="button-outline button-clear todo-remove">✕</button>        
  </li><li>
    <input type="checkbox" class="toggle-read" name="completed" checked="checked">
    <label for="completed" class="todo">Seond todo</label>
    <button class="button-outline button-clear todo-remove">✕</button>        
  </li><li>
    <input type="checkbox" class="toggle-read" name="completed" checked="checked">
    <label for="completed" class="todo">third todo</label>
    <button class="button-outline button-clear todo-remove">✕</button>        
  </li>`;

    it('should be defined',function(){        
        expect(App.View.Todos).toBeDefined();
    });

    it('should render the data to an unordered list', function(){
        todos = new App.Collection.Todo();
        todos.set([
            {title: 'first todo'},
            {title: 'Seond todo', completed: true},
            {title: 'third todo', completed: true}
        ]);
        views = App.View.Todos();
        todosView = new views({collection: todos});
        var todosEl = todosView.render();
        // console.log(todosEl.$el.html());
        expect(todosEl.$el.html()).toContain(TEST_LIST);
    });
});