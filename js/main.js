(function(){
    var App = {
        Model: {},
        Collection: {},
        View: {},
    };

    App.Model.Todo = Backbone.Model.extend({
        defaults: {
            title: 'Todo Title',
            completed: false
        },
        validate: function(attrbs,options){
            if(typeof attrbs.title === 'number'){
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

    App.View.Todo = Backbone.View.extend({
        tagName: 'p',
        template: _.template($('#todo-template').html()),
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });


    App.View.TodoCollection = Backbone.View.extend({
        tagName: 'ul',
        initialize: function(){
            _.each()
        }
    });

    var todo = new App.Model.Todo();
    todo.set({
        title: 'Zero todo'
    });
    var todos = [{ title: 'first todo'},{title: 'Seond todo', completed: true},{title: 'third todo'}];
    
    var todoView = new App.View.Todo({model: todo});
    var todoCollectionView = new App.View.TodoCollection({collection: todos});
    var todoContainer = $('#todo-container');
    console.log(todoView.render().el);
    console.log( App.Collection.Todo.length);
    // console.log(todoCollectionView.render());
    // todoContainer.html(todoCollectionView.render().el);
})();