var app = new Vue({
    el: '#app',
    data: {
        photo: null,
        new_comment: "",
        reviews: [
        ]
    },
    mounted: function () {
        $.ajax({
            type: "GET",
            url: '/reviews',
            success: (res) => {
                console.log(res);
                this.reviews = res;
            },
        });
    },
    
    methods: {
        addNewReview: function (new_comment) {
            comment = {
                user_name: this.current_user.name,
                photo: this.current_user.photo,
                comment: new_comment,
                created_at: new Date().toLocaleString()
            }
            this.reviews.push(comment);
            console.log(this.reviews);
            this.new_comment = '';
            // TO-DO Bater na API para inserir o registro
        },
        textToSpeech: function (comment){
            text = `O ${comment.user_name} fez o seguinte comentário: ${comment.comment}. em ${comment.created_at}`;
            console.log(text);
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
    alert('O dev ainda está trabalhando nisso\
\nLogo mais veremos aqui uma linda integração com o IBM Watson :)');
}