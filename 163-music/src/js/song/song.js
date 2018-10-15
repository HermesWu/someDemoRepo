{
    let view = {
        el: '#app',
        init(){
            this.$el = $(this.el)
        },
        render(data){
            console.log(data)
            let {song, status} = data
            let {lyrics} = song
            if(!song.cover){
                song.cover = 'http://pegr14rv7.bkt.clouddn.com/song.png'
            }
            if(this.$el.find('audio').attr('src') !== song.url) {
                let audio = this.$el.find('audio').attr('src',song.url).get(0)
                audio.onended = () =>{
                    window.eventHub.emit('end')
                }
                audio.ontimeupdate = ()=>{
                   this.showLyrics(audio.currentTime)
                }
            }
            if(status ==='playing'){
                this.$el.find('.disc-container').addClass('playing')
            }else{
                this.$el.find('.disc-container').removeClass('playing')
            }
            this.$el.find('.background').css('background', `url(${song.cover})`)
            this.$el.find('.cover').attr('src', `${song.cover}`)
            this.$el.find('.song-description h1').text(`${song.name}`)
            let regex = /\[([\d:.]+)\](.+)/
            lyrics && lyrics.split('\n').map((lyric)=>{
                let p =document.createElement('p')
                let lyricOne = lyric.match(regex)
                let time = lyricOne[1]
                let name = lyricOne[2]
                let minutes = time.split(':')[0]
                let seconds = time.split(':')[1]
                let newTime = parseInt(minutes, 10)*60 + parseFloat(seconds)
                p.textContent = name
                p.setAttribute('data-time', newTime)
                this.$el.find('.lyric .lines').append(p)
            })
        },
        play(){
            let audio = this.$el.find('audio')[0]
            console.log(audio)
            audio.play()
        },
        pause(){
            let audio = this.$el.find('audio')[0]
            audio.pause()

        },
        showLyrics(time){
            let allP = this.$el.find('.lyric>.lines>p')
            let p
            for(let i = 0; i < allP.length;i++){
                if(i === allP.length -1){
                    p = allP[i]
                }else{
                    let currentTime = allP.eq(i).attr('data-time')
                    let nextTime = allP.eq(i+1).attr('data-time')
                    if(currentTime <= time && time < nextTime){
                        p = allP[i]
                        let pHeight = p.getBoundingClientRect().top
                        let lineHeight = this.$el.find('.lyric>.lines')[0].getBoundingClientRect().top
                        let height = lineHeight - pHeight +25
                        console.log(height)
                        this.$el.find('.lyric>.lines').css({
                            transform: `translateY(${height}px)`
                        })
                        break
                    }
                }
            }
            this.$el.find(p).addClass('active')
                .siblings('.active').removeClass('active')
        }
    }
    let model = {
        data: {
            song: {
                id:'',
                name: '',
                singer: '',
                url: '',
                cover: '',
                lyrics: ''
            },
            status: 'paused'
        },
        get(id){
            var query = new AV.Query('Song');
            return query.get(id).then((song)=> {
                this.data.song.id = song.id
                Object.assign(this.data.song, song.attributes)
                console.log(this.data)
                return song
            }, (error) => {
                console.log(error)
            });
        }

    }
    let controller = {
        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
            this.bindEventHub()
            let id = this.getSongId()
            this.model.get(id).then((data)=>{
                this.model.data.status = 'playing'
                this.view.render(this.model.data)
                this.view.play()
            },(err)=>{
                console.log(err)
            })
        },
        getSongId(){
            let search = window.location.search
            if(search.indexOf('?') === 0){
                search = search.substring(1)
            }

            let array = search.split('&').filter(v=>v)
            let id = ''
            for(let i = 0; i < array.length; i++){
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if(key === 'id'){
                    id = value
                    break;
                }
            }
            return id
        },
        bindEvents(){
            this.view.$el.on('touchstart', '.icon-play', ()=>{
                this.model.data.status = 'playing'
                this.view.render(this.model.data)
                this.view.play();
            })
            this.view.$el.on('touchstart', '.icon-pause', ()=>{
                this.model.data.status = 'paused'
                this.view.render(this.model.data)
                this.view.pause();
            })
        },
        bindEventHub(){
            window.eventHub.on('end', ()=>{
                this.model.data.status = 'paused'
                this.view.render(this.model.data)
                this.view.pause();
            })
        }
    }
    controller.init(view, model)
}

