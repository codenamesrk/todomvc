// (function(){
    var App = App || {
        Model: {},
        Collection: {},
        View: {},
        Helper: {},
        Todos: []
    };
    const ENTER_KEY = 13;

    App.Helper.Template = function(id){
        return _.template($(id).html());
    }

    App.Model.Todo = Backbone.Model.extend({
        defaults: {
            title: 'Todo Title',
            completed: false
        },
        validate: function(attrbs,options){
            if(!$.trim(attrbs.title)){
                return 'not valid title';
            }
            if(typeof attrbs.completed !== 'boolean'){
                return 'not boolean complete';
            }
        }
    });

    App.Collection.Todo = Backbone.Collection.extend({
        model: App.Model.Todo
    });

    App.View.Todo = function(){
        return Backbone.View.extend({
            tagName: 'li',
            initialize: function(){
                this.template = App.Helper.Template('#todo-template');
                this.render();
            },
            render: function(){
                this.$el.html(this.template(this.model.toJSON()));                
                return this;
            }
        });
    };


    App.View.Todos = function(){
        return Backbone.View.extend({
            tagName: 'ul',
            className: 'todo-list',
            initialize: function(){
                this.collection.on('add',this.addTodo,this);
            },
            addTodo: function(todo){
                var todoView = new todoViewConst({model: todo});
                this.$el.append(todoView.render().el);                   
            },
            render: function(){
                this.collection.each(this.addTodo,this);
                return this;
            }
        });
    };

    App.View.NewTodo = function(){
        return Backbone.View.extend({
            el: $('#todo-new'),
            events: {
                'keyup': 'addTodo'
            },
            addTodo: function(e){
                if (e.which === ENTER_KEY) {                    
                    todos.add({
                        title: this.$el.val()
                    },{validate: true});
                    this.$el.val('');                                     
                }                
            }
        });
    };

    var todo = new App.Model.Todo();
    var todos = new App.Collection.Todo();

    var todoViewConst = App.View.Todo();
    var todosViewConst = App.View.Todos();
    var newTodoViewConst = App.View.NewTodo();
        
    var todosView = new todosViewConst({collection: todos});
    var newTodoView = new newTodoViewConst(); 
    var todoContainer = $('.main');   
    todoContainer.html(todosView.render().el);

// })();