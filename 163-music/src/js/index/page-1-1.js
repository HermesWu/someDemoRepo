{
    let view = {
        el: '#hot-lists',
        init(){
            this.$el = $(this.el)
        }
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
        }
    }
    controller.init(view, model)
}