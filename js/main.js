// (function(){
    var App = App || {
        Model: {},
        Collection: {},
        View: {},
        Helper: {},
        Todos: []
    };

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

    var todo = new App.Model.Todo();
    var todos = new App.Collection.Todo();

    todos.set([
        {title: 'first todo'},
        {title: 'Seond todo', completed: true},
        {title: 'third todo', completed: true}
    ]);

    var todoViewConst = App.View.Todo();
    var todosViewConst = App.View.Todos();
        
    var todosView = new todosViewConst({collection: todos});
        
    var todoContainer = $('.main');   
    todoContainer.html(todosView.render().el);

// })();