$(function () {


//////////////////////////////////////
//
// モデル定義
//
//////////////////////////////////////
var Todo = Backbone.Model.extend({
    //インスタンス生成時に実行
    initialize:function () {
        console.dir("Todo#initialize");
    }
});

//////////////////////////////////////
//
// コレクション定義
//
//////////////////////////////////////

var TodoList = Backbone.Collection.extend({
    model:Todo
});


//////////////////////////////////////
//
// ビュー定義
//
//////////////////////////////////////
var TodoView = Backbone.View.extend({
    //Viewが管理するDOMイベント
    el:"#todoDiv",
    events:{
        // #todoDiv要素以下のbuttonにclickイベントを登録する
        "click button":"addTodo"
    },
    //インスタンス生成時に実行
    initialize:function () {
        console.dir("TodoView#initialize");
        this.collection = new TodoList();
        // collectionに対し、addされたらrenderを実行する
        this.collection.bind("add", this.render, this);
    },
    render:function (todo) {
        $(this.el).children("ul").append(this.template(todo));
    },

    //ボタンがクリックされたらこの関数が実行される
    addTodo:function () {
        var todo = new Todo({content:this.$("#new-todo").val()});
        this.collection.add(todo);
    },
    //追加するHTMLを返す
    template:function (todo) {
        return "<li>" + todo.get("content") + "</li>";
    }
});


    var view = new TodoView();

});
