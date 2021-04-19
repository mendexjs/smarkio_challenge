var app = new Vue({
    el: '#app',
    data: {
        speechRequest: false,
        new_comment: "",
        reviews: [
        ]
    },
    mounted: function () {
        $.ajax({
            type: "GET",
            url: '/reviews',
            success: (res) => {
                for(review of res){
                    this.reviews.push(review);
                }
            },
        });
    },
    
    methods: {
        addNewReview: function (new_comment) {
            comment = {
                user_name: this.current_user.name,
                photo: this.current_user.photo,
                comment: new_comment,
                readable_created_at: new Date().toLocaleString()
            }
            
            this.new_comment = '';
            $.ajax({
                type: "POST",
                url: '/reviews',
                data: comment,
                success: (res) => {
                    this.reviews.push(res);
                },
            });
        },
        textToSpeech: function (comment, index){
            $(`#play-button-${index}`).css('background-color','#c46e27');
            if(this.speechRequest == true){
                return window.alert('Aguarde o fim da primeira requisição');
            }
            this.speechRequest = true;
            const text = `${comment.user_name} fez o seguinte comentário: ${comment.comment}. em ${comment.readable_created_at}`;
            $.ajax({
                type: "POST",
                url: '/api/text_to_speech',
                data: {
                    text: text
                },
                success: (res) => {
                    var myAudio = new Audio('/assets/audios/last_audio.wav');
                    myAudio.play();
                },
                complete: () => {
                    this.speechRequest = false;
                    $(`#play-button-${index}`).css('background-color','#010C25');
                }
            });
        }
    },
    computed: {
        current_user() {
            user = {
                name: document.getElementById("current_user_name").innerHTML,
                photo: document.getElementById("current_user_photo").getAttribute("src"),
            };
            return user;
        },
    },
});

function inProgress(){
    alert('Este projeto foi desenvolvido pelo Matheus :D\
\nPara mais informações ou contato, meu GitHub e LinkedIn são @wwwMendex');
}