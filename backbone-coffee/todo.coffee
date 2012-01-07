  jQuery ->

    ##################################
    #
    # モデル定義
    #
    ##################################
    class Todo extends Backbone.Model
      initialize:->
        console.dir("Todo#initialize")

    ##################################
    #
    # コレクション定義
    #
    ##################################
    class TodoList extends Backbone.Collection
      model:Todo

    ##################################
    #
    # ビュー定義
    #
    ##################################

    class TodoView extends Backbone.View
    # Viewが管理するDOMイベント
      el:"#todoDiv"

      #todoDiv要素以下のbuttonにclickイベントを登録する
      events:'click button':'addTodo'

      #インスタンス生成時に実行
      initialize:->
        console.dir("TodoView#initialize")
        @collection = new TodoList
        #collectionに対し、addされたらrenderを実行する
        @collection.bind "add", @render, @

      #render
      render:(todo) ->
        $(@el).children("ul").append(@template(todo))

      #ボタンがクリックされたらこの関数が実行される
      addTodo:->
        todo = new Todo({content:$("#new-todo").val()})
        @collection.add todo

      #追加するHTMLを返す
      template:(todo) ->
        "<li>" + todo.get("content") + "</li>"


    #ビューをインスタンス化
    todo_view = new TodoView