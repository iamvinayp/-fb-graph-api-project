// ensuring DOM is loaded before scripts gets executed
$(document).ready(function(){

    $('#profileinfo').hide();//initially hiding the div
    $('#feedinfo').hide();//initially hiding the div

    var myFacebookToken = 'EAACEdEose0cBAKIpH28hlkiucy3sxGDnNiGtRXu04MGGvDo1sBdPHF0QciWHzh94itFf4ZBaXoVYnW22jVTcFHeg10ex6IFQRjtum3wICfKMJ86IuhnVEJhZAN7LHSPOTrdsr0fHJJvKeZCguRbf5heFEFayvz0d1iImlTBZAdWRGSHzdouBSQ6GmjHSIp4ZD';

    var getFacebookDetails = function (){
        $('#feedinfo').hide();
        //ajax call
        $.ajax({
            url : 'https://graph.facebook.com/me?access_token='+myFacebookToken,
            type: 'GET',
            success: function (response, status, xhr){
                console.log(response);
                $('#name').text(response.first_name + ' ' + response.last_name);
                $('#email').text(response.email);
                $('#bday').text(response.birthday);
                $('#hometown').text(response.hometown.name);
                $('#school').text(response.education[0].school.name + ', ' + response.education[0].year.name);
                $('#college').text(response.education[1].school.name + ', ' + response.education[1].year.name);
                $('#location').text(response.location.name);
                $('#profileinfo').fadeIn();
            },
            error: function (xhr, status, error){
                alert("Some error occured! check the console");
                console.log(status);
                console.log(error);
            }
        });
    }// end getFacebookDetails

    var getFacebookFeed = function(){
        $('#profileinfo').hide();
        var j = 1;
        for (var i=0; i<6; i++){
            $('#feedDiv'+i).append('<div id="feedDiv'+(j+i)+'"' + '><span id="story'+(j+i)+'"'+ '></span><br>'+
                                     '<span id="updatedtime'+(j+i)+'"' + '></span><br>'+
                                     '<span id="linkname'+(j+i)+'"' + '></span><br><br></div>');
        }

        //ajax call
        $.ajax({
            url : 'https://graph.facebook.com/me?fields=posts&access_token='+myFacebookToken,
            type: 'GET',
            success: function (response, status, xhr){
                console.log(response);

                for (var i=0; i<6; i++) {
                 if(response.posts.data[i].type !== "status"){
                    $('#story'+i).text(response.posts.data[i].story);
                    $('#updatedtime'+i).text(response.posts.data[i].updated_time)
                    //$('#link'+i).attr('src', response.posts.data[i].link);
                    $('#linkname'+i).text(response.posts.data[i].name);
                    }
                }

                $('#feedinfo').fadeIn();
            },
            error: function (xhr, status, error){
                alert("Some error occured! check the console");
                console.log(status);
                console.log(error);
            }
        });
    }

    $('#feed').on('click', getFacebookFeed);
    $('#profile').on('click', getFacebookDetails);

});// end document.ready() function