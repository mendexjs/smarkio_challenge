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
                for(review of res){
                    this.reviews.push(review);
                }
            },
        });
    },
    
    methods: {
        addNewReview: function (new_comment) {
            console.log(typeof(this.reviews), this.reviews);
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
        textToSpeech: function (comment){
            text = `O ${comment.user_name} fez o seguinte comentário: ${comment.comment}. em ${comment.readable_created_at}`;
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