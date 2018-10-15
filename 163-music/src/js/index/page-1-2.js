{
    let view = {
        el: '#m-new-lists',
        init(){
            this.$el = $(this.el)
        },
        template: `
             <li>
                        <div>
                            <p class="title">{{song.name}}<span class="text"></span></p>
                            <p class="singer"><svg class="icon icon-sq">
                            <use xmlns:xlink="http://www.w3.org/1999/xhtml" xlink:href="#icon-sq"></use>
</svg>{{song.singer}}</p>
                        </div>
                        <div class="right">
                        <a class="playButton" href="./song.html?id={{song.id}}">
                            <svg class="icon icon-play">
                              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                            </svg>
                          </a>
</div>
                    </li>
        `,
        render(data){
            this.$el.find('.loading').attr('style', 'display:none')
            let {songs} = data
            songs.map((song)=>{
                let $li = $(this.template
                    .replace('{{song.name}}', song.name)
                    .replace('{{song.singer}}', song.singer)
                    .replace('{{song.id}}', song.id))
                this.$el.append($li)
            })
        }
    }
    let model = {
        data: {
            songs: []
        },
        find(){
            var query = new AV.Query('Song');
            return query.find().then((songList) => {
                this.data.songs = songList.map((song)=>{
                    return {id: song.id, ...song.attributes}
                })
            })
        }
    }
    let controller = {

        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.model.find().then(()=>{this.view.render(this.model.data)})


        }
    }
    controller.init(view, model)
}